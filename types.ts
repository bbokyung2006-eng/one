export interface DailyContent {
  quote: string;
  author: string;
  songTitle: string;
  songArtist: string;
  songReason: string;
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  xp: number;
}

export interface Coupon {
  id: string;
  name: string;
  cost: number;
  description: string;
  icon: string;
  color: string;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  QUESTS = 'QUESTS',
  SHOP = 'SHOP',
}
