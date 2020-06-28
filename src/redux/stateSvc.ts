const prefix = "MOMENTUM_PREFIX_";

function setHabitHistory(habitName: string, data: boolean[]): void {
  window.localStorage.setItem(`${prefix}${habitName}`, JSON.stringify(data));
}

function loadtHabitHistory(habitName: string, data: boolean[]): boolean[] {
  const stringifiedHistory = window.localStorage.getItem(
    `${prefix}${habitName}`
  );
  return JSON.parse(stringifiedHistory || "[]");
}

export { setHabitHistory, loadtHabitHistory };
