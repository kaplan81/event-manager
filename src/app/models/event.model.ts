export interface Event {
  id: number;
  type: 'meeting' | 'call';
  name: string;
  created: number;
  date: number;
  participants: string[];
  address?: string;
}
