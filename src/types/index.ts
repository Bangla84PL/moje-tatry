/**
 * Tatra Trails - TypeScript Type Definitions
 *
 * This file contains all TypeScript interfaces and types for the project.
 * Types match the WordPress GraphQL schema and ACF custom fields.
 */

// ============================================
// Core Trail Types
// ============================================

export type Difficulty = 'easy' | 'moderate' | 'difficult' | 'very_difficult' | 'expert';

export type Language = 'pl' | 'en';

export interface Trail {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  date: string;
  modified?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails?: {
        width: number;
        height: number;
      };
    };
  };
  trailData: TrailData;
  regions?: {
    nodes: TaxonomyTerm[];
  };
  seasons?: {
    nodes: TaxonomyTerm[];
  };
  trailTypes?: {
    nodes: TaxonomyTerm[];
  };
  features?: {
    nodes: TaxonomyTerm[];
  };
  comments?: {
    nodes: Comment[];
  };
  language?: {
    code: Language;
    name: string;
  };
  translations?: Translation[];
  seo?: SeoMetadata;
}

export interface TrailData {
  difficulty: Difficulty;
  distanceKm: number;
  elevationGainM: number;
  estimatedTimeHours: number;
  gpsLatitude?: string;
  gpsLongitude?: string;
  gallery?: GalleryImage[];
  trailMapEmbed?: string;
}

export interface GalleryImage {
  sourceUrl: string;
  altText: string;
  caption?: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

// ============================================
// Taxonomy Types
// ============================================

export interface TaxonomyTerm {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

// Type aliases for taxonomy terms (can be extended with specific properties later)
export type Region = TaxonomyTerm;
export type Season = TaxonomyTerm;
export type TrailType = TaxonomyTerm;
export type Feature = TaxonomyTerm;

// ============================================
// Comment Types
// ============================================

export interface Comment {
  id: string;
  databaseId: number;
  date: string;
  content: string;
  status: 'approved' | 'pending' | 'spam' | 'trash';
  author: {
    node: {
      name: string;
      email?: string;
      avatar?: {
        url: string;
      };
    };
  };
  parent?: {
    node: {
      id: string;
    };
  };
}

export interface CommentInput {
  post: number;
  author_name: string;
  author_email: string;
  content: string;
  parent?: number;
}

// ============================================
// Blog Post Types
// ============================================

export interface BlogPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  date: string;
  modified?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories?: {
    nodes: TaxonomyTerm[];
  };
  tags?: {
    nodes: TaxonomyTerm[];
  };
  author?: {
    node: {
      name: string;
      description?: string;
      avatar?: {
        url: string;
      };
    };
  };
  language?: {
    code: Language;
    name: string;
  };
  seo?: SeoMetadata;
}

// ============================================
// Page Types
// ============================================

export interface Page {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  language?: {
    code: Language;
    name: string;
  };
  translations?: Translation[];
  seo?: SeoMetadata;
}

// ============================================
// Translation Types
// ============================================

export interface Translation {
  uri: string;
  slug: string;
  title?: string;
  language: {
    code: Language;
    name: string;
  };
}

// ============================================
// SEO Types
// ============================================

export interface SeoMetadata {
  title?: string;
  metaDesc?: string;
  canonical?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: {
    sourceUrl: string;
  };
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: {
    sourceUrl: string;
  };
}

// ============================================
// Filter Types
// ============================================

export interface TrailFilters {
  region?: string[];
  difficulty?: Difficulty[];
  season?: string[];
  trailType?: string[];
  features?: string[];
  search?: string;
  language?: Language;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

// ============================================
// GraphQL Response Types
// ============================================

export interface TrailReportsResponse {
  trailReports: {
    nodes: Trail[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string;
      endCursor?: string;
    };
  };
}

export interface TrailReportResponse {
  trailReport: Trail | null;
}

export interface BlogPostsResponse {
  posts: {
    nodes: BlogPost[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor?: string;
    };
  };
}

export interface TaxonomiesResponse {
  regions?: {
    nodes: Region[];
  };
  seasons?: {
    nodes: Season[];
  };
  trailTypes?: {
    nodes: TrailType[];
  };
  features?: {
    nodes: Feature[];
  };
}

// ============================================
// Component Props Types
// ============================================

export interface TrailCardProps {
  trail: Trail;
  locale?: Language;
  priority?: boolean;
}

export interface TrailStatsProps {
  trailData: TrailData;
  compact?: boolean;
}

export interface TrailFiltersProps {
  filters: TrailFilters;
  onFilterChange: (filters: TrailFilters) => void;
  taxonomies?: TaxonomiesResponse;
}

export interface MapMarkerProps {
  trail: Trail;
  onClick?: (trail: Trail) => void;
}

export interface CommentFormProps {
  postId: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface LanguageSwitcherProps {
  currentLanguage: Language;
  translations?: Translation[];
}

// ============================================
// Utility Types
// ============================================

export interface PaginationParams {
  first?: number;
  after?: string;
  before?: string;
  last?: number;
}

export interface WhereArgs {
  language?: Language;
  search?: string;
  taxQuery?: TaxQuery;
}

export interface TaxQuery {
  relation?: 'AND' | 'OR';
  taxArray?: TaxQueryItem[];
}

export interface TaxQueryItem {
  taxonomy: string;
  terms: string[];
  field: 'SLUG' | 'NAME' | 'ID';
  operator: 'IN' | 'NOT_IN' | 'AND';
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

// ============================================
// Contact Form Types
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// ============================================
// Google Maps Types
// ============================================

export interface MapLocation {
  lat: number;
  lng: number;
}

export interface MarkerData {
  id: string;
  position: MapLocation;
  title: string;
  difficulty: Difficulty;
  slug: string;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// ============================================
// Form Validation Types
// ============================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  errors: ValidationError[];
}
