export interface Article {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  published_at: string;
  tag_list: string[];
  reading_time_minutes: number;
  public_reactions_count: number;
  comments_count: number;
  url: string;
}