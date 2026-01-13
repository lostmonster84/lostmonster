import { getMarkdownContent, getAllMarkdownContent, getAllSlugs, MarkdownContent } from './markdown';

/**
 * Content type definitions
 */
export interface PageContent extends MarkdownContent {
  title?: string;
  description?: string;
}

export interface ServiceContent extends MarkdownContent {
  title?: string;
  description?: string;
  priceRange?: string;
  timeline?: string;
}

export interface CaseStudyContent extends MarkdownContent {
  title?: string;
  client?: string;
  industry?: string;
  results?: string;
}

/**
 * Get page content
 */
export async function getPageContent(slug: string): Promise<PageContent> {
  return getMarkdownContent(slug, 'pages') as Promise<PageContent>;
}

/**
 * Get service content
 */
export async function getServiceContent(slug: string): Promise<ServiceContent> {
  return getMarkdownContent(slug, 'services') as Promise<ServiceContent>;
}

/**
 * Get case study content
 */
export async function getCaseStudyContent(slug: string): Promise<CaseStudyContent> {
  return getMarkdownContent(slug, 'case-studies') as Promise<CaseStudyContent>;
}

/**
 * Get all services
 */
export async function getAllServices(): Promise<ServiceContent[]> {
  return getAllMarkdownContent('services') as Promise<ServiceContent[]>;
}

/**
 * Get all case studies
 */
export async function getAllCaseStudies(): Promise<CaseStudyContent[]> {
  return getAllMarkdownContent('case-studies') as Promise<CaseStudyContent[]>;
}

/**
 * Get all service slugs
 */
export function getServiceSlugs(): string[] {
  return getAllSlugs('services');
}

/**
 * Get all case study slugs
 */
export function getCaseStudySlugs(): string[] {
  return getAllSlugs('case-studies');
}

