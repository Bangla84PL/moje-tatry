# API Documentation

**Project:** Tatra Trails Blog (moje-tatry)
**Created:** 2025-11-11
**Last Updated:** 2025-11-11
**API Type:** GraphQL (Primary) + WordPress REST API (Limited)

## Overview

The Tatra Trails API provides access to trail reports, blog posts, taxonomies, and user interactions for the bilingual (Polish/English) Tatra Mountains hiking blog. The primary API layer is **WPGraphQL** exposed by the headless WordPress backend, with limited use of the **WordPress REST API** for write operations (comments, contact forms).

**Base URLs:**
- **GraphQL Endpoint:** `https://wp.tatra-trails.com/graphql`
- **REST API Endpoint:** `https://wp.tatra-trails.com/wp-json/`

**API Characteristics:**
- **Authentication:** Public read access (no auth required for queries), WordPress authentication for mutations
- **Rate Limiting:** Cloudflare rate limiting (configurable per deployment)
- **Response Format:** JSON
- **CORS:** Enabled for Vercel frontend domain
- **SSL/TLS:** HTTPS required for all requests

---

## Table of Contents

1. [Authentication](#authentication)
2. [WPGraphQL Queries](#wpgraphql-queries)
   - [Trail Reports](#trail-reports)
   - [Blog Posts](#blog-posts)
   - [Pages](#pages)
   - [Comments](#comments)
   - [Taxonomies](#taxonomies)
   - [Multilingual Content](#multilingual-content)
   - [Search](#search)
3. [WordPress REST API Endpoints](#wordpress-rest-api-endpoints)
   - [Comments](#comments-rest-api)
   - [Contact Form](#contact-form)
4. [External API Integrations](#external-api-integrations)
   - [Google Maps JavaScript API](#google-maps-javascript-api)
   - [Google Analytics 4](#google-analytics-4)
   - [Google AdSense](#google-adsense)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Versioning](#versioning)
8. [Security Considerations](#security-considerations)

---

## Authentication

### Public Access (Read Operations)

**All WPGraphQL queries are publicly accessible without authentication.**

No API key or token required for:
- Fetching trail reports
- Fetching blog posts
- Fetching pages
- Fetching taxonomies
- Reading approved comments
- Search queries

### Authenticated Access (Write Operations)

**WordPress REST API write operations require authentication.**

**Methods:**
1. **WordPress Nonce** (for same-domain requests)
2. **Application Passwords** (for external API access)
3. **JWT Authentication** (future implementation for headless auth)

**Example: WordPress Application Password**
```bash
curl -X POST https://wp.tatra-trails.com/wp-json/wp/v2/comments \
  -u "username:application_password" \
  -H "Content-Type: application/json" \
  -d '{"post": 123, "content": "Great trail!", "author_name": "John", "author_email": "john@example.com"}'
```

**Note:** MVP implementation uses unauthenticated comment submission with moderation. Future versions will implement JWT for user-submitted content.

---

## WPGraphQL Queries

### Base GraphQL Request Format

**Endpoint:** `https://wp.tatra-trails.com/graphql`

**HTTP Method:** `POST`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "query": "YOUR_GRAPHQL_QUERY_HERE",
  "variables": {
    "variableName": "value"
  }
}
```

---

## Trail Reports

### Query: Fetch All Trail Reports

**Description:** Retrieves paginated list of all trail reports with filtering options.

**GraphQL Query:**
```graphql
query GetAllTrailReports(
  $first: Int = 10
  $after: String
  $language: LanguageCodeFilterEnum
  $where: RootQueryToTrailReportConnectionWhereArgs
) {
  trailReports(
    first: $first
    after: $after
    where: $where
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        databaseId
        title(format: RENDERED)
        slug
        date
        modified
        excerpt
        featuredImage {
          node {
            sourceUrl(size: LARGE)
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        trailReportFields {
          difficulty
          distanceKm
          elevationGainM
          estimatedTimeHours
          gpsLatitude
          gpsLongitude
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
            slug
          }
        }
        trailTypes {
          nodes {
            name
            slug
          }
        }
        features {
          nodes {
            name
            slug
          }
        }
        language {
          code
          name
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "first": 12,
  "after": null,
  "language": "PL",
  "where": {
    "taxQuery": {
      "relation": "AND",
      "taxArray": [
        {
          "taxonomy": "REGION",
          "terms": ["western-tatras"],
          "field": "SLUG",
          "operator": "IN"
        },
        {
          "taxonomy": "DIFFICULTY",
          "terms": ["moderate", "difficult"],
          "field": "SLUG",
          "operator": "IN"
        }
      ]
    }
  }
}
```

**Response Example:**
```json
{
  "data": {
    "trailReports": {
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false,
        "startCursor": "YXJyYXljb25uZWN0aW9uOjA=",
        "endCursor": "YXJyYXljb25uZWN0aW9uOjEx"
      },
      "edges": [
        {
          "cursor": "YXJyYXljb25uZWN0aW9uOjA=",
          "node": {
            "id": "cG9zdDoxMjM=",
            "databaseId": 123,
            "title": "Morskie Oko - Czarny Staw Trail",
            "slug": "morskie-oko-czarny-staw",
            "date": "2025-10-15T10:00:00",
            "modified": "2025-10-16T12:30:00",
            "excerpt": "A stunning trail to the iconic Morskie Oko lake and beyond...",
            "featuredImage": {
              "node": {
                "sourceUrl": "https://wp.tatra-trails.com/wp-content/uploads/2025/10/morskie-oko.jpg",
                "altText": "View of Morskie Oko lake with mountains",
                "mediaDetails": {
                  "width": 1920,
                  "height": 1080
                }
              }
            },
            "trailReportFields": {
              "difficulty": "Moderate",
              "distanceKm": 9.0,
              "elevationGainM": 250,
              "estimatedTimeHours": 3.5,
              "gpsLatitude": "49.2014",
              "gpsLongitude": "20.0707"
            },
            "regions": {
              "nodes": [
                {
                  "name": "High Tatras",
                  "slug": "high-tatras"
                }
              ]
            },
            "seasons": {
              "nodes": [
                {
                  "name": "Summer",
                  "slug": "summer"
                },
                {
                  "name": "Fall",
                  "slug": "fall"
                }
              ]
            },
            "trailTypes": {
              "nodes": [
                {
                  "name": "Out-and-back",
                  "slug": "out-and-back"
                }
              ]
            },
            "features": {
              "nodes": [
                {
                  "name": "Lake",
                  "slug": "lake"
                },
                {
                  "name": "Viewpoint",
                  "slug": "viewpoint"
                }
              ]
            },
            "language": {
              "code": "PL",
              "name": "Polish"
            }
          }
        }
      ]
    }
  }
}
```

**Filter Options (where argument):**
- **difficulty:** Easy, Moderate, Difficult, Very Difficult, Expert
- **region:** Western Tatras, Eastern Tatras, High Tatras
- **season:** Spring, Summer, Fall, Winter, Year-round
- **trailType:** Loop, Out-and-back, Point-to-point
- **features:** Waterfall, Peak, Mountain Hut, Viewpoint, Lake, Ridge

---

### Query: Fetch Single Trail Report by Slug

**Description:** Retrieves complete trail report data for individual trail page.

**GraphQL Query:**
```graphql
query GetTrailReportBySlug($slug: ID!, $language: LanguageCodeFilterEnum) {
  trailReport(id: $slug, idType: SLUG) {
    id
    databaseId
    title(format: RENDERED)
    slug
    date
    modified
    content(format: RENDERED)
    excerpt
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
    featuredImage {
      node {
        sourceUrl(size: LARGE)
        altText
        caption
        mediaDetails {
          width
          height
        }
      }
    }
    gallery {
      images {
        sourceUrl(size: LARGE)
        altText
        caption
        mediaDetails {
          width
          height
        }
      }
    }
    trailReportFields {
      difficulty
      distanceKm
      elevationGainM
      estimatedTimeHours
      gpsLatitude
      gpsLongitude
      trailMapEmbed
    }
    regions {
      nodes {
        name
        slug
        description
      }
    }
    seasons {
      nodes {
        name
        slug
      }
    }
    trailTypes {
      nodes {
        name
        slug
      }
    }
    features {
      nodes {
        name
        slug
      }
    }
    comments(where: { status: "APPROVE" }) {
      nodes {
        id
        databaseId
        date
        content(format: RENDERED)
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
    seo {
      title
      metaDesc
      canonical
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
      }
    }
    language {
      code
      name
    }
    translations {
      uri
      slug
      language {
        code
        name
      }
    }
  }
}
```

**Variables:**
```json
{
  "slug": "morskie-oko-czarny-staw",
  "language": "PL"
}
```

**Response Example:**
```json
{
  "data": {
    "trailReport": {
      "id": "cG9zdDoxMjM=",
      "databaseId": 123,
      "title": "Morskie Oko - Czarny Staw Trail",
      "slug": "morskie-oko-czarny-staw",
      "date": "2025-10-15T10:00:00",
      "modified": "2025-10-16T12:30:00",
      "content": "<p>Full trail report content with HTML formatting...</p>",
      "excerpt": "A stunning trail to the iconic Morskie Oko lake...",
      "author": {
        "node": {
          "name": "Trail Author",
          "avatar": {
            "url": "https://secure.gravatar.com/avatar/..."
          }
        }
      },
      "featuredImage": {
        "node": {
          "sourceUrl": "https://wp.tatra-trails.com/wp-content/uploads/2025/10/morskie-oko.jpg",
          "altText": "Morskie Oko lake view",
          "caption": "Morskie Oko in autumn",
          "mediaDetails": {
            "width": 1920,
            "height": 1080
          }
        }
      },
      "gallery": {
        "images": [
          {
            "sourceUrl": "https://wp.tatra-trails.com/wp-content/uploads/2025/10/gallery-1.jpg",
            "altText": "Trail marker",
            "caption": "Well-marked trail",
            "mediaDetails": {
              "width": 1920,
              "height": 1080
            }
          }
        ]
      },
      "trailReportFields": {
        "difficulty": "Moderate",
        "distanceKm": 9.0,
        "elevationGainM": 250,
        "estimatedTimeHours": 3.5,
        "gpsLatitude": "49.2014",
        "gpsLongitude": "20.0707",
        "trailMapEmbed": "<iframe src='https://maps.google.com/...'></iframe>"
      },
      "regions": {
        "nodes": [
          {
            "name": "High Tatras",
            "slug": "high-tatras",
            "description": "The highest mountain range in Poland"
          }
        ]
      },
      "seasons": {
        "nodes": [
          {
            "name": "Summer",
            "slug": "summer"
          },
          {
            "name": "Fall",
            "slug": "fall"
          }
        ]
      },
      "trailTypes": {
        "nodes": [
          {
            "name": "Out-and-back",
            "slug": "out-and-back"
          }
        ]
      },
      "features": {
        "nodes": [
          {
            "name": "Lake",
            "slug": "lake"
          },
          {
            "name": "Viewpoint",
            "slug": "viewpoint"
          }
        ]
      },
      "comments": {
        "nodes": [
          {
            "id": "Y29tbWVudDo0NTY=",
            "databaseId": 456,
            "date": "2025-10-20T14:30:00",
            "content": "<p>Great trail! The views were stunning.</p>",
            "author": {
              "node": {
                "name": "Hiker John",
                "avatar": {
                  "url": "https://secure.gravatar.com/avatar/..."
                }
              }
            }
          }
        ]
      },
      "seo": {
        "title": "Morskie Oko - Czarny Staw Trail Guide | Tatra Trails",
        "metaDesc": "Complete guide to hiking from Morskie Oko to Czarny Staw in the High Tatras. Trail details, photos, and tips.",
        "canonical": "https://tatra-trails.com/trail/morskie-oko-czarny-staw",
        "opengraphTitle": "Morskie Oko - Czarny Staw Trail",
        "opengraphDescription": "A stunning trail in the High Tatras",
        "opengraphImage": {
          "sourceUrl": "https://wp.tatra-trails.com/wp-content/uploads/2025/10/morskie-oko.jpg"
        }
      },
      "language": {
        "code": "PL",
        "name": "Polish"
      },
      "translations": [
        {
          "uri": "/en/trail/morskie-oko-czarny-staw",
          "slug": "morskie-oko-czarny-staw",
          "language": {
            "code": "EN",
            "name": "English"
          }
        }
      ]
    }
  }
}
```

---

### Query: Fetch Trail Reports by Filters

**Description:** Retrieves trails filtered by multiple taxonomies (region, difficulty, season, features).

**GraphQL Query:**
```graphql
query GetFilteredTrailReports(
  $first: Int = 20
  $region: String
  $difficulty: [String]
  $season: [String]
  $features: [String]
  $language: LanguageCodeFilterEnum
) {
  trailReports(
    first: $first
    where: {
      language: $language
      taxQuery: {
        relation: AND
        taxArray: [
          {
            taxonomy: REGION
            terms: [$region]
            field: SLUG
            operator: IN
          }
          {
            taxonomy: DIFFICULTY
            terms: $difficulty
            field: SLUG
            operator: IN
          }
          {
            taxonomy: SEASON
            terms: $season
            field: SLUG
            operator: IN
          }
          {
            taxonomy: FEATURES
            terms: $features
            field: SLUG
            operator: IN
          }
        ]
      }
    }
  ) {
    nodes {
      id
      databaseId
      title
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl(size: MEDIUM_LARGE)
          altText
        }
      }
      trailReportFields {
        difficulty
        distanceKm
        elevationGainM
        estimatedTimeHours
      }
      regions {
        nodes {
          name
          slug
        }
      }
    }
  }
}
```

**Variables Example:**
```json
{
  "first": 20,
  "region": "high-tatras",
  "difficulty": ["moderate", "difficult"],
  "season": ["summer", "fall"],
  "features": ["lake", "viewpoint"],
  "language": "PL"
}
```

**Response:** Similar to GetAllTrailReports but filtered by specified criteria.

---

### Query: Fetch Trail Markers for Interactive Map

**Description:** Retrieves minimal trail data for displaying markers on interactive map.

**GraphQL Query:**
```graphql
query GetTrailMarkers($language: LanguageCodeFilterEnum) {
  trailReports(first: 100, where: { language: $language }) {
    nodes {
      id
      databaseId
      title
      slug
      trailReportFields {
        difficulty
        distanceKm
        gpsLatitude
        gpsLongitude
      }
      regions {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl(size: THUMBNAIL)
          altText
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "language": "EN"
}
```

**Response Example:**
```json
{
  "data": {
    "trailReports": {
      "nodes": [
        {
          "id": "cG9zdDoxMjM=",
          "databaseId": 123,
          "title": "Morskie Oko Trail",
          "slug": "morskie-oko-trail",
          "trailReportFields": {
            "difficulty": "Moderate",
            "distanceKm": 9.0,
            "gpsLatitude": "49.2014",
            "gpsLongitude": "20.0707"
          },
          "regions": {
            "nodes": [
              {
                "name": "High Tatras",
                "slug": "high-tatras"
              }
            ]
          },
          "featuredImage": {
            "node": {
              "sourceUrl": "https://wp.tatra-trails.com/wp-content/uploads/2025/10/morskie-oko-thumb.jpg",
              "altText": "Morskie Oko"
            }
          }
        }
      ]
    }
  }
}
```

---

## Blog Posts

### Query: Fetch Blog Posts (Planning Guides, Gear Reviews)

**Description:** Retrieves blog posts with category filtering.

**GraphQL Query:**
```graphql
query GetBlogPosts(
  $first: Int = 10
  $after: String
  $categoryName: String
  $language: LanguageCodeFilterEnum
) {
  posts(
    first: $first
    after: $after
    where: {
      language: $language
      categoryName: $categoryName
    }
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        databaseId
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl(size: MEDIUM)
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
        language {
          code
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "first": 10,
  "categoryName": "planning-guides",
  "language": "EN"
}
```

**Response Example:**
```json
{
  "data": {
    "posts": {
      "pageInfo": {
        "hasNextPage": false,
        "endCursor": "YXJyYXljb25uZWN0aW9uOjk="
      },
      "edges": [
        {
          "node": {
            "id": "cG9zdDo3ODk=",
            "databaseId": 789,
            "title": "Essential Gear for Tatra Mountain Hiking",
            "slug": "essential-gear-tatra-hiking",
            "date": "2025-09-01T09:00:00",
            "excerpt": "A comprehensive guide to gear you need for hiking in the Tatras...",
            "featuredImage": {
              "node": {
                "sourceUrl": "https://wp.tatra-trails.com/wp-content/uploads/2025/09/hiking-gear.jpg",
                "altText": "Hiking gear laid out"
              }
            },
            "categories": {
              "nodes": [
                {
                  "name": "Planning Guides",
                  "slug": "planning-guides"
                }
              ]
            },
            "author": {
              "node": {
                "name": "Trail Author"
              }
            },
            "language": {
              "code": "EN"
            }
          }
        }
      ]
    }
  }
}
```

---

### Query: Fetch Single Blog Post

**Description:** Retrieves complete blog post content.

**GraphQL Query:**
```graphql
query GetPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    id
    databaseId
    title
    slug
    date
    modified
    content
    excerpt
    featuredImage {
      node {
        sourceUrl(size: LARGE)
        altText
      }
    }
    author {
      node {
        name
        avatar {
          url
        }
        description
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
    tags {
      nodes {
        name
        slug
      }
    }
    comments(where: { status: "APPROVE" }) {
      nodes {
        id
        date
        content
        author {
          node {
            name
          }
        }
      }
    }
    seo {
      title
      metaDesc
      canonical
    }
    language {
      code
      name
    }
    translations {
      uri
      slug
      language {
        code
      }
    }
  }
}
```

**Variables:**
```json
{
  "slug": "essential-gear-tatra-hiking"
}
```

---

## Pages

### Query: Fetch Page by Slug (About, Contact, etc.)

**Description:** Retrieves static page content.

**GraphQL Query:**
```graphql
query GetPageBySlug($slug: ID!, $language: LanguageCodeFilterEnum) {
  page(id: $slug, idType: URI) {
    id
    databaseId
    title
    slug
    content
    featuredImage {
      node {
        sourceUrl(size: LARGE)
        altText
      }
    }
    seo {
      title
      metaDesc
      canonical
    }
    language {
      code
      name
    }
    translations {
      uri
      language {
        code
      }
    }
  }
}
```

**Variables:**
```json
{
  "slug": "about",
  "language": "EN"
}
```

---

## Comments

### Query: Fetch Comments for Trail or Post

**Description:** Retrieves approved comments for content.

**GraphQL Query:**
```graphql
query GetCommentsForPost($postId: Int!) {
  comments(
    where: {
      contentId: $postId
      status: "APPROVE"
      order: ASC
      orderby: COMMENT_DATE
    }
  ) {
    nodes {
      id
      databaseId
      date
      content
      author {
        node {
          name
          email
          avatar {
            url
          }
        }
      }
      parent {
        node {
          id
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "postId": 123
}
```

**Response Example:**
```json
{
  "data": {
    "comments": {
      "nodes": [
        {
          "id": "Y29tbWVudDo0NTY=",
          "databaseId": 456,
          "date": "2025-10-20T14:30:00",
          "content": "<p>Great trail! The views were stunning.</p>",
          "author": {
            "node": {
              "name": "Hiker John",
              "email": "john@example.com",
              "avatar": {
                "url": "https://secure.gravatar.com/avatar/abc123"
              }
            }
          },
          "parent": null
        }
      ]
    }
  }
}
```

---

## Taxonomies

### Query: Fetch All Taxonomies (Regions, Difficulties, Seasons, Features)

**Description:** Retrieves all taxonomy terms for filters.

**GraphQL Query:**
```graphql
query GetAllTaxonomies($language: LanguageCodeFilterEnum) {
  regions(first: 50, where: { language: $language }) {
    nodes {
      id
      name
      slug
      description
      count
    }
  }
  difficulties: terms(
    first: 10
    where: {
      taxonomies: DIFFICULTY
      language: $language
    }
  ) {
    nodes {
      id
      name
      slug
      count
    }
  }
  seasons: terms(
    first: 10
    where: {
      taxonomies: SEASON
      language: $language
    }
  ) {
    nodes {
      id
      name
      slug
      count
    }
  }
  trailTypes: terms(
    first: 10
    where: {
      taxonomies: TRAIL_TYPE
      language: $language
    }
  ) {
    nodes {
      id
      name
      slug
      count
    }
  }
  features: terms(
    first: 50
    where: {
      taxonomies: FEATURES
      language: $language
    }
  ) {
    nodes {
      id
      name
      slug
      count
    }
  }
}
```

**Variables:**
```json
{
  "language": "PL"
}
```

**Response Example:**
```json
{
  "data": {
    "regions": {
      "nodes": [
        {
          "id": "dGVybToxMg==",
          "name": "Tatry Wysokie",
          "slug": "high-tatras",
          "description": "The highest mountain range in Poland",
          "count": 25
        },
        {
          "id": "dGVybToxMw==",
          "name": "Tatry Zachodnie",
          "slug": "western-tatras",
          "description": "Western region of the Tatra Mountains",
          "count": 18
        }
      ]
    },
    "difficulties": {
      "nodes": [
        {
          "id": "dGVybToxNA==",
          "name": "Łatwy",
          "slug": "easy",
          "count": 10
        },
        {
          "id": "dGVybToxNQ==",
          "name": "Umiarkowany",
          "slug": "moderate",
          "count": 30
        },
        {
          "id": "dGVybToxNg==",
          "name": "Trudny",
          "slug": "difficult",
          "count": 20
        }
      ]
    },
    "seasons": {
      "nodes": [
        {
          "id": "dGVybToxNw==",
          "name": "Lato",
          "slug": "summer",
          "count": 40
        },
        {
          "id": "dGVybToxOA==",
          "name": "Jesień",
          "slug": "fall",
          "count": 35
        }
      ]
    },
    "trailTypes": {
      "nodes": [
        {
          "id": "dGVybToxOQ==",
          "name": "Pętla",
          "slug": "loop",
          "count": 15
        },
        {
          "id": "dGVybToyMA==",
          "name": "Tam i z powrotem",
          "slug": "out-and-back",
          "count": 28
        }
      ]
    },
    "features": {
      "nodes": [
        {
          "id": "dGVybToyMQ==",
          "name": "Wodospad",
          "slug": "waterfall",
          "count": 8
        },
        {
          "id": "dGVybToyMg==",
          "name": "Szczyt",
          "slug": "peak",
          "count": 22
        },
        {
          "id": "dGVybToyMw==",
          "name": "Jezioro",
          "slug": "lake",
          "count": 12
        }
      ]
    }
  }
}
```

---

## Multilingual Content

### Query: Fetch Content in Specific Language

**Description:** WPML/Polylang integration allows language-specific queries.

**GraphQL Query:**
```graphql
query GetTrailsInLanguage($language: LanguageCodeFilterEnum!) {
  trailReports(first: 20, where: { language: $language }) {
    nodes {
      id
      title
      slug
      language {
        code
        name
      }
      translations {
        uri
        slug
        title
        language {
          code
          name
        }
      }
    }
  }
}
```

**Variables (Polish):**
```json
{
  "language": "PL"
}
```

**Variables (English):**
```json
{
  "language": "EN"
}
```

**Response Example:**
```json
{
  "data": {
    "trailReports": {
      "nodes": [
        {
          "id": "cG9zdDoxMjM=",
          "title": "Morskie Oko - Czarny Staw",
          "slug": "morskie-oko-czarny-staw",
          "language": {
            "code": "PL",
            "name": "Polski"
          },
          "translations": [
            {
              "uri": "/en/trail/morskie-oko-czarny-staw",
              "slug": "morskie-oko-czarny-staw",
              "title": "Morskie Oko - Czarny Staw Trail",
              "language": {
                "code": "EN",
                "name": "English"
              }
            }
          ]
        }
      ]
    }
  }
}
```

---

## Search

### Query: Search Trail Reports and Posts

**Description:** Full-text search across trail reports and blog posts.

**GraphQL Query:**
```graphql
query SearchContent(
  $searchTerm: String!
  $language: LanguageCodeFilterEnum
) {
  trailReports(
    first: 10
    where: {
      search: $searchTerm
      language: $language
    }
  ) {
    nodes {
      id
      title
      slug
      excerpt
      trailReportFields {
        difficulty
        distanceKm
      }
    }
  }
  posts(
    first: 10
    where: {
      search: $searchTerm
      language: $language
    }
  ) {
    nodes {
      id
      title
      slug
      excerpt
    }
  }
}
```

**Variables:**
```json
{
  "searchTerm": "waterfall",
  "language": "EN"
}
```

**Response Example:**
```json
{
  "data": {
    "trailReports": {
      "nodes": [
        {
          "id": "cG9zdDo0NTY=",
          "title": "Wielka Siklawa Waterfall Trail",
          "slug": "wielka-siklawa-waterfall",
          "excerpt": "Beautiful trail to Poland's highest waterfall...",
          "trailReportFields": {
            "difficulty": "Moderate",
            "distanceKm": 7.5
          }
        }
      ]
    },
    "posts": {
      "nodes": [
        {
          "id": "cG9zdDo3ODk=",
          "title": "Best Waterfall Hikes in the Tatras",
          "slug": "best-waterfall-hikes",
          "excerpt": "Discover the most beautiful waterfalls..."
        }
      ]
    }
  }
}
```

---

## WordPress REST API Endpoints

### Comments (REST API)

#### POST /wp-json/wp/v2/comments

**Description:** Submit a new comment on trail report or blog post.

**Method:** `POST`

**Endpoint:** `https://wp.tatra-trails.com/wp-json/wp/v2/comments`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "post": 123,
  "author_name": "John Doe",
  "author_email": "john@example.com",
  "content": "Great trail! The views were stunning. I hiked it in September and the weather was perfect."
}
```

**Request Fields:**
- **post** (required, integer): Post/Trail ID to comment on
- **author_name** (required, string): Commenter's name
- **author_email** (required, string): Commenter's email (not displayed publicly)
- **content** (required, string): Comment text

**Response (Success - 201 Created):**
```json
{
  "id": 456,
  "post": 123,
  "parent": 0,
  "author": 0,
  "author_name": "John Doe",
  "author_email": "john@example.com",
  "date": "2025-11-11T15:30:00",
  "date_gmt": "2025-11-11T14:30:00",
  "content": {
    "rendered": "<p>Great trail! The views were stunning. I hiked it in September and the weather was perfect.</p>\n"
  },
  "status": "hold",
  "type": "comment",
  "author_avatar_urls": {
    "24": "https://secure.gravatar.com/avatar/abc123?s=24&d=mm&r=g",
    "48": "https://secure.gravatar.com/avatar/abc123?s=48&d=mm&r=g",
    "96": "https://secure.gravatar.com/avatar/abc123?s=96&d=mm&r=g"
  },
  "meta": [],
  "_links": {
    "self": [
      {
        "href": "https://wp.tatra-trails.com/wp-json/wp/v2/comments/456"
      }
    ]
  }
}
```

**Note:** Comment status is `"hold"` (pending moderation). Admin must approve before it appears publicly.

**Error Response (400 Bad Request):**
```json
{
  "code": "rest_comment_invalid_post_id",
  "message": "Invalid post ID.",
  "data": {
    "status": 400
  }
}
```

**Error Response (400 Bad Request - Invalid Email):**
```json
{
  "code": "rest_invalid_param",
  "message": "Invalid parameter(s): author_email",
  "data": {
    "status": 400,
    "params": {
      "author_email": "Invalid email format."
    }
  }
}
```

**Error Response (400 Bad Request - Spam Detected):**
```json
{
  "code": "comment_marked_as_spam",
  "message": "Comment was marked as spam by Akismet.",
  "data": {
    "status": 400
  }
}
```

---

### Contact Form

#### POST /wp-json/contact-form/v1/submit

**Description:** Submit contact form message.

**Method:** `POST`

**Endpoint:** `https://wp.tatra-trails.com/wp-json/contact-form/v1/submit`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Question about Giewont Trail",
  "message": "Hi, I'm planning to hike Giewont next month. Is the chain section difficult for beginners?"
}
```

**Request Fields:**
- **name** (required, string): Sender's name
- **email** (required, string): Sender's email
- **subject** (required, string): Email subject
- **message** (required, string): Email body

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully. We'll respond within 24-48 hours."
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "code": "missing_required_field",
  "message": "Email field is required."
}
```

**Error Response (429 Too Many Requests):**
```json
{
  "success": false,
  "code": "rate_limit_exceeded",
  "message": "Too many submissions. Please try again in 5 minutes."
}
```

**Implementation Note:** Requires custom WordPress REST API endpoint or plugin (e.g., Contact Form 7 REST API Extension).

---

## External API Integrations

### Google Maps JavaScript API

**Description:** Client-side JavaScript library for rendering interactive maps with trail markers.

**API Key:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (stored in Vercel environment variables)

**Usage:** Embedded in Next.js components

**Example (Individual Trail Map):**
```javascript
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const TrailMap = ({ latitude, longitude, trailName }) => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const defaultCenter = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude)
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        <Marker
          position={defaultCenter}
          title={trailName}
        />
      </GoogleMap>
    </LoadScript>
  );
};
```

**Example (Interactive Map with Multiple Trails):**
```javascript
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const InteractiveMap = ({ trails }) => {
  const [selectedTrail, setSelectedTrail] = useState(null);

  const mapStyles = {
    height: "600px",
    width: "100%"
  };

  const centerOfTatras = {
    lat: 49.2745,
    lng: 20.0419
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      "Easy": "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      "Moderate": "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
      "Difficult": "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
      "Very Difficult": "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      "Expert": "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
    };
    return colors[difficulty] || colors["Moderate"];
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={11}
        center={centerOfTatras}
      >
        {trails.map((trail) => (
          <Marker
            key={trail.id}
            position={{
              lat: parseFloat(trail.trailReportFields.gpsLatitude),
              lng: parseFloat(trail.trailReportFields.gpsLongitude)
            }}
            icon={getDifficultyColor(trail.trailReportFields.difficulty)}
            onClick={() => setSelectedTrail(trail)}
          />
        ))}

        {selectedTrail && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedTrail.trailReportFields.gpsLatitude),
              lng: parseFloat(selectedTrail.trailReportFields.gpsLongitude)
            }}
            onCloseClick={() => setSelectedTrail(null)}
          >
            <div>
              <h3>{selectedTrail.title}</h3>
              <p><strong>Difficulty:</strong> {selectedTrail.trailReportFields.difficulty}</p>
              <p><strong>Distance:</strong> {selectedTrail.trailReportFields.distanceKm} km</p>
              <a href={`/trail/${selectedTrail.slug}`}>View Details</a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};
```

**API Quotas:**
- **Free Tier:** 28,000 map loads/month
- **Cost After Free Tier:** $7 per 1,000 loads
- **Restrictions:** API key restricted to Vercel domain

**Documentation:** https://developers.google.com/maps/documentation/javascript

---

### Google Analytics 4

**Description:** Track visitor behavior, page views, events, and conversions.

**Measurement ID:** `G-XXXXXXXXXX` (stored in `NEXT_PUBLIC_GA_MEASUREMENT_ID`)

**Implementation:** Next.js `_app.tsx` or `layout.tsx`

**Example:**
```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Event Tracking Examples:**
```javascript
// Track filter usage
gtag('event', 'filter_trails', {
  'filter_type': 'difficulty',
  'filter_value': 'moderate'
});

// Track comment submission
gtag('event', 'comment_submitted', {
  'post_id': 123,
  'post_title': 'Morskie Oko Trail'
});

// Track affiliate link clicks
gtag('event', 'affiliate_click', {
  'product': 'hiking_boots',
  'affiliate_network': 'amazon_associates'
});
```

**Documentation:** https://developers.google.com/analytics/devguides/collection/ga4

---

### Google AdSense

**Description:** Display monetization ads on site.

**Publisher ID:** `ca-pub-XXXXXXXXXXXXXXXX`

**Ad Unit Integration:**
```javascript
// components/common/AdUnit.tsx
export const AdUnit = ({ slot, format = "auto", responsive = true }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
};
```

**Ad Placements:**
- Header banner (728x90 leaderboard on desktop, 320x50 mobile)
- Sidebar (300x600 half-page)
- In-content (responsive in-feed ads)
- Footer banner

**Documentation:** https://support.google.com/adsense

---

## Error Handling

### GraphQL Error Format

**Error Response Structure:**
```json
{
  "errors": [
    {
      "message": "Internal server error",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": ["trailReport"],
      "extensions": {
        "category": "internal"
      }
    }
  ],
  "data": null
}
```

**Common GraphQL Errors:**

**1. Invalid Query Syntax**
```json
{
  "errors": [
    {
      "message": "Syntax Error: Expected Name, found }",
      "locations": [{ "line": 5, "column": 1 }],
      "extensions": {
        "category": "graphql"
      }
    }
  ]
}
```

**2. Field Not Found**
```json
{
  "errors": [
    {
      "message": "Cannot query field \"invalidField\" on type \"TrailReport\".",
      "locations": [{ "line": 10, "column": 5 }],
      "extensions": {
        "category": "graphql"
      }
    }
  ]
}
```

**3. Resource Not Found**
```json
{
  "data": {
    "trailReport": null
  },
  "errors": [
    {
      "message": "No trail report found with slug: invalid-slug",
      "extensions": {
        "category": "user"
      }
    }
  ]
}
```

---

### WordPress REST API Error Format

**Error Response Structure:**
```json
{
  "code": "error_code_string",
  "message": "Human-readable error message",
  "data": {
    "status": 400
  }
}
```

**Common REST API Errors:**

**400 Bad Request:**
```json
{
  "code": "rest_missing_callback_param",
  "message": "Missing parameter(s): content",
  "data": {
    "status": 400,
    "params": ["content"]
  }
}
```

**401 Unauthorized:**
```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to create comments as this user.",
  "data": {
    "status": 401
  }
}
```

**404 Not Found:**
```json
{
  "code": "rest_post_invalid_id",
  "message": "Invalid post ID.",
  "data": {
    "status": 404
  }
}
```

**429 Too Many Requests:**
```json
{
  "code": "rest_rate_limit",
  "message": "Too many requests. Please wait before trying again.",
  "data": {
    "status": 429,
    "retry_after": 300
  }
}
```

**500 Internal Server Error:**
```json
{
  "code": "internal_server_error",
  "message": "An unexpected error occurred. Please try again later.",
  "data": {
    "status": 500
  }
}
```

---

### Client-Side Error Handling Best Practices

**Apollo Client Error Handling:**
```typescript
import { ApolloError } from '@apollo/client';

const handleGraphQLError = (error: ApolloError) => {
  if (error.networkError) {
    console.error('Network error:', error.networkError);
    // Show user-friendly message: "Connection issue. Please check your internet."
  }

  if (error.graphQLErrors) {
    error.graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `GraphQL error: ${message}`,
        `Location: ${locations}`,
        `Path: ${path}`,
        `Category: ${extensions?.category}`
      );
    });
    // Show user-friendly message: "Unable to load trails. Please try again."
  }
};
```

**Fetch API Error Handling:**
```typescript
const submitComment = async (commentData) => {
  try {
    const response = await fetch('https://wp.tatra-trails.com/wp-json/wp/v2/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit comment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Comment submission error:', error);
    // Show user-friendly message: "Failed to submit comment. Please try again."
    throw error;
  }
};
```

---

## Rate Limiting

### Current Rate Limits

**Cloudflare Rate Limiting (Frontend):**
- **Threshold:** 100 requests per minute per IP
- **Action:** Challenge with CAPTCHA or block
- **Scope:** All frontend requests

**WordPress Server Rate Limiting:**
- **Comment Submissions:** 5 comments per 15 minutes per IP
- **Contact Form:** 3 submissions per hour per IP
- **GraphQL Queries:** No hard limit (monitored for abuse)

**Google Maps API:**
- **Free Tier Quota:** 28,000 map loads per month
- **Quota Exceeded:** Maps fail to load with error message

**Google Analytics:**
- **No rate limit** (client-side tracking)

### Rate Limit Response

**HTTP 429 Too Many Requests:**
```json
{
  "code": "rest_rate_limit",
  "message": "Too many requests. Please wait before trying again.",
  "data": {
    "status": 429,
    "retry_after": 300
  }
}
```

**Headers:**
```
HTTP/1.1 429 Too Many Requests
Retry-After: 300
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1699876543
```

### Client-Side Rate Limit Handling

```typescript
const handleRateLimitError = (response) => {
  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    const waitSeconds = parseInt(retryAfter) || 60;

    // Show user message
    alert(`Too many requests. Please wait ${waitSeconds} seconds before trying again.`);

    // Optionally retry after delay
    setTimeout(() => {
      // Retry request
    }, waitSeconds * 1000);
  }
};
```

---

## Versioning

### Current API Version

**WPGraphQL Version:** 1.18+
**WordPress REST API Version:** v2 (WordPress core)

### Versioning Strategy

**GraphQL (No Versioning in URL):**
- GraphQL schema evolves through **deprecation** rather than versioning
- Fields marked `@deprecated` with migration instructions
- Clients continue working as new fields are added (backward compatible)
- Breaking changes avoided; prefer new field names

**Example Deprecation:**
```graphql
type TrailReport {
  distanceKm: Float
  distance: Float @deprecated(reason: "Use `distanceKm` instead for clarity")
}
```

**WordPress REST API (Versioned in URL):**
- Current version: `/wp-json/wp/v2/`
- Future versions: `/wp-json/wp/v3/` (if WordPress core introduces breaking changes)
- Custom endpoints: `/wp-json/contact-form/v1/` (versioned per plugin)

### Breaking Change Policy

**Notice Period:** 6 months minimum before removing deprecated fields

**Communication:**
- Documentation updated with deprecation notices
- GraphQL schema includes `@deprecated` directive
- Email notification to developers (if registered)

**Migration Path:**
- Old and new fields coexist during transition
- Example: `distance` and `distanceKm` both available for 6 months

---

## Security Considerations

### API Security Best Practices

**1. HTTPS Only**
- All API requests must use HTTPS
- HTTP requests automatically redirected to HTTPS

**2. CORS Configuration**
- WPGraphQL CORS headers whitelist Vercel domain:
  ```
  Access-Control-Allow-Origin: https://tatra-trails.com
  Access-Control-Allow-Methods: GET, POST
  Access-Control-Allow-Headers: Content-Type, Authorization
  ```

**3. Input Sanitization**
- WordPress sanitizes all GraphQL query inputs
- Comment content sanitized and escaped (XSS prevention)
- SQL injection prevented via WPGraphQL parameterized queries

**4. API Key Protection**
- Google Maps API key restricted to Vercel domain (HTTP referrer restriction)
- Never expose WordPress admin credentials in frontend code
- Environment variables used for all sensitive keys

**5. Rate Limiting**
- Cloudflare protects against DDoS attacks
- WordPress rate limiting prevents comment/form spam

**6. Comment Moderation**
- All comments held for moderation (status: "hold")
- Akismet spam filtering
- Admin approval required before public display

**7. Query Depth Limiting**
- WPGraphQL query depth limited to 15 levels (prevents nested query abuse)
- Query complexity analyzed before execution

**8. Content Security Policy (CSP)**
- Next.js frontend enforces CSP headers:
  ```
  Content-Security-Policy:
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://maps.googleapis.com https://www.googletagmanager.com;
    img-src 'self' data: https:;
    style-src 'self' 'unsafe-inline';
  ```

---

## Example Integration: Next.js Client

### Apollo Client Setup

```typescript
// lib/wordpress/client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.WORDPRESS_API_URL || 'https://wp.tatra-trails.com/graphql',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          trailReports: {
            keyArgs: ['where'],
            merge(existing, incoming, { args }) {
              if (!existing || !args?.after) {
                return incoming;
              }
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              };
            },
          },
        },
      },
    },
  }),
});
```

### Fetching Trail Reports in Next.js

```typescript
// app/trails/page.tsx (Server Component)
import { apolloClient } from '@/lib/wordpress/client';
import { GET_ALL_TRAIL_REPORTS } from '@/lib/wordpress/queries';

export default async function TrailsPage() {
  const { data } = await apolloClient.query({
    query: GET_ALL_TRAIL_REPORTS,
    variables: {
      first: 12,
      language: 'EN',
    },
  });

  const trails = data.trailReports.edges.map(edge => edge.node);

  return (
    <div>
      <h1>All Trails</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trails.map((trail) => (
          <TrailCard key={trail.id} trail={trail} />
        ))}
      </div>
    </div>
  );
}
```

---

## Changelog

**Version 1.0** (2025-11-11)
- Initial API documentation
- WPGraphQL queries for trail reports, posts, pages, comments, taxonomies
- WordPress REST API endpoints for comments and contact form
- External API integrations (Google Maps, Analytics, AdSense)
- Error handling, rate limiting, security considerations

---

## Related Documentation

- **PRD.md**: Product requirements and feature specifications
- **docs/architecture.md**: System architecture and tech stack
- **docs/db-schema.md**: WordPress database schema and ACF fields
- **docs/features.md**: Feature breakdown and user stories
- **docs/TESTING.md**: API testing strategies and tools

---

**Document Owner:** API Architect
**Review Cycle:** Quarterly or when API changes occur
**Next Review:** 2026-02-11
