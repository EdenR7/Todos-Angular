export function calculateCompletationPrecentage(
  total: number,
  completed: number
): number {
  return Number((completed / total).toFixed(2));
}
