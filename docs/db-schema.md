# Database Schema Documentation

**Project:** Tatra Trails (moje-tatry)
**Database Type:** MySQL 8.0+ (WordPress)
**Created:** 2025-11-11
**Last Updated:** 2025-11-11

## Overview

Tatra Trails uses WordPress as a headless CMS, leveraging the standard WordPress database schema enhanced with custom post types (trail reports), Advanced Custom Fields (ACF) for structured trail data, custom taxonomies, and WPML for bilingual content (Polish/English).

**Key Design Principles:**
- Leverage WordPress standard tables where possible
- Use ACF for custom trail metadata (stored in wp_postmeta)
- Custom taxonomies for trail categorization
- WPML/Polylang tables for language management
- Optimized indexes for common queries (filtering, searching)
- Data integrity through WordPress constraints

**Database Engine:** InnoDB (supports transactions, foreign keys, row-level locking)
**Character Set:** utf8mb4 (full Unicode support including emojis)
**Collation:** utf8mb4_unicode_ci (case-insensitive, accent-insensitive)

---

## Entity-Relationship Diagram (ERD)

### High-Level Entity Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         WORDPRESS DATABASE SCHEMA                            │
│                          Tatra Trails (moje-tatry)                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│   wp_users       │         │   wp_posts       │         │  wp_postmeta     │
│                  │         │                  │         │                  │
│ • ID (PK)        │    1    │ • ID (PK)        │    1    │ • meta_id (PK)   │
│ • user_login     │────────<│ • post_author    │────────<│ • post_id (FK)   │
│ • user_email     │         │ • post_type      │    N    │ • meta_key       │
│ • user_pass      │         │ • post_status    │         │ • meta_value     │
│ • display_name   │         │ • post_title     │         │                  │
└──────────────────┘         │ • post_content   │         │ ACF Custom Fields│
                             │ • post_date      │         │ ─────────────────│
                             │ • post_name (slug)│        │ difficulty       │
                             │ • guid            │         │ distance_km      │
                             └───────┬──────────┘         │ elevation_gain_m │
                                     │                     │ estimated_hours  │
                                     │                     │ gps_latitude     │
                                     │ 1                   │ gps_longitude    │
                                     │                     │ gallery          │
                                     │ N                   │ trail_map_embed  │
                                     ▼                     └──────────────────┘
                        ┌──────────────────────┐
                        │ wp_term_relationships│
                        │                      │
                        │ • object_id (FK)     │◄───┐
                        │ • term_taxonomy_id   │    │
                        │ • term_order         │    │
                        └───────┬──────────────┘    │
                                │                   │
                                │ N                 │
                                │                   │
                                │ 1                 │
                                ▼                   │
                        ┌──────────────────────┐    │
                        │ wp_term_taxonomy     │    │
                        │                      │    │
                        │ • term_taxonomy_id(PK)│   │
                        │ • term_id (FK)       │    │
                        │ • taxonomy           │    │
                        │   - region           │    │
                        │   - difficulty       │    │
                        │   - season           │    │
                        │   - trail_type       │    │
                        │   - features         │    │
                        │   - category         │    │
                        │ • parent             │    │
                        │ • count              │    │
                        └───────┬──────────────┘    │
                                │                   │
                                │ 1                 │
                                │                   │
                                │ N                 │
                                ▼                   │
                        ┌──────────────────────┐    │
                        │   wp_terms           │    │
                        │                      │    │
                        │ • term_id (PK)       │    │
                        │ • name               │    │
                        │ • slug               │    │
                        │ • term_group         │    │
                        └──────────────────────┘    │
                                                    │
┌──────────────────┐         ┌──────────────────┐  │
│  wp_comments     │         │ icl_translations │  │
│                  │         │  (WPML)          │  │
│ • comment_ID (PK)│    N    │                  │  │
│ • comment_post_ID│────────>│ • translation_id │  │
│ • comment_author │         │ • element_id (FK)│──┘
│ • comment_email  │         │ • element_type   │
│ • comment_content│         │ • language_code  │
│ • comment_date   │         │ • source_lang    │
│ • comment_approved│        │ • trid (group ID)│
│ • user_id (FK)   │         └──────────────────┘
└──────────────────┘
```

---

## Core WordPress Tables

### wp_posts

**Purpose:** Stores all post types (trail reports, blog posts, pages)

**Table Definition:**
```sql
CREATE TABLE `wp_posts` (
  `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_author` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_excerpt` text NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) NOT NULL DEFAULT 'open',
  `post_password` varchar(255) NOT NULL DEFAULT '',
  `post_name` varchar(200) NOT NULL DEFAULT '',
  `to_ping` text NOT NULL,
  `pinged` text NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext NOT NULL,
  `post_parent` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `guid` varchar(255) NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT 0,
  `post_type` varchar(20) NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `post_name` (`post_name`(191)),
  KEY `type_status_date` (`post_type`, `post_status`, `post_date`, `ID`),
  KEY `post_parent` (`post_parent`),
  KEY `post_author` (`post_author`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Important Columns for Tatra Trails:**
- `ID`: Unique post identifier
- `post_author`: Foreign key to wp_users.ID (author/admin)
- `post_type`:
  - `'trail_report'` - Custom post type for trail reports
  - `'post'` - Standard blog posts (planning guides, gear reviews)
  - `'page'` - Static pages (About, Contact)
- `post_status`:
  - `'publish'` - Visible to public
  - `'draft'` - Work in progress
  - `'pending'` - Awaiting review
  - `'trash'` - Soft deleted
- `post_name`: URL slug (e.g., 'morskie-oko-trail')
- `post_title`: Trail name or post title (translatable)
- `post_content`: Main content (HTML/Gutenberg blocks, translatable)
- `post_date`: Publication date
- `comment_status`: 'open' for trail reports, 'closed' for pages

**Indexes:**
- `type_status_date`: Optimizes queries for published trail reports ordered by date
- `post_name`: Fast lookup by slug for URL routing
- `post_author`: Filter by author

**Sample Data:**
```sql
INSERT INTO `wp_posts` VALUES
(1, 1, '2025-11-01 10:00:00', '2025-11-01 09:00:00',
 '<p>Morskie Oko to jedna z najbardziej popularnych tras w Tatrach...</p>',
 'Szlak na Morskie Oko', '', 'publish', 'open', 'open', '',
 'morskie-oko-trail', '', '', '2025-11-01 10:00:00', '2025-11-01 09:00:00',
 '', 0, 'http://example.com/?trail_report=morskie-oko-trail', 0, 'trail_report', '', 0);
```

---

### wp_postmeta

**Purpose:** Stores custom field data for posts (ACF trail metadata)

**Table Definition:**
```sql
CREATE TABLE `wp_postmeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext,
  PRIMARY KEY (`meta_id`),
  KEY `post_id` (`post_id`),
  KEY `meta_key` (`meta_key`(191)),
  KEY `meta_value` (`meta_value`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**ACF Custom Fields for Trail Reports:**

| meta_key | Data Type | Description | Example Value |
|----------|-----------|-------------|---------------|
| `difficulty` | string | Trail difficulty level | 'difficult' |
| `distance_km` | float | Trail distance in kilometers | '12.5' |
| `elevation_gain_m` | integer | Elevation gain in meters | '850' |
| `estimated_time_hours` | float | Estimated hiking time | '6.5' |
| `gps_latitude` | float | GPS latitude coordinate | '49.2016' |
| `gps_longitude` | float | GPS longitude coordinate | '20.0731' |
| `gallery` | serialized array | Photo IDs from media library | 'a:3:{i:0;s:3:"123";i:1;s:3:"124";i:2;s:3:"125";}' |
| `trail_map_embed` | string | Google Maps embed HTML | '<iframe src="https://maps.google.com/..."></iframe>' |
| `_thumbnail_id` | integer | Featured image ID | '100' |

**ACF Field Group Definition:**
```php
// ACF field group configuration (stored in JSON)
{
  "key": "group_trail_data",
  "title": "Trail Data",
  "fields": [
    {
      "key": "field_difficulty",
      "label": "Difficulty",
      "name": "difficulty",
      "type": "select",
      "choices": {
        "easy": "Easy / Łatwy",
        "moderate": "Moderate / Umiarkowany",
        "difficult": "Difficult / Trudny",
        "very_difficult": "Very Difficult / Bardzo trudny",
        "expert": "Expert / Ekspert"
      }
    },
    {
      "key": "field_distance",
      "label": "Distance (km)",
      "name": "distance_km",
      "type": "number",
      "min": 0,
      "step": 0.1
    },
    {
      "key": "field_elevation",
      "label": "Elevation Gain (m)",
      "name": "elevation_gain_m",
      "type": "number",
      "min": 0,
      "step": 1
    },
    {
      "key": "field_time",
      "label": "Estimated Time (hours)",
      "name": "estimated_time_hours",
      "type": "number",
      "min": 0,
      "step": 0.5
    },
    {
      "key": "field_gps_lat",
      "label": "GPS Latitude",
      "name": "gps_latitude",
      "type": "text"
    },
    {
      "key": "field_gps_lng",
      "label": "GPS Longitude",
      "name": "gps_longitude",
      "type": "text"
    },
    {
      "key": "field_gallery",
      "label": "Photo Gallery",
      "name": "gallery",
      "type": "gallery",
      "return_format": "array"
    },
    {
      "key": "field_map_embed",
      "label": "Trail Map Embed",
      "name": "trail_map_embed",
      "type": "textarea"
    }
  ],
  "location": [
    [{
      "param": "post_type",
      "operator": "==",
      "value": "trail_report"
    }]
  ]
}
```

**Sample Data:**
```sql
-- Trail metadata for Morskie Oko trail (post_id = 1)
INSERT INTO `wp_postmeta` VALUES
(1, 1, 'difficulty', 'moderate'),
(2, 1, 'distance_km', '12.5'),
(3, 1, 'elevation_gain_m', '850'),
(4, 1, 'estimated_time_hours', '6.5'),
(5, 1, 'gps_latitude', '49.2016'),
(6, 1, 'gps_longitude', '20.0731'),
(7, 1, 'gallery', 'a:3:{i:0;i:123;i:1;i:124;i:2;i:125;}'),
(8, 1, '_thumbnail_id', '100');
```

**Indexes:**
- `post_id`: Fast lookup of all metadata for a post
- `meta_key`: Efficient filtering by specific field (e.g., all trails with difficulty)
- `meta_value`: Enables searching/filtering by values (use cautiously, text index)

**Performance Note:** For better query performance on numeric fields (distance, elevation), consider creating computed columns or separate normalized table in future optimizations.

---

### wp_terms

**Purpose:** Stores taxonomy terms (categories, tags, custom taxonomies)

**Table Definition:**
```sql
CREATE TABLE `wp_terms` (
  `term_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  `slug` varchar(200) NOT NULL DEFAULT '',
  `term_group` bigint(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`term_id`),
  KEY `slug` (`slug`(191)),
  KEY `name` (`name`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Custom Taxonomies for Tatra Trails:**

1. **region** - Tatra mountain regions
   - Western Tatras (Tatry Zachodnie)
   - Eastern Tatras (Tatry Wschodnie)
   - High Tatras (Tatry Wysokie)

2. **season** - Recommended seasons
   - Spring (Wiosna)
   - Summer (Lato)
   - Fall (Jesień)
   - Winter (Zima)
   - Year-round (Cały rok)

3. **trail_type** - Trail configuration
   - Loop (Pętla)
   - Out-and-back (Tam i z powrotem)
   - Point-to-point (Punkt do punktu)

4. **features** - Trail highlights
   - Waterfall (Wodospad)
   - Peak (Szczyt)
   - Mountain Hut (Schronisko)
   - Viewpoint (Punkt widokowy)
   - Lake (Jezioro)
   - Ridge (Grań)

**Sample Data:**
```sql
INSERT INTO `wp_terms` VALUES
-- Regions
(1, 'Western Tatras', 'western-tatras', 0),
(2, 'High Tatras', 'high-tatras', 0),
(3, 'Eastern Tatras', 'eastern-tatras', 0),

-- Seasons
(4, 'Spring', 'spring', 0),
(5, 'Summer', 'summer', 0),
(6, 'Fall', 'fall', 0),
(7, 'Winter', 'winter', 0),
(8, 'Year-round', 'year-round', 0),

-- Trail Types
(9, 'Loop', 'loop', 0),
(10, 'Out-and-back', 'out-and-back', 0),
(11, 'Point-to-point', 'point-to-point', 0),

-- Features
(12, 'Waterfall', 'waterfall', 0),
(13, 'Peak', 'peak', 0),
(14, 'Mountain Hut', 'mountain-hut', 0),
(15, 'Viewpoint', 'viewpoint', 0),
(16, 'Lake', 'lake', 0),
(17, 'Ridge', 'ridge', 0);
```

---

### wp_term_taxonomy

**Purpose:** Defines taxonomy relationships and hierarchy

**Table Definition:**
```sql
CREATE TABLE `wp_term_taxonomy` (
  `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `term_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `taxonomy` varchar(32) NOT NULL DEFAULT '',
  `description` longtext NOT NULL,
  `parent` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `count` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`term_taxonomy_id`),
  UNIQUE KEY `term_id_taxonomy` (`term_id`, `taxonomy`),
  KEY `taxonomy` (`taxonomy`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Taxonomy Types:**
- `region` - Tatra regions
- `season` - Recommended seasons
- `trail_type` - Trail configuration
- `features` - Trail features (multi-select)
- `category` - Blog post categories
- `post_tag` - Blog post tags

**Sample Data:**
```sql
INSERT INTO `wp_term_taxonomy` VALUES
-- Regions taxonomy
(1, 1, 'region', 'Western part of Tatra mountains', 0, 15),
(2, 2, 'region', 'High Tatra peaks', 0, 23),
(3, 3, 'region', 'Eastern Tatra region', 0, 8),

-- Seasons taxonomy
(4, 4, 'season', 'Spring hiking season', 0, 12),
(5, 5, 'season', 'Summer hiking season', 0, 45),
(6, 6, 'season', 'Fall hiking season', 0, 18),
(7, 7, 'season', 'Winter hiking season', 0, 5),
(8, 8, 'season', 'Available year-round', 0, 10),

-- Trail types
(9, 9, 'trail_type', 'Circular loop trail', 0, 20),
(10, 10, 'trail_type', 'Return via same path', 0, 35),
(11, 11, 'trail_type', 'One-way trail', 0, 8),

-- Features
(12, 12, 'features', 'Trail passes waterfall', 0, 12),
(13, 13, 'features', 'Summit or peak', 0, 28),
(14, 14, 'features', 'Mountain hut available', 0, 15),
(15, 15, 'features', 'Scenic viewpoint', 0, 40),
(16, 16, 'features', 'Lake or pond', 0, 10),
(17, 17, 'features', 'Ridge walking', 0, 8);
```

**Note:** `count` field automatically updates when posts are assigned to terms.

---

### wp_term_relationships

**Purpose:** Links posts to taxonomy terms (many-to-many relationship)

**Table Definition:**
```sql
CREATE TABLE `wp_term_relationships` (
  `object_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `term_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`object_id`, `term_taxonomy_id`),
  KEY `term_taxonomy_id` (`term_taxonomy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Sample Data:**
```sql
-- Assign Morskie Oko trail (post_id=1) to taxonomies
INSERT INTO `wp_term_relationships` VALUES
(1, 2, 0),   -- High Tatras region
(1, 5, 0),   -- Summer season
(1, 10, 0),  -- Out-and-back trail type
(1, 13, 0),  -- Peak feature
(1, 14, 0),  -- Mountain Hut feature
(1, 16, 0);  -- Lake feature
```

**Query Example (Get all trails in High Tatras):**
```sql
SELECT p.ID, p.post_title, p.post_name
FROM wp_posts p
INNER JOIN wp_term_relationships tr ON p.ID = tr.object_id
INNER JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
INNER JOIN wp_terms t ON tt.term_id = t.term_id
WHERE p.post_type = 'trail_report'
  AND p.post_status = 'publish'
  AND tt.taxonomy = 'region'
  AND t.slug = 'high-tatras'
ORDER BY p.post_date DESC;
```

---

### wp_comments

**Purpose:** Stores user comments on trail reports and blog posts

**Table Definition:**
```sql
CREATE TABLE `wp_comments` (
  `comment_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `comment_post_ID` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `comment_author` tinytext NOT NULL,
  `comment_author_email` varchar(100) NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text NOT NULL,
  `comment_karma` int(11) NOT NULL DEFAULT 0,
  `comment_approved` varchar(20) NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) NOT NULL DEFAULT '',
  `comment_type` varchar(20) NOT NULL DEFAULT 'comment',
  `comment_parent` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `user_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`comment_ID`),
  KEY `comment_post_ID` (`comment_post_ID`),
  KEY `comment_approved_date_gmt` (`comment_approved`, `comment_date_gmt`),
  KEY `comment_date_gmt` (`comment_date_gmt`),
  KEY `comment_parent` (`comment_parent`),
  KEY `comment_author_email` (`comment_author_email`(10))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Important Fields:**
- `comment_approved`:
  - `'1'` - Approved (visible)
  - `'0'` - Pending moderation
  - `'spam'` - Marked as spam by Akismet
  - `'trash'` - Soft deleted
- `comment_parent`: For threaded replies (0 = top-level comment)
- `user_id`: 0 for anonymous comments (name + email only)

**Sample Data:**
```sql
INSERT INTO `wp_comments` VALUES
(1, 1, 'Jan Kowalski', 'jan@example.com', '', '192.168.1.1',
 '2025-11-02 14:30:00', '2025-11-02 13:30:00',
 'Świetny szlak! Byłem tam w lipcu i widoki były niesamowite.',
 0, '1', 'Mozilla/5.0', 'comment', 0, 0),

(2, 1, 'Anna Nowak', 'anna@example.com', '', '192.168.1.2',
 '2025-11-03 09:15:00', '2025-11-03 08:15:00',
 'Czy ten szlak jest dostępny w październiku?',
 0, '0', 'Mozilla/5.0', 'comment', 0, 0);
```

**Query Example (Get approved comments for trail):**
```sql
SELECT
  comment_ID,
  comment_author,
  comment_content,
  comment_date
FROM wp_comments
WHERE comment_post_ID = 1
  AND comment_approved = '1'
  AND comment_type = 'comment'
ORDER BY comment_date ASC;
```

---

### wp_users

**Purpose:** Stores admin/editor user accounts (no public user accounts in MVP)

**Table Definition:**
```sql
CREATE TABLE `wp_users` (
  `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(255) NOT NULL DEFAULT '',
  `user_nicename` varchar(50) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  `user_url` varchar(100) NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(255) NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT 0,
  `display_name` varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `user_login_key` (`user_login`),
  KEY `user_nicename` (`user_nicename`),
  KEY `user_email` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Sample Data:**
```sql
INSERT INTO `wp_users` VALUES
(1, 'admin', '$P$BvXqZ8kCp9Y.kJkFJwKr7qE3XyZhN.1', 'admin',
 'admin@tatra-trails.com', '', '2025-11-01 00:00:00', '', 0, 'Trail Admin');
```

**Security Note:** Passwords hashed with WordPress PHPass algorithm (never stored as plaintext).

---

## WPML Multilingual Tables

### icl_translations

**Purpose:** Maps posts/terms to languages and translation groups

**Table Definition:**
```sql
CREATE TABLE `icl_translations` (
  `translation_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `element_type` varchar(60) NOT NULL DEFAULT 'post_post',
  `element_id` bigint(20) DEFAULT NULL,
  `trid` bigint(20) NOT NULL,
  `language_code` varchar(7) NOT NULL,
  `source_language_code` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`translation_id`),
  UNIQUE KEY `el_type_id` (`element_type`, `element_id`),
  KEY `trid` (`trid`),
  KEY `language_code` (`language_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Important Fields:**
- `element_type`:
  - `'post_trail_report'` - Trail report translations
  - `'post_post'` - Blog post translations
  - `'post_page'` - Page translations
  - `'tax_region'` - Region taxonomy translations
- `element_id`: Foreign key to wp_posts.ID or wp_terms.term_id
- `trid`: Translation group ID (same for all language versions)
- `language_code`: ISO 639-1 code ('pl', 'en')
- `source_language_code`: Original language (NULL if original)

**Sample Data:**
```sql
-- Morskie Oko trail in Polish (original)
INSERT INTO `icl_translations` VALUES
(1, 'post_trail_report', 1, 100, 'pl', NULL);

-- Morskie Oko trail in English (translation)
INSERT INTO `icl_translations` VALUES
(2, 'post_trail_report', 2, 100, 'en', 'pl');
```

**Query Example (Get trail with translations):**
```sql
SELECT
  p.ID,
  p.post_title,
  t.language_code,
  t.trid
FROM wp_posts p
INNER JOIN icl_translations t ON p.ID = t.element_id
WHERE t.element_type = 'post_trail_report'
  AND t.language_code = 'pl'
  AND p.post_status = 'publish';
```

---

### icl_languages

**Purpose:** Defines available languages

**Table Definition:**
```sql
CREATE TABLE `icl_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(7) NOT NULL,
  `english_name` varchar(128) NOT NULL,
  `major` tinyint(4) NOT NULL DEFAULT 0,
  `active` tinyint(4) NOT NULL,
  `default_locale` varchar(35) NOT NULL,
  `encode_url` tinyint(4) NOT NULL DEFAULT 0,
  `tag` varchar(35) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `tag` (`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Sample Data:**
```sql
INSERT INTO `icl_languages` VALUES
(1, 'pl', 'Polish', 1, 1, 'pl_PL', 0, 'pl'),
(2, 'en', 'English', 1, 1, 'en_US', 0, 'en');
```

---

## WordPress Media Tables

### wp_posts (Attachments)

**Purpose:** Media library images stored as special post type 'attachment'

**Media-Specific Fields:**
- `post_type = 'attachment'`
- `post_mime_type`: 'image/jpeg', 'image/png', 'image/webp'
- `guid`: Absolute URL to image file
- `post_parent`: Associated post ID (trail report)

**Sample Data:**
```sql
INSERT INTO `wp_posts` VALUES
(100, 1, '2025-11-01 09:00:00', '2025-11-01 08:00:00',
 '', 'morskie-oko-featured', '', 'inherit', 'open', 'closed',
 '', 'morskie-oko-featured', '', '', '2025-11-01 09:00:00',
 '2025-11-01 08:00:00', '', 1,
 'http://example.com/wp-content/uploads/2025/11/morskie-oko.jpg',
 0, 'attachment', 'image/jpeg', 0);
```

**Image Metadata in wp_postmeta:**
```sql
INSERT INTO `wp_postmeta` VALUES
(100, 100, '_wp_attached_file', '2025/11/morskie-oko.jpg'),
(101, 100, '_wp_attachment_metadata', 'a:5:{s:5:"width";i:1920;s:6:"height";i:1280;s:4:"file";s:27:"2025/11/morskie-oko.jpg";s:5:"sizes";a:4:{...}}');
```

---

## Indexes & Performance Optimization

### Composite Indexes

**Optimized Trail Query Index (wp_posts):**
```sql
CREATE INDEX idx_trail_status_date
ON wp_posts (post_type, post_status, post_date DESC)
WHERE post_type = 'trail_report';
```

**Benefits:** Speeds up homepage "latest trails" query.

---

**Custom Field Filtering Index (wp_postmeta):**
```sql
CREATE INDEX idx_meta_post_key_value
ON wp_postmeta (post_id, meta_key, meta_value(50));
```

**Benefits:** Faster filtering by difficulty, distance ranges.

---

**Taxonomy Filtering Index (wp_term_relationships):**
```sql
CREATE INDEX idx_object_taxonomy
ON wp_term_relationships (object_id, term_taxonomy_id);
```

**Benefits:** Efficient multi-taxonomy filtering (region + season + features).

---

**Comment Moderation Index (wp_comments):**
```sql
CREATE INDEX idx_comment_approved_post
ON wp_comments (comment_approved, comment_post_ID, comment_date_gmt);
```

**Benefits:** Fast retrieval of approved comments for specific posts.

---

### Query Performance Analysis

**Common Query 1: Get all published trails with metadata**
```sql
SELECT
  p.ID,
  p.post_title,
  p.post_name,
  p.post_date,
  pm_diff.meta_value AS difficulty,
  pm_dist.meta_value AS distance_km,
  pm_elev.meta_value AS elevation_gain_m,
  pm_time.meta_value AS estimated_time_hours
FROM wp_posts p
LEFT JOIN wp_postmeta pm_diff ON p.ID = pm_diff.post_id AND pm_diff.meta_key = 'difficulty'
LEFT JOIN wp_postmeta pm_dist ON p.ID = pm_dist.post_id AND pm_dist.meta_key = 'distance_km'
LEFT JOIN wp_postmeta pm_elev ON p.ID = pm_elev.post_id AND pm_elev.meta_key = 'elevation_gain_m'
LEFT JOIN wp_postmeta pm_time ON p.ID = pm_time.post_id AND pm_time.meta_key = 'estimated_time_hours'
WHERE p.post_type = 'trail_report'
  AND p.post_status = 'publish'
ORDER BY p.post_date DESC
LIMIT 20;
```

**Optimization:** Use WPGraphQL query instead (more efficient, returns only requested fields).

---

**Common Query 2: Filter trails by difficulty and region**
```sql
SELECT DISTINCT p.ID, p.post_title
FROM wp_posts p
INNER JOIN wp_postmeta pm ON p.ID = pm.post_id
INNER JOIN wp_term_relationships tr ON p.ID = tr.object_id
INNER JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
INNER JOIN wp_terms t ON tt.term_id = t.term_id
WHERE p.post_type = 'trail_report'
  AND p.post_status = 'publish'
  AND pm.meta_key = 'difficulty'
  AND pm.meta_value = 'moderate'
  AND tt.taxonomy = 'region'
  AND t.slug = 'high-tatras';
```

**Optimization:** Ensure indexes exist on `wp_postmeta.meta_key`, `wp_term_taxonomy.taxonomy`, `wp_terms.slug`.

---

**Common Query 3: Get trail with all taxonomies (WPGraphQL)**
```graphql
query GetTrail($slug: String!, $language: LanguageCodeFilterEnum!) {
  trailReportBy(slug: $slug, language: $language) {
    id
    title
    content
    date
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    trailData {
      difficulty
      distanceKm
      elevationGainM
      estimatedTimeHours
      gpsLatitude
      gpsLongitude
      gallery {
        sourceUrl
        altText
      }
    }
    regions {
      nodes {
        name
        slug
      }
    }
    seasons {
      nodes {
        name
      }
    }
    trailTypes {
      nodes {
        name
      }
    }
    features {
      nodes {
        name
      }
    }
    comments(where: {status: APPROVE}) {
      nodes {
        author {
          node {
            name
          }
        }
        content
        date
      }
    }
  }
}
```

**Result:** Single GraphQL query fetches all data efficiently (optimized by WPGraphQL with dataloaders).

---

## Sample SQL Queries for Common Operations

### 1. Get All Published Trails with Difficulty

```sql
SELECT
  p.ID,
  p.post_title,
  p.post_name AS slug,
  pm.meta_value AS difficulty
FROM wp_posts p
LEFT JOIN wp_postmeta pm ON p.ID = pm.post_id AND pm.meta_key = 'difficulty'
WHERE p.post_type = 'trail_report'
  AND p.post_status = 'publish'
ORDER BY p.post_date DESC;
```

---

### 2. Count Trails by Region

```sql
SELECT
  t.name AS region,
  COUNT(DISTINCT tr.object_id) AS trail_count
FROM wp_terms t
INNER JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
LEFT JOIN wp_term_relationships tr ON tt.term_taxonomy_id = tr.term_taxonomy_id
LEFT JOIN wp_posts p ON tr.object_id = p.ID
WHERE tt.taxonomy = 'region'
  AND (p.post_type = 'trail_report' AND p.post_status = 'publish' OR p.ID IS NULL)
GROUP BY t.term_id, t.name
ORDER BY trail_count DESC;
```

---

### 3. Search Trails by Name (Bilingual)

```sql
SELECT
  p.ID,
  p.post_title,
  icl.language_code
FROM wp_posts p
INNER JOIN icl_translations icl ON p.ID = icl.element_id
WHERE p.post_type = 'trail_report'
  AND p.post_status = 'publish'
  AND icl.element_type = 'post_trail_report'
  AND (
    p.post_title LIKE '%Morskie Oko%'
    OR p.post_content LIKE '%Morskie Oko%'
  );
```

---

### 4. Get Trails with Multiple Features (Lake AND Peak)

```sql
SELECT p.ID, p.post_title
FROM wp_posts p
INNER JOIN wp_term_relationships tr1 ON p.ID = tr1.object_id
INNER JOIN wp_term_taxonomy tt1 ON tr1.term_taxonomy_id = tt1.term_taxonomy_id
INNER JOIN wp_terms t1 ON tt1.term_id = t1.term_id
INNER JOIN wp_term_relationships tr2 ON p.ID = tr2.object_id
INNER JOIN wp_term_taxonomy tt2 ON tr2.term_taxonomy_id = tt2.term_taxonomy_id
INNER JOIN wp_terms t2 ON tt2.term_id = t2.term_id
WHERE p.post_type = 'trail_report'
  AND p.post_status = 'publish'
  AND tt1.taxonomy = 'features'
  AND t1.slug = 'lake'
  AND tt2.taxonomy = 'features'
  AND t2.slug = 'peak';
```

---

### 5. Get Pending Comments for Moderation

```sql
SELECT
  c.comment_ID,
  c.comment_post_ID,
  c.comment_author,
  c.comment_content,
  c.comment_date,
  p.post_title
FROM wp_comments c
INNER JOIN wp_posts p ON c.comment_post_ID = p.ID
WHERE c.comment_approved = '0'
  AND c.comment_type = 'comment'
ORDER BY c.comment_date DESC;
```

---

## Migration Strategy

### Phase 1: WordPress Installation & Configuration

**Step 1: Install WordPress Core**
```bash
# Download WordPress
wget https://wordpress.org/latest.tar.gz
tar -xvzf latest.tar.gz

# Configure wp-config.php
define('DB_NAME', 'tatra_trails_db');
define('DB_USER', 'wp_user');
define('DB_PASSWORD', 'secure_password');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', 'utf8mb4_unicode_ci');

# Security: Disable file editing
define('DISALLOW_FILE_EDIT', true);
```

---

**Step 2: Install Required Plugins**

Via WordPress admin or WP-CLI:
```bash
wp plugin install wpgraphql --activate
wp plugin install advanced-custom-fields-pro --activate
wp plugin install sitepress-multilingual-cms --activate  # WPML
wp plugin install wordpress-seo --activate  # Yoast SEO
wp plugin install wordfence --activate
wp plugin install akismet --activate
```

---

**Step 3: Register Custom Post Type**

Add to theme's `functions.php` or custom plugin:
```php
function register_trail_report_post_type() {
  $labels = array(
    'name' => __('Trail Reports'),
    'singular_name' => __('Trail Report'),
    'add_new' => __('Add New Trail'),
    'add_new_item' => __('Add New Trail Report'),
    'edit_item' => __('Edit Trail Report'),
    'view_item' => __('View Trail Report'),
  );

  $args = array(
    'labels' => $labels,
    'public' => true,
    'has_archive' => true,
    'menu_icon' => 'dashicons-location-alt',
    'supports' => array('title', 'editor', 'thumbnail', 'comments'),
    'show_in_rest' => true,
    'show_in_graphql' => true,
    'graphql_single_name' => 'trailReport',
    'graphql_plural_name' => 'trailReports',
    'rewrite' => array('slug' => 'trails'),
  );

  register_post_type('trail_report', $args);
}
add_action('init', 'register_trail_report_post_type');
```

---

**Step 4: Register Custom Taxonomies**

```php
function register_trail_taxonomies() {
  // Region taxonomy
  register_taxonomy('region', 'trail_report', array(
    'label' => __('Regions'),
    'hierarchical' => true,
    'show_in_graphql' => true,
    'graphql_single_name' => 'region',
    'graphql_plural_name' => 'regions',
  ));

  // Season taxonomy
  register_taxonomy('season', 'trail_report', array(
    'label' => __('Seasons'),
    'hierarchical' => false,
    'show_in_graphql' => true,
    'graphql_single_name' => 'season',
    'graphql_plural_name' => 'seasons',
  ));

  // Trail Type taxonomy
  register_taxonomy('trail_type', 'trail_report', array(
    'label' => __('Trail Types'),
    'hierarchical' => false,
    'show_in_graphql' => true,
    'graphql_single_name' => 'trailType',
    'graphql_plural_name' => 'trailTypes',
  ));

  // Features taxonomy (multi-select)
  register_taxonomy('features', 'trail_report', array(
    'label' => __('Features'),
    'hierarchical' => false,
    'show_in_graphql' => true,
    'graphql_single_name' => 'feature',
    'graphql_plural_name' => 'features',
  ));
}
add_action('init', 'register_trail_taxonomies');
```

---

**Step 5: Create ACF Field Group**

Import ACF JSON or create via admin:
```bash
# Export ACF field group to JSON (auto-sync)
# Location: /wp-content/themes/your-theme/acf-json/
```

ACF field group will auto-create necessary wp_postmeta entries when saving trails.

---

**Step 6: Configure WPML Languages**

```bash
# Via WordPress admin:
WPML > Languages
- Add Polish (pl) as default language
- Add English (en) as secondary language
- Enable language switcher
- Configure URL format: /pl/trails/... and /en/trails/...
```

---

### Phase 2: Initial Data Population

**Step 1: Create Taxonomy Terms**
```bash
# Via WP-CLI
wp term create region "Western Tatras" --slug=western-tatras
wp term create region "High Tatras" --slug=high-tatras
wp term create region "Eastern Tatras" --slug=eastern-tatras

wp term create season "Spring" --slug=spring
wp term create season "Summer" --slug=summer
wp term create season "Fall" --slug=fall
wp term create season "Winter" --slug=winter
wp term create season "Year-round" --slug=year-round

wp term create trail_type "Loop" --slug=loop
wp term create trail_type "Out-and-back" --slug=out-and-back
wp term create trail_type "Point-to-point" --slug=point-to-point

wp term create features "Waterfall" --slug=waterfall
wp term create features "Peak" --slug=peak
wp term create features "Mountain Hut" --slug=mountain-hut
wp term create features "Viewpoint" --slug=viewpoint
wp term create features "Lake" --slug=lake
wp term create features "Ridge" --slug=ridge
```

---

**Step 2: Create Sample Trail Report**
```bash
# Via WP-CLI
wp post create \
  --post_type=trail_report \
  --post_title="Szlak na Morskie Oko" \
  --post_content="<p>Detailed trail description in Polish...</p>" \
  --post_status=publish \
  --post_author=1

# Assign taxonomies
wp post term add 1 region high-tatras
wp post term add 1 season summer
wp post term add 1 trail_type out-and-back
wp post term add 1 features lake
wp post term add 1 features peak

# Add ACF custom fields
wp post meta update 1 difficulty "moderate"
wp post meta update 1 distance_km "12.5"
wp post meta update 1 elevation_gain_m "850"
wp post meta update 1 estimated_time_hours "6.5"
wp post meta update 1 gps_latitude "49.2016"
wp post meta update 1 gps_longitude "20.0731"
```

---

**Step 3: Create English Translation (WPML)**
```bash
# Via WordPress admin:
1. Edit trail report in Polish
2. Click WPML language switcher (+) icon
3. Select English
4. Translate content and custom fields
5. Publish English version

# Result: icl_translations table links both versions with same trid
```

---

### Phase 3: Database Optimization

**Step 1: Add Custom Indexes**
```sql
-- After initial data population, add performance indexes
CREATE INDEX idx_trail_status_date
ON wp_posts (post_type, post_status, post_date DESC);

CREATE INDEX idx_meta_difficulty
ON wp_postmeta (meta_key, meta_value(20))
WHERE meta_key = 'difficulty';

CREATE INDEX idx_meta_distance
ON wp_postmeta (meta_key, meta_value(10))
WHERE meta_key = 'distance_km';
```

---

**Step 2: Configure MySQL Query Cache**
```sql
-- In my.cnf or MySQL config
query_cache_type = 1
query_cache_size = 64M
query_cache_limit = 2M
```

---

**Step 3: Enable WordPress Object Cache (Redis)**
```bash
# Install Redis object cache plugin
wp plugin install redis-cache --activate

# Configure in wp-config.php
define('WP_REDIS_HOST', '127.0.0.1');
define('WP_REDIS_PORT', 6379);
define('WP_REDIS_DATABASE', 0);

# Enable Redis
wp redis enable
```

---

### Phase 4: Data Migration (Future: User-Generated Content)

**Rollout Plan for User Accounts (Post-MVP):**

1. **Create wp_usermeta entries** for user profiles
2. **Add authentication plugin** (JWT Authentication for WP REST API)
3. **Modify trail_report permissions** to allow user submissions
4. **Add moderation workflow** (pending → approved)
5. **Data migration script** to preserve existing data

---

## Data Integrity & Constraints

### Foreign Key Relationships

**Note:** WordPress does not enforce foreign keys by default (for performance), but logical relationships exist:

**Conceptual Foreign Keys:**
```sql
-- If enforced (not recommended in production WP):
ALTER TABLE wp_posts
ADD CONSTRAINT fk_post_author
FOREIGN KEY (post_author) REFERENCES wp_users(ID) ON DELETE CASCADE;

ALTER TABLE wp_postmeta
ADD CONSTRAINT fk_postmeta_post
FOREIGN KEY (post_id) REFERENCES wp_posts(ID) ON DELETE CASCADE;

ALTER TABLE wp_term_relationships
ADD CONSTRAINT fk_termrel_post
FOREIGN KEY (object_id) REFERENCES wp_posts(ID) ON DELETE CASCADE;

ALTER TABLE wp_comments
ADD CONSTRAINT fk_comment_post
FOREIGN KEY (comment_post_ID) REFERENCES wp_posts(ID) ON DELETE CASCADE;
```

**Recommendation:** WordPress handles cascading deletes via application logic (safer for plugin compatibility).

---

### Data Validation Rules

**Trail Report Validation:**
- `distance_km`: Must be numeric, > 0, < 100
- `elevation_gain_m`: Must be integer, >= 0, < 5000
- `estimated_time_hours`: Must be numeric, > 0, < 24
- `gps_latitude`: Must be between 48.0 and 50.0 (Tatra region)
- `gps_longitude`: Must be between 19.0 and 21.0 (Tatra region)
- `difficulty`: Must be one of: easy, moderate, difficult, very_difficult, expert

**ACF Validation:**
```php
// Add validation in ACF field group
function validate_gps_coordinates($valid, $value, $field, $input) {
  if (!$valid) return $valid;

  if ($field['name'] == 'gps_latitude') {
    if ($value < 48.0 || $value > 50.0) {
      $valid = 'GPS Latitude must be within Tatra region (48.0-50.0)';
    }
  }

  return $valid;
}
add_filter('acf/validate_value', 'validate_gps_coordinates', 10, 4);
```

---

### Backup & Recovery Strategy

**Daily Automated Backups (UpdraftPlus):**
```
Schedule: 3:00 AM daily
Retention: Last 7 daily, Last 4 weekly, Last 3 monthly
Storage: AWS S3 bucket (encrypted)
Contents:
  - Full database export (SQL dump)
  - wp-content/uploads/ (images)
  - wp-content/plugins/ (excluding WP core)
  - wp-content/themes/
```

**Backup Verification:**
```bash
# Monthly restoration test to staging environment
wp db export backup-test.sql
wp db import backup-test.sql --database=staging_db
# Verify data integrity
```

**Recovery Time Objective (RTO):** < 2 hours
**Recovery Point Objective (RPO):** < 24 hours

---

## Performance Benchmarks

### Expected Query Performance

| Operation | Target Time | Notes |
|-----------|-------------|-------|
| Get single trail (GraphQL) | < 200ms | With object cache |
| Get trail list (20 items) | < 300ms | Filtered by taxonomy |
| Search trails by name | < 500ms | Full-text search |
| Save trail report | < 1s | Including metadata save |
| Load homepage | < 500ms | Cached HTML (Vercel ISR) |
| Submit comment | < 1s | REST API call |

---

### Scaling Considerations

**Current Capacity:**
- Database size: ~50 MB for 100 trails
- Query load: ~500 req/min (shared hosting limit)
- Concurrent users: ~100

**Scaling Thresholds:**
- **At 500 trails:** Consider database read replicas
- **At 10K visitors/day:** Upgrade to VPS or managed WP hosting
- **At 100K visitors/day:** Implement GraphQL query caching (Stellate)

---

## Security Considerations

### SQL Injection Prevention

**WordPress Prepared Statements:**
```php
// ALWAYS use $wpdb->prepare() for custom queries
global $wpdb;
$difficulty = 'moderate';
$results = $wpdb->get_results(
  $wpdb->prepare(
    "SELECT p.ID, p.post_title
     FROM {$wpdb->posts} p
     INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
     WHERE pm.meta_key = 'difficulty'
     AND pm.meta_value = %s",
    $difficulty
  )
);
```

---

### Database User Permissions

**Production Database User (Limited Permissions):**
```sql
CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE
ON tatra_trails_db.*
TO 'wp_user'@'localhost';

-- Deny DROP, ALTER, CREATE permissions for safety
FLUSH PRIVILEGES;
```

---

### Sensitive Data Protection

**Comment Email Encryption (Future Enhancement):**
```php
// Encrypt email addresses in wp_comments
function encrypt_comment_email($comment_id) {
  $comment = get_comment($comment_id);
  $encrypted_email = openssl_encrypt($comment->comment_author_email, 'AES-256-CBC', ENCRYPTION_KEY);
  wp_update_comment(array(
    'comment_ID' => $comment_id,
    'comment_author_email' => $encrypted_email
  ));
}
```

**GDPR Compliance:**
- WordPress GDPR tools enabled (data export, erasure requests)
- Privacy Policy page created
- Comment email addresses stored with user consent

---

## Version History

**Version 1.0** (2025-11-11)
- Initial database schema documentation
- WordPress standard tables defined
- Custom post type structure (trail_report)
- ACF custom fields schema
- Custom taxonomies (region, season, trail_type, features)
- WPML multilingual tables
- Index optimization strategy
- Migration plan documented
- Sample queries provided

---

## Related Documentation

- **/Users/bangla84/moje-tatry/PRD.md**: Product requirements and data model overview
- **/Users/bangla84/moje-tatry/docs/architecture.md**: Technical architecture and tech stack
- **/Users/bangla84/moje-tatry/docs/API.md**: WPGraphQL schema and endpoint documentation
- **/Users/bangla84/moje-tatry/docs/features.md**: Feature requirements and user stories
- **/Users/bangla84/moje-tatry/docs/DEPLOYMENT.md**: Deployment procedures and WordPress setup

---

## Appendix: ACF JSON Export

**Location:** `/wp-content/themes/tatra-trails-theme/acf-json/trail-data.json`

```json
{
  "key": "group_trail_data",
  "title": "Trail Data",
  "fields": [
    {
      "key": "field_difficulty",
      "label": "Difficulty / Trudność",
      "name": "difficulty",
      "type": "select",
      "choices": {
        "easy": "Easy / Łatwy",
        "moderate": "Moderate / Umiarkowany",
        "difficult": "Difficult / Trudny",
        "very_difficult": "Very Difficult / Bardzo trudny",
        "expert": "Expert / Ekspert"
      },
      "default_value": "moderate",
      "return_format": "value"
    },
    {
      "key": "field_distance_km",
      "label": "Distance (km)",
      "name": "distance_km",
      "type": "number",
      "min": 0,
      "max": 100,
      "step": 0.1,
      "prepend": "",
      "append": "km"
    },
    {
      "key": "field_elevation_gain_m",
      "label": "Elevation Gain (m)",
      "name": "elevation_gain_m",
      "type": "number",
      "min": 0,
      "max": 5000,
      "step": 1,
      "append": "m"
    },
    {
      "key": "field_estimated_time_hours",
      "label": "Estimated Time (hours)",
      "name": "estimated_time_hours",
      "type": "number",
      "min": 0,
      "max": 24,
      "step": 0.5,
      "append": "hours"
    },
    {
      "key": "field_gps_latitude",
      "label": "GPS Latitude",
      "name": "gps_latitude",
      "type": "text",
      "placeholder": "49.2016"
    },
    {
      "key": "field_gps_longitude",
      "label": "GPS Longitude",
      "name": "gps_longitude",
      "type": "text",
      "placeholder": "20.0731"
    },
    {
      "key": "field_gallery",
      "label": "Photo Gallery",
      "name": "gallery",
      "type": "gallery",
      "min": 1,
      "max": 20,
      "insert": "append",
      "library": "all",
      "return_format": "array"
    },
    {
      "key": "field_trail_map_embed",
      "label": "Google Maps Embed Code",
      "name": "trail_map_embed",
      "type": "textarea",
      "rows": 4,
      "placeholder": "<iframe src=\"https://maps.google.com/...\"></iframe>"
    }
  ],
  "location": [
    [{
      "param": "post_type",
      "operator": "==",
      "value": "trail_report"
    }]
  ],
  "show_in_graphql": 1,
  "graphql_field_name": "trailData"
}
```

---

**Document Owner:** Database Architect
**Review Cycle:** Quarterly or when schema changes proposed
**Next Review:** 2026-02-11
**Status:** Complete
