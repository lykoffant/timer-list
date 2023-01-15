export interface ITimer {
  id: number;
  name: string;
  intervalId: number | null;
  seconds: number;
}
