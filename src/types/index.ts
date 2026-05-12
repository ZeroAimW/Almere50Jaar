export type EventCategory = 'Sport' | 'Kunst' | 'Cultuur';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  color: string;
  category: EventCategory;
  categoryIcon: string;
  imageUrl?: string;
}
