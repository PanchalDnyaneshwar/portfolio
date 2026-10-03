export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  cover?: string;
  published: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
  headings: { text: string; id: string; level: number }[];
}
