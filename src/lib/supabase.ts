import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Comment {
  id: string;
  game_slug: string;
  author_name: string;
  comment: string;
  created_at: string;
  parent_id: string | null;
}
