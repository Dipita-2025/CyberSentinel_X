const getAccessActivity = (logs = []) => {
  if (logs.length === 0) {
    return [];
  }
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    return {
      date: date.toISOString().slice(0, 10),
      allowed: 0,
      review: 0,
      blocked: 0,
    };
  });

  const activityMap = new Map(days.map((day) => [day.date, day]));

  logs.forEach((log) => {
    if (!log.created_at) return;

    const date = new Date(log.created_at).toISOString().slice(0, 10);

    const activity = activityMap.get(date);

    if (!activity) return;

    const decision = log.decision?.toUpperCase();

    if (decision === "ALLOW") activity.allowed++;
    if (decision === "REVIEW") activity.review++;
    if (decision === "BLOCK") activity.blocked++;
  });

  return days;
};

export default getAccessActivity;
