export type Category = "go" | "do" | "see" | "eat" | "stay" | "deals";

export type Area =
  | "Gatlinburg"
  | "Pigeon Forge"
  | "Sevierville"
  | "Townsend"
  | "Wears Valley"
  | "Great Smoky Mountains National Park"
  | "Cherokee"
  | "Bryson City"
  | "Multiple";

export type PriceRange = "$" | "$$" | "$$$" | "Free" | "Varies";

export type Environment = "indoor" | "outdoor" | "mixed";

export type CrowdRisk = "low" | "medium" | "high";

export type WeatherFit = "any" | "rain-ok" | "rain-poor" | "hot-ok" | "cold-ok";

export type KidFit = "all-ages" | "young-kids" | "teens" | "not-ideal";

export type MobilityFit = "easy" | "moderate" | "challenging" | "limited";

export type ClosureStatus = "open" | "seasonal" | "closed" | "check";

export type SourceStatus = "official" | "verified" | "sample" | "placeholder";

export type SponsoredStatus = "none" | "sponsored" | "affiliate";

export interface PlanningCard {
  id: string;
  slug: string;
  name: string;
  category: Category;
  area: Area;
  shortDescription: string;
  bestFor: string[];
  skipIf: string[];
  timeNeeded: string;
  estimatedHours: number;
  priceRange: PriceRange;
  environment: Environment;
  crowdRisk: CrowdRisk;
  weatherFit: WeatherFit;
  kidFit: KidFit;
  mobilityFit: MobilityFit;
  parkingNote: string;
  parkingTagNeeded: boolean;
  bestTime: string;
  closureStatus: ClosureStatus;
  reservationRequired: boolean;
  earlyStartRecommended: boolean;
  sourceStatus: SourceStatus;
  sourceUrl?: string;
  lastVerified: string; // ISO date
  warningTags: string[];
  sponsoredStatus: SponsoredStatus;
  image?: string;
  imageAlt: string;
  isSample: boolean;
}

export interface SavedItem {
  cardId: string;
  day?: number; // 1-based
  isAnchor?: boolean;
  note?: string;
  addedAt: string;
}

export interface MyPlanState {
  items: SavedItem[];
  updatedAt: string;
}

export type WarningType =
  | "time-overload"
  | "two-anchors"
  | "geographic-conflict"
  | "outdoor-rain-risk"
  | "parking-tag-reminder"
  | "early-start-reminder"
  | "reservation-reminder";

export interface PlanWarning {
  type: WarningType;
  message: string;
  day?: number;
  cardIds?: string[];
}