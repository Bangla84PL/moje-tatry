/**
 * Tatra Trails - GraphQL Queries
 *
 * All GraphQL queries for fetching data from WordPress
 */

import { gql } from '@apollo/client';

// ============================================
// Fragments
// ============================================

export const TRAIL_CARD_FRAGMENT = gql`
  fragment TrailCardFragment on TrailReport {
    id
    databaseId
    title
    slug
    excerpt
    date
    featuredImage {
      node {
        sourceUrl(size: MEDIUM_LARGE)
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    trailData {
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
`;

export const TRAIL_FULL_FRAGMENT = gql`
  fragment TrailFullFragment on TrailReport {
    id
    databaseId
    title
    slug
    content
    excerpt
    date
    modified
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
        caption
        mediaDetails {
          width
          height
        }
      }
      trailMapEmbed
    }
    regions {
      nodes {
        id
        name
        slug
        description
      }
    }
    seasons {
      nodes {
        id
        name
        slug
      }
    }
    trailTypes {
      nodes {
        id
        name
        slug
      }
    }
    features {
      nodes {
        id
        name
        slug
      }
    }
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
`;

export const SEO_FRAGMENT = gql`
  fragment SeoFragment on PostTypeSEO {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
    }
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
    }
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    databaseId
    date
    content
    status
    author {
      node {
        name
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
`;

// ============================================
// Trail Queries
// ============================================

export const GET_ALL_TRAILS = gql`
  ${TRAIL_CARD_FRAGMENT}
  query GetAllTrails($first: Int = 12, $after: String, $language: LanguageCodeFilterEnum) {
    trailReports(
      first: $first
      after: $after
      where: { language: $language, orderby: { field: DATE, order: DESC } }
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
          ...TrailCardFragment
        }
      }
    }
  }
`;

export const GET_TRAIL_BY_SLUG = gql`
  ${TRAIL_FULL_FRAGMENT}
  ${SEO_FRAGMENT}
  ${COMMENT_FRAGMENT}
  query GetTrailBySlug($slug: ID!, $language: LanguageCodeFilterEnum) {
    trailReport(id: $slug, idType: SLUG) {
      ...TrailFullFragment
      seo {
        ...SeoFragment
      }
      comments(where: { status: "APPROVE" }) {
        nodes {
          ...CommentFragment
        }
      }
    }
  }
`;

export const GET_FILTERED_TRAILS = gql`
  ${TRAIL_CARD_FRAGMENT}
  query GetFilteredTrails(
    $first: Int = 20
    $after: String
    $language: LanguageCodeFilterEnum
    $region: String
    $difficulty: [String]
    $season: [String]
    $features: [String]
    $search: String
  ) {
    trailReports(
      first: $first
      after: $after
      where: {
        language: $language
        search: $search
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
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...TrailCardFragment
        }
      }
    }
  }
`;

export const GET_TRAIL_MARKERS = gql`
  query GetTrailMarkers($language: LanguageCodeFilterEnum) {
    trailReports(first: 100, where: { language: $language }) {
      nodes {
        id
        databaseId
        title
        slug
        trailData {
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
`;

export const GET_FEATURED_TRAILS = gql`
  ${TRAIL_CARD_FRAGMENT}
  query GetFeaturedTrails($language: LanguageCodeFilterEnum) {
    trailReports(
      first: 6
      where: {
        language: $language
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        ...TrailCardFragment
      }
    }
  }
`;

// ============================================
// Blog Post Queries
// ============================================

export const GET_BLOG_POSTS = gql`
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
`;

export const GET_POST_BY_SLUG = gql`
  ${SEO_FRAGMENT}
  ${COMMENT_FRAGMENT}
  query GetPostBySlug($slug: ID!, $language: LanguageCodeFilterEnum) {
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
          ...CommentFragment
        }
      }
      seo {
        ...SeoFragment
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
`;

// ============================================
// Page Queries
// ============================================

export const GET_PAGE_BY_SLUG = gql`
  ${SEO_FRAGMENT}
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
        ...SeoFragment
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
`;

// ============================================
// Taxonomy Queries
// ============================================

export const GET_ALL_TAXONOMIES = gql`
  query GetAllTaxonomies($language: LanguageCodeFilterEnum) {
    regions(first: 50, where: { language: $language }) {
      nodes {
        id
        databaseId
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
        databaseId
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
        databaseId
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
        databaseId
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
        databaseId
        name
        slug
        count
      }
    }
  }
`;

// ============================================
// Comment Queries
// ============================================

export const GET_COMMENTS_FOR_POST = gql`
  ${COMMENT_FRAGMENT}
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
        ...CommentFragment
      }
    }
  }
`;

// ============================================
// Search Query
// ============================================

export const SEARCH_CONTENT = gql`
  ${TRAIL_CARD_FRAGMENT}
  query SearchContent($searchTerm: String!, $language: LanguageCodeFilterEnum) {
    trailReports(
      first: 10
      where: {
        search: $searchTerm
        language: $language
      }
    ) {
      nodes {
        ...TrailCardFragment
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
`;
