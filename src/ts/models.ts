export interface ViewModel {
  connected?: () => void;
  disconnected?: () => void;
  transitionCompleted?: () => void;
}

export interface ChartData {
  id: number;
  series: string;
  group: string;
}
