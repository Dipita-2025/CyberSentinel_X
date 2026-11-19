export const DECISIONS = {
  ALLOW: "ALLOW",
  REVIEW: "REVIEW",
  BLOCK: "BLOCK",
};

export const DECISION_STYLES = {
  [DECISIONS.ALLOW]: {
    color: "var(--allow)",
    background: "var(--allow-bg)",
  },
  [DECISIONS.REVIEW]: {
    color: "var(--review)",
    background: "var(--review-bg)",
  },
  [DECISIONS.BLOCK]: {
    color: "var(--blocked)",
    background: "var(--blocked-bg)",
  },
};
