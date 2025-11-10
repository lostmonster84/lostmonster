import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

// Content is in the website folder itself, not a subdirectory
const contentDirectory = path.join(process.cwd());

export interface MarkdownContent {
  slug: string;
  contentHtml: string;
  [key: string]: any; // For frontmatter fields
}

/**
 * Get markdown content from a file
 * @param slug - The filename without .md extension
 * @param directory - The directory within content/ (e.g., 'pages', 'services')
 */
export async function getMarkdownContent(
  slug: string,
  directory: string
): Promise<MarkdownContent> {
  // For pages, services, case-studies - they're directly in those folders
  const fullPath = path.join(contentDirectory, directory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Markdown file not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Process markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...data,
  };
}

/**
 * Get all slugs (filenames) from a directory
 * @param directory - The directory within content/ (e.g., 'pages', 'services')
 */
export function getAllSlugs(directory: string): string[] {
  const fullPath = path.join(contentDirectory, directory);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

/**
 * Get all markdown files from a directory with their metadata
 * @param directory - The directory within content/
 */
export async function getAllMarkdownContent(
  directory: string
): Promise<MarkdownContent[]> {
  const slugs = getAllSlugs(directory);
  const contents = await Promise.all(
    slugs.map((slug) => getMarkdownContent(slug, directory))
  );
  return contents;
}

