export interface Event {
  id: number;
  type: string;
  name: string;
  created: number;
  date: number;
  participants: string[];
  address?: string;
}
