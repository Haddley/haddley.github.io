import { describe, it, expect } from 'vitest';
import { describePage, starterQuestions, capHistory } from '../../src/lib/page-context';

const posts = [
  { slug: 'docker', title: 'Docker', categories: ['DevOps'], tags: 'docker, containers' },
];

describe('describePage', () => {
  it('knows a post page and names its slug', () => {
    const p = describePage('/posts/docker/', posts);
    expect(p.currentSlug).toBe('docker');
    expect(p.pageContext).toContain('title: "Docker"');
  });

  it('recognises a category page at /categories/<slug>/ and names the category', () => {
    const p = describePage('/categories/3d/', posts);
    expect(p.pageContext).toBe('"3D" category page');
    expect(p.pageRule).toContain('call get_posts_by_category with category "3D"');
    expect(p.pageRule).toContain('Do NOT call list_categories');
  });

  it('maps a slug to its category name, not the slug', () => {
    expect(describePage('/categories/dotnet/', posts).pageContext).toBe('".NET" category page');
    expect(describePage('/categories/power-platform/', posts).pageContext).toBe('"Power Platform" category page');
  });

  it('still understands the older /posts/category/<slug>/ address', () => {
    expect(describePage('/posts/category/azure/', posts).pageContext).toBe('"Azure" category page');
  });

  it('recognises a topic page and tells the model to call get_topic with the slug', () => {
    const p = describePage('/topics/copilot-studio/', posts);
    expect(p.pageContext).toBe('topic page /topics/copilot-studio/');
    expect(p.pageRule).toContain('call get_topic with topic "copilot-studio"');
  });

  it('treats the topics list as its own page and points at list_topics', () => {
    const p = describePage('/topics/', posts);
    expect(p.pageContext).toBe('topics list');
    expect(p.pageRule).toContain('list_topics');
  });

  it('has no rule for listings, the overview or the home page', () => {
    expect(describePage('/posts/', posts)).toMatchObject({ pageContext: 'blog post listing', pageRule: '' });
    expect(describePage('/categories/', posts)).toMatchObject({ pageContext: 'categories overview', pageRule: '' });
    expect(describePage('/', posts)).toMatchObject({ pageContext: 'home page', pageRule: '' });
  });

  it('does not mistake /categories/ (no slug) for a category page', () => {
    expect(describePage('/categories/', posts).pageRule).toBe('');
  });
});

describe('starterQuestions', () => {
  it('suggests questions that match the page', () => {
    expect(starterQuestions('/posts/docker/')[0]).toBe('Summarise this post');
    expect(starterQuestions('/categories/3d/')[0]).toBe('Summarise this category');
    expect(starterQuestions('/posts/category/azure/')[0]).toBe('Summarise this category');
    expect(starterQuestions('/topics/docker/')[0]).toBe('Summarise this topic');
    expect(starterQuestions('/topics/')[0]).toBe('What topics do you have?');
    expect(starterQuestions('/')).toContain('What topics do you have?');
  });
});

describe('capHistory', () => {
  const msg = (role: string, n: number) => ({ role, content: `m${n}` });

  it('keeps the last messages and starts on a user message', () => {
    const all = [msg('user', 1), msg('assistant', 2), msg('user', 3), msg('assistant', 4), msg('user', 5), msg('assistant', 6), msg('user', 7), msg('assistant', 8)];
    const kept = capHistory(all, 6);
    expect(kept).toHaveLength(6);
    expect(kept[0].role).toBe('user');
    expect(kept[kept.length - 1].content).toBe('m8');
  });

  it('drops a leading answer left over by the cut', () => {
    const all = [msg('user', 1), msg('assistant', 2), msg('user', 3), msg('assistant', 4), msg('user', 5)];
    const kept = capHistory(all, 4);   // would start on an assistant message
    expect(kept[0].role).toBe('user');
    expect(kept.map(m => m.content)).toEqual(['m3', 'm4', 'm5']);
  });

  it('keeps everything when the chat is short and copes with an empty one', () => {
    expect(capHistory([msg('user', 1), msg('assistant', 2)], 6)).toHaveLength(2);
    expect(capHistory([], 6)).toEqual([]);
  });
});
