"use server";

import { createHash } from "crypto";
import { z } from "zod";
import { subscribeToList, trackEvent, upsertProfile } from "@/lib/klaviyo";

const answerSchema = z.object({
  temperature: z.string().min(1),
  roomClimate: z.string().min(1),
  material: z.string().min(1),
  allergies: z.string().min(1),
  washing: z.string().min(1),
  sleepSituation: z.string().min(1),
  bedSize: z.string().min(1),
  skinFeel: z.string().min(1),
  budget: z.string().min(1),
});

const schema = z.object({
  email: z.string().email(),
  answers: answerSchema,
  matches: z.tuple([z.string(), z.string(), z.string()]),
});

export type SubscribeInput = z.infer<typeof schema>;

export async function subscribe(input: SubscribeInput) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "Bitte beantworte erst alle Quiz-Fragen und prüfe deine Email." };
  }

  const { email, answers, matches } = parsed.data;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!listId) {
    console.error("[subscribe] KLAVIYO_LIST_ID missing");
    return { ok: false as const, error: "Email-Service ist aktuell nicht konfiguriert." };
  }

  const properties = {
    quiz_source: "sommerdecke-quiz",
    quiz_temperature: answers.temperature,
    quiz_room_climate: answers.roomClimate,
    quiz_material_pref: answers.material,
    quiz_allergies: answers.allergies,
    quiz_washing: answers.washing,
    quiz_sleep_situation: answers.sleepSituation,
    quiz_bed_size: answers.bedSize,
    quiz_skin_feel: answers.skinFeel,
    quiz_budget: answers.budget,
    quiz_match_1: matches[0],
    quiz_match_2: matches[1],
    quiz_match_3: matches[2],
    quiz_completed_at: new Date().toISOString(),
  };

  // Step 1: profile upsert (critical – without this the lead is lost)
  try {
    await upsertProfile({ email, properties });
  } catch (err) {
    console.error("[subscribe] profile upsert failed:", err);
    return { ok: false as const, error: "Ups – kurz nochmal versuchen bitte." };
  }

  // Step 2: subscribe to list (critical – triggers Welcome Flow + marketing consent)
  try {
    await subscribeToList(email, listId);
  } catch (err) {
    console.error("[subscribe] list subscribe failed:", err);
    return { ok: false as const, error: "Ups – kurz nochmal versuchen bitte." };
  }

  // Step 3: event (best-effort – don't block the reveal on this)
  try {
    const uniqueId = createHash("sha1")
      .update(`${email}:quiz_completed:${matches.join(",")}`)
      .digest("hex");
    await trackEvent(email, "quiz_completed", { ...properties, $value: 1 }, uniqueId);
  } catch (err) {
    console.error("[subscribe] event track failed (non-blocking):", err);
  }

  return { ok: true as const };
}
