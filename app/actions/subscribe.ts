"use server";

import { z } from "zod";
import { subscribeToList, trackEvent, upsertProfile } from "@/lib/klaviyo";

const schema = z.object({
  email: z.string().email(),
  answers: z.record(z.string(), z.string()),
  matches: z.array(z.string()).length(3),
});

export type SubscribeInput = z.infer<typeof schema>;

export async function subscribe(input: SubscribeInput) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Bitte gib eine gültige Email-Adresse ein." };
  }

  const { email, answers, matches } = parsed.data;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!listId) {
    return { ok: false, error: "Email-Service ist aktuell nicht konfiguriert." };
  }

  try {
    const properties = {
      quiz_source: "sommerdecke-quiz",
      quiz_temperature: answers.temperature ?? null,
      quiz_room_climate: answers.roomClimate ?? null,
      quiz_material_pref: answers.material ?? null,
      quiz_allergies: answers.allergies ?? null,
      quiz_washing: answers.washing ?? null,
      quiz_sleep_situation: answers.sleepSituation ?? null,
      quiz_bed_size: answers.bedSize ?? null,
      quiz_skin_feel: answers.skinFeel ?? null,
      quiz_budget: answers.budget ?? null,
      quiz_match_1: matches[0],
      quiz_match_2: matches[1],
      quiz_match_3: matches[2],
      quiz_completed_at: new Date().toISOString(),
    };

    await upsertProfile({ email, properties });
    await subscribeToList(email, listId);
    await trackEvent(email, "quiz_completed", {
      ...properties,
      $value: 1,
    });

    return { ok: true };
  } catch (err) {
    console.error("[subscribe] error:", err);
    return { ok: false, error: "Ups – da ist etwas schiefgelaufen. Versuch es gleich erneut." };
  }
}
