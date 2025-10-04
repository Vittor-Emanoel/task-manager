export function groupObject<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (acc, obj) => {
      const group = obj[key];
      const groupKey = String(group);
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(obj);
      return acc;
    },
    {} as Record<string, T[]>
  );
}
