const KLAVIYO_API = "https://a.klaviyo.com/api";
const REVISION = "2024-10-15";

type ProfileProps = {
  email: string;
  properties: Record<string, string | string[] | number | boolean | null>;
};

async function kfetch(path: string, body: unknown) {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!apiKey) throw new Error("Missing KLAVIYO_PRIVATE_API_KEY");

  const res = await fetch(`${KLAVIYO_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      revision: REVISION,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok && res.status !== 409) {
    const text = await res.text();
    throw new Error(`Klaviyo ${path} failed: ${res.status} ${text}`);
  }
  return res.status === 204 ? null : res.json().catch(() => null);
}

export async function upsertProfile({ email, properties }: ProfileProps) {
  return kfetch("/profiles/", {
    data: {
      type: "profile",
      attributes: {
        email,
        properties,
      },
    },
  });
}

export async function subscribeToList(email: string, listId: string) {
  return kfetch("/profile-subscription-bulk-create-jobs/", {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email,
                subscriptions: {
                  email: {
                    marketing: { consent: "SUBSCRIBED" },
                  },
                },
              },
            },
          ],
        },
        historical_import: false,
      },
      relationships: {
        list: { data: { type: "list", id: listId } },
      },
    },
  });
}

export async function trackEvent(email: string, eventName: string, properties: Record<string, unknown>) {
  return kfetch("/events/", {
    data: {
      type: "event",
      attributes: {
        properties,
        metric: {
          data: { type: "metric", attributes: { name: eventName } },
        },
        profile: {
          data: { type: "profile", attributes: { email } },
        },
      },
    },
  });
}
