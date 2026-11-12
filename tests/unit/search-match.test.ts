import { describe, it, expect } from 'vitest';
import { matchTopics, matchCategories, matchPosts, matchWiki, searchPosts, tokenize } from '../../src/lib/search-match';

const topics = [
  { slug: 'docker', title: 'Docker', posts: ['docker', 'kubernetes'] },
  { slug: 'dynamics-365-and-crm', title: 'Dynamics 365 and CRM', posts: ['dynamicssales1'] },
];
const posts = [
  { slug: 'docker', title: 'Docker', description: 'Containers', tags: ['docker'], categories: ['DevOps'] },
  { slug: 'kubernetes', title: 'Kubernetes', description: 'Clusters', tags: ['k8s'], categories: ['DevOps'] },
  { slug: 'dynamicssales1', title: 'Sales', description: 'A pipeline', tags: ['dynamics-365-sales'], categories: ['Microsoft Dynamics'] },
  { slug: 'cube', title: 'A cube', description: 'Printed', tags: ['openscad'], categories: ['3D'] },
  { slug: 'case', title: 'A case', description: 'Printed', tags: ['openscad'], categories: ['3D printing'] },
];
const categories = [
  { slug: '3d', name: '3D', aliases: [] as string[] },
  { slug: '3d-printing', name: '3D printing' },
  { slug: 'dotnet', name: '.NET', aliases: ['net', 'csharp'] },
  { slug: 'devops', name: 'DevOps' },
];

describe('matchTopics', () => {
  it('matches by name, ignoring case', () => {
    expect(matchTopics(topics, 'CRM').map(t => t.slug)).toEqual(['dynamics-365-and-crm']);
    expect(matchTopics(topics, 'dock').map(t => t.slug)).toEqual(['docker']);
  });
  it('returns nothing for an empty or blank term', () => {
    expect(matchTopics(topics, '')).toEqual([]);
    expect(matchTopics(topics, '   ')).toEqual([]);
  });
});

describe('matchCategories', () => {
  it('finds every category whose name contains the term, with counts', () => {
    const m = matchCategories(categories, posts, '3d');
    expect(m.map(c => [c.name, c.count])).toEqual([['3D', 1], ['3D printing', 1]]);
  });
  it('matches an alias exactly', () => {
    expect(matchCategories(categories, posts.concat({ slug: 'x', title: 'x', description: '', tags: [], categories: ['.NET'] }), 'csharp').map(c => c.name)).toEqual(['.NET']);
  });
  it('leaves out a category with no posts', () => {
    expect(matchCategories(categories, [], '3d')).toEqual([]);
  });
});

describe('matchPosts', () => {
  it('matches by title, description, tag or category', () => {
    expect(matchPosts(posts, 'openscad', []).map(p => p.slug)).toEqual(['cube', 'case']);
    expect(matchPosts(posts, 'pipeline', []).map(p => p.slug)).toEqual(['dynamicssales1']);
    expect(matchPosts(posts, 'devops', []).map(p => p.slug)).toEqual(['docker', 'kubernetes']);
  });
  it('adds the posts behind a matched topic even when their text does not match', () => {
    const matched = matchTopics(topics, 'docker');
    expect(matchPosts(posts, 'docker', matched).map(p => p.slug)).toEqual(['docker', 'kubernetes']);
    expect(matchPosts(posts, 'docker', []).map(p => p.slug)).toEqual(['docker']);
  });
});

describe('matchWiki', () => {
  const wiki = [
    { slug: 'a', summary: 'I ran a model locally. It was slow.', claims: [{ text: 'Quantisation makes a model smaller.' }] },
    { slug: 'b', summary: 'I built a gatekeeper. It limits requests.', claims: [] },
  ];

  it('returns the claim that mentions the term', () => {
    expect(matchWiki(wiki, 'quantisation').get('a')).toBe('Quantisation makes a model smaller.');
  });
  it('falls back to the summary sentence that mentions it', () => {
    expect(matchWiki(wiki, 'gatekeeper').get('b')).toBe('I built a gatekeeper.');
  });
  it('ignores terms that are too short to mean anything', () => {
    expect(matchWiki(wiki, 'ai').size).toBe(0);
    expect(matchWiki(wiki, '').size).toBe(0);
  });
  it('lets matchPosts add the wiki matches', () => {
    const extra = matchWiki(wiki, 'gatekeeper').keys();
    expect(matchPosts([{ slug: 'b', title: 'Other', description: '', tags: [] }], 'gatekeeper', [], extra).map(p => p.slug)).toEqual(['b']);
  });
});

describe('tokenize', () => {
  it('lower-cases, splits on punctuation and drops a possessive', () => {
    expect(tokenize("Business Central's built-in MCP server")).toEqual(['business', 'central', 'built', 'in', 'mcp', 'server']);
    expect(tokenize('  node.js, C#  ')).toEqual(['node.js', 'c#']);
    expect(tokenize('   ')).toEqual([]);
  });
});

describe('searching by word', () => {
  const bc = [
    { slug: 'bc-mcp', title: 'Model Context Protocol', description: "Connecting Claude Code to Business Central's built-in MCP server", tags: ['mcp', 'entra-id'], categories: ['Business Central', 'AI'] },
    { slug: 'bc-other', title: 'Business Central reports', description: 'A report layout', tags: ['al-language'], categories: ['Business Central'] },
    { slug: 'mcp-cal', title: 'A calendar MCP server', description: 'A TypeScript server', tags: ['mcp', 'typescript'], categories: ['AI'] },
    { slug: 'harness', title: 'DeepSeek Harness', description: 'Reading the ledger over MCP', tags: ['mcp'], categories: ['AI', 'Business Central'] },
  ];

  it('finds a post when the words are in different fields (the query that found nothing before)', () => {
    expect(matchPosts(bc, 'business central mcp', []).map(p => p.slug)).toEqual(['bc-mcp', 'harness']);
  });
  it('does not need the words in the order they were typed', () => {
    expect(matchPosts(bc, 'mcp central business', []).map(p => p.slug)).toEqual(['bc-mcp', 'harness']);
  });
  it('ranks a word in the title above one in a tag, and a whole phrase in the title first', () => {
    expect(matchPosts(bc, 'business central', []).map(p => p.slug)[0]).toBe('bc-other');
    expect(matchPosts(bc, 'mcp', []).map(p => p.slug)[0]).toBe('bc-mcp');
  });
  it('keeps the original order when posts rank the same', () => {
    expect(matchPosts(bc, 'ai', []).map(p => p.slug)).toEqual(['bc-mcp', 'mcp-cal', 'harness']);
  });
  it('understands an abbreviation', () => {
    expect(matchPosts(bc, 'bc reports', []).map(p => p.slug)).toEqual(['bc-other']);
    expect(matchPosts(bc, 'model context protocol', []).map(p => p.slug)).toContain('bc-mcp');
  });
  it('lets a matched topic satisfy only the words in its own name', () => {
    const topic = { slug: 'business-central', title: 'Business Central', posts: ['harness'] };
    expect(matchPosts(bc, 'business central banana', [topic]).map(p => p.slug)).toEqual([]);
  });
  it('returns the closest posts when no post has every word', () => {
    const r = searchPosts(bc, 'business central docker', []);
    expect(r.exact).toEqual([]);
    expect(r.closest.map(p => p.slug).slice(0, 2)).toEqual(['bc-other', 'bc-mcp']);
  });
  it('returns nothing, and no closest posts, when no word matches', () => {
    const r = searchPosts(bc, 'zzzz qqqq', []);
    expect(r).toEqual({ exact: [], closest: [] });
  });
  it('still shows every post for an empty term', () => {
    expect(searchPosts(bc, '', []).exact).toHaveLength(bc.length);
  });
  it('shows the matching category for a query that names it with other words', () => {
    const cats = [{ slug: 'business-central', name: 'Business Central' }, { slug: 'ai', name: 'AI' }];
    expect(matchCategories(cats, bc, 'business central mcp').map(c => c.name)).toEqual(['Business Central']);
  });
});
