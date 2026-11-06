import { describe, it, expect } from 'vitest';
import { matchTopics, matchCategories, matchPosts, matchWiki } from '../../src/lib/search-match';

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
