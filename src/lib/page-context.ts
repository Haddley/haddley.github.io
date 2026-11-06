import { CATEGORIES, getCategoryUrl } from './agent-tools';

export interface PagePost {
  slug: string;
  title: string;
  categories: string[];
  tags: string;
}

export interface PageContext {
  /** A short description of the page, put at the start of every question. */
  pageContext: string;
  /** A rule for the model that says what "this" means here. Empty when the page has none. */
  pageRule: string;
  /** The slug when the visitor is on a post page, otherwise empty. */
  currentSlug: string;
}

/**
 * Works out what "this page" means from the address. Post pages are /posts/<slug>/, category pages
 * /categories/<slug>/ (and /posts/category/<slug>/), topic pages /topics/<slug>/.
 */
export function describePage(pathname: string, posts: PagePost[]): PageContext {
  const postMatch = pathname.match(/^\/posts\/([^/]+)\/?$/);
  const categoryMatch = pathname.match(/^\/(?:categories|posts\/category)\/([^/]+)\/?$/);
  const topicMatch = pathname.match(/^\/topics\/([^/]+)\/?$/);

  if (postMatch && postMatch[1] !== 'category') {
    const slug = postMatch[1];
    const post = posts.find(p => p.slug === slug);
    return {
      pageContext: post
        ? `post url: "/posts/${slug}/", slug: "${slug}", title: "${post.title}" (categories: ${post.categories.join(', ')}; tags: ${post.tags})`
        : `post at /posts/${slug}/`,
      pageRule: '',
      currentSlug: slug,
    };
  }
  if (categoryMatch) {
    const catSlug = categoryMatch[1];
    const catName = CATEGORIES.find(c => getCategoryUrl(c) === `/categories/${catSlug}/`) ?? catSlug;
    return {
      pageContext: `"${catName}" category page`,
      pageRule: `(2b) The user is on the "${catName}" category page. "this category", "this page" and "summarise this" mean the "${catName}" category: call get_posts_by_category with category "${catName}", then summarise its themes and name the most useful posts. Do NOT call list_categories and do NOT ask which category.`,
      currentSlug: '',
    };
  }
  if (topicMatch) {
    const topicSlug = topicMatch[1];
    return {
      pageContext: `topic page /topics/${topicSlug}/`,
      pageRule: `(2b) The user is on the topic page "${topicSlug}". "this topic", "this page" and "summarise this" mean that topic: call get_topic with topic "${topicSlug}", then summarise its idea, key claims and where the posts differ, and link the posts. Do NOT ask which topic.`,
      currentSlug: '',
    };
  }
  if (pathname.startsWith('/topics')) {
    return {
      pageContext: 'topics list',
      pageRule: '(2b) The user is on the topics list. "topics", "what is here" and "list them" mean the topic pages: call list_topics. For questions about a subject use search_wiki.',
      currentSlug: '',
    };
  }
  if (pathname.startsWith('/posts')) return { pageContext: 'blog post listing', pageRule: '', currentSlug: '' };
  if (pathname.startsWith('/categories')) return { pageContext: 'categories overview', pageRule: '', currentSlug: '' };
  return { pageContext: 'home page', pageRule: '', currentSlug: '' };
}

/** One-tap questions for the empty chat, chosen to match the page. */
export function starterQuestions(pathname: string): string[] {
  if (/^\/posts\/category\//.test(pathname)) return starterQuestions(pathname.replace('/posts/category/', '/categories/'));
  if (/^\/posts\/[^/]+\/?$/.test(pathname)) return ['Summarise this post', 'Which of your posts are related to this one?'];
  if (/^\/categories\/[^/]+\/?$/.test(pathname)) return ['Summarise this category', 'Which of these posts should I read first?'];
  if (/^\/topics\/[^/]+\/?$/.test(pathname)) return ['Summarise this topic', 'Where do these posts disagree?'];
  if (pathname.startsWith('/topics')) return ['What topics do you have?', 'Which topic should I start with?'];
  return ['What topics do you have?', 'What did you conclude about running models locally?', 'Which posts are about Business Central?'];
}

/** Keeps the last few messages of a chat, always starting on a message from the visitor. */
export function capHistory<T extends { role: string }>(messages: T[], max: number): T[] {
  const kept = messages.slice(-max);
  while (kept.length && kept[0].role !== 'user') kept.shift();
  return kept;
}
