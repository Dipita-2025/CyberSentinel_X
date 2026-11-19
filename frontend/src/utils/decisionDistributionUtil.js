const getDecisionDistribution = (logs = []) => {
  const decisions = {
    ALLOW: 0,
    REVIEW: 0,
    BLOCK: 0,
  };

  logs.forEach((log) => {
    const decision = log.decision?.toUpperCase();

    if (decision in decisions) {
      decisions[decision]++;
    }
  });

  return Object.entries(decisions).map(([name, value]) => ({
    name,
    value,
  }));
};

export default getDecisionDistribution;
