// TypeScript interfaces matching CONTENT_SCHEMA.md

export interface GameGuide {
  slug: string;
  title: string;
  manufacturer: string;
  manufacturer_short: string;
  designer: string;
  code_by: string;
  year: number;
  description: string;
  badge: {
    gradient_from: string;
    gradient_to: string;
    border_color: string;
    text_color: string;
    abbreviation: string;
  };
  ratings: {
    drain_danger: number;
    rule_complexity: number;
    fun_factor: number;
    league_frequency: number;
  };
  summary: {
    text: string;
    modes: ModePill[];
  };
  one_shot: {
    name: string;
    description: string;
  };
  hard_box: {
    text: string;
  };
  ball_plans: BallPlan[];
  survival: {
    items: SurvivalItem[];
  };
  skip: {
    items: SkipItem[];
  };
  between_us: BetweenUsBox[];
  playfield_callouts: PlayfieldCallout[];
  sources: Source[];
  level_up?: LevelUpSection;
  pinball_map?: {
    machine_ids: number[];
    machine_group_id?: number;
    opdb_id?: string;
    search_name: string;
  };
}

export interface ModePill {
  name: string;
  type: "mb" | "md" | "ev" | "wiz";
}

export interface BallPlan {
  ball_number: number;
  title: string;
  priorities: Priority[];
}

export interface Priority {
  rank: 1 | 2 | 3 | 4;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
}

export interface SurvivalItem {
  title: string;
  description: string;
}

export interface SkipItem {
  title: string;
  description: string;
}

export interface BetweenUsBox {
  label: string;
  text: string;
}

export interface PlayfieldCallout {
  id: string;
  name: string;
  description: string;
  image: string;
  crop?: {
    x_percent: number;
    y_percent: number;
    zoom: number;
  };
}

export interface Source {
  title: string;
  type: "guide" | "podcast" | "forum" | "official" | "video" | "news";
  description: string;
  url: string;
}

export interface LevelUpSection {
  intro: string;
  tips: LevelUpTip[];
}

export interface LevelUpTip {
  title: string;
  description: string;
}
