const TOPICS_URL = "/topics.json";

export type WorkflowTopic = {
  title: string;
  summary: string;
  why: string[];
  rule: string;
  tools: string[];
  takeaway: string;
  diagram: string;
  tags: string[];
  type: string;
  slug: string;
};

export type InsightTopic = {
  title: string;
  summary: string;
  insight: string;
  non_obvious: string;
  rule: string;
  refs: string[];
  diagram: string;
  type: string;
  slug: string;
};

export type TopicsData = {
  workflows: Record<string, WorkflowTopic>;
  insights: Record<string, InsightTopic>;
};

function normalizeSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function loadTopics(): Promise<TopicsData | null> {
  try {
    const res = await fetch(TOPICS_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return (await res.json()) as TopicsData;
  } catch {
    return null;
  }
}

function resolveBySlug<T extends { slug?: string; title?: string }>(
  records: Record<string, T> | undefined,
  requestedSlug: string,
): T | null {
  if (!records) return null;

  if (records[requestedSlug]) {
    return records[requestedSlug];
  }

  const requested = normalizeSlug(requestedSlug);
  const entries = Object.entries(records);

  const exactish = entries.find(([key, value]) => {
    const keySlug = normalizeSlug(key);
    const valueSlug = normalizeSlug(value.slug ?? "");
    const titleSlug = normalizeSlug(value.title ?? "");
    return (
      keySlug === requested ||
      valueSlug === requested ||
      titleSlug === requested
    );
  });

  if (exactish) return exactish[1];

  const prefixish = entries.find(([key, value]) => {
    const candidates = [key, value.slug ?? "", value.title ?? ""].map(normalizeSlug);
    return candidates.some(
      (candidate) =>
        candidate &&
        (candidate.startsWith(requested) || requested.startsWith(candidate)),
    );
  });

  if (prefixish) return prefixish[1];

  const tokenish = entries.find(([key, value]) => {
    const haystack = [key, value.slug ?? "", value.title ?? ""].join(" ").toLowerCase();
    return requestedSlug
      .toLowerCase()
      .split("-")
      .filter(Boolean)
      .every((token) => haystack.includes(token));
  });

  return tokenish?.[1] ?? null;
}

export async function getInsightBySlug(slug: string): Promise<InsightTopic | null> {
  const data = await loadTopics();
  return resolveBySlug(data?.insights, slug);
}

export async function getWorkflowBySlug(slug: string): Promise<WorkflowTopic | null> {
  const data = await loadTopics();
  return resolveBySlug(data?.workflows, slug);
}
