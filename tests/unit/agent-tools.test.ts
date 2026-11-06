// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { searchPosts, getPostsByCategory, getCategoryUrl, searchWiki, getTopic, listTopics } from '../../src/lib/agent-tools';
import type { PostMeta, WikiData } from '../../src/lib/agent-tools';

const POSTS: PostMeta[] = [
  { slug: 'azure-functions-intro', title: 'Azure Functions Intro', description: 'Getting started with Azure Functions', date: '2024-01-01', categories: ['Azure'], tags: 'serverless, azure-functions, cloud' },
  { slug: 'react-hooks', title: 'React Hooks Guide', description: 'useState and useEffect explained', date: '2024-02-01', categories: ['React'], tags: 'hooks, useState, useEffect' },
  { slug: 'python-ml', title: 'Python for Machine Learning', description: 'Using scikit-learn for classification', date: '2024-03-01', categories: ['Python', 'AI'], tags: 'machine-learning, scikit-learn, classification' },
  { slug: 'azure-devops', title: 'Azure DevOps Pipelines', description: 'CI/CD with Azure DevOps', date: '2024-04-01', categories: ['Azure', 'DevOps'], tags: 'ci-cd, pipelines, yaml' },
  { slug: 'typescript-generics', title: 'TypeScript Generics', description: 'Advanced generics patterns', date: '2024-05-01', categories: ['TypeScript'], tags: 'generics, types, advanced' },
];

describe('searchPosts', () => {
  it('matches on title keyword', () => {
    const results = searchPosts('hooks', POSTS);
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('react-hooks');
  });

  it('matches on description keyword', () => {
    const results = searchPosts('scikit-learn', POSTS);
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('python-ml');
  });

  it('matches on tags keyword', () => {
    const results = searchPosts('ci-cd', POSTS);
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('azure-devops');
  });

  it('matches multiple posts sharing a keyword', () => {
    const results = searchPosts('azure', POSTS);
    expect(results).toHaveLength(2);
    expect(results.map(p => p.slug)).toEqual(expect.arrayContaining(['azure-functions-intro', 'azure-devops']));
  });

  it('requires all terms to match (AND logic)', () => {
    const results = searchPosts('azure ci-cd', POSTS);
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('azure-devops');
  });

  it('is case-insensitive', () => {
    const results = searchPosts('REACT', POSTS);
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('react-hooks');
  });

  it('returns empty array for no matches', () => {
    expect(searchPosts('kubernetes', POSTS)).toEqual([]);
  });

  it('caps results at 10', () => {
    const many: PostMeta[] = Array.from({ length: 15 }, (_, i) => ({
      slug: `post-${i}`,
      title: `Test Post ${i}`,
      description: 'common keyword',
      date: '2024-01-01',
      categories: ['Azure'],
      tags: 'tag1, tag2, tag3',
    }));
    expect(searchPosts('common', many)).toHaveLength(10);
  });
});

describe('getPostsByCategory', () => {
  it('returns posts matching the category', () => {
    const results = getPostsByCategory('Azure', POSTS);
    expect(results).toHaveLength(2);
    expect(results.map(p => p.slug)).toEqual(expect.arrayContaining(['azure-functions-intro', 'azure-devops']));
  });

  it('is case-insensitive', () => {
    const results = getPostsByCategory('azure', POSTS);
    expect(results).toHaveLength(2);
  });

  it('returns empty array for unknown category', () => {
    expect(getPostsByCategory('PHP', POSTS)).toEqual([]);
  });

  it('matches posts with multiple categories', () => {
    const results = getPostsByCategory('AI', POSTS);
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('python-ml');
  });

  it('returns every post in the category (the assistant caps what it sends to the model)', () => {
    const many: PostMeta[] = Array.from({ length: 15 }, (_, i) => ({
      slug: `post-${i}`,
      title: `Post ${i}`,
      description: 'desc',
      date: '2024-01-01',
      categories: ['Azure'],
      tags: 'tag1, tag2, tag3',
    }));
    expect(getPostsByCategory('Azure', many)).toHaveLength(15);
  });
});

describe('getCategoryUrl', () => {
  it('produces a root-relative URL', () => {
    expect(getCategoryUrl('Azure')).toBe('/categories/azure/');
  });

  it('slugifies multi-word category names', () => {
    expect(getCategoryUrl('Power Platform')).toBe('/categories/power-platform/');
  });

  it('slugifies categories with special characters', () => {
    expect(getCategoryUrl('3D printing')).toBe('/categories/3d-printing/');
  });

  it('slugifies .NET correctly', () => {
    expect(getCategoryUrl('.NET')).toBe('/categories/dotnet/');
  });
});


// ── Wiki tools ───────────────────────────────────────────────────────────────

const WIKI: WikiData = {
  posts: [
    { slug: 'docker1', title: 'Docker basics', date: '2021-02-01', part: null, builds_on: [], topics: ['containers'], tools: ['Docker'], status: 'current',
      summary: 'I ran my first container.', claims: [{ text: 'A container is a process.', quote: 'A container is just a process.' }], outcome: 'It ran.', caveats: '' },
    { slug: 'rag1', title: 'RAG basics', date: '2026-01-01', part: null, builds_on: [], topics: ['retrieval'], tools: ['Ollama'], status: 'current',
      summary: 'I built retrieval over my notes.', claims: [], outcome: 'It worked.', caveats: '' },
  ],
  topics: [
    { slug: 'docker', title: 'Docker', description: 'Containers', posts: ['docker1'], summary: 'Containers in practice.', idea: ['Containers are processes.'],
      claims: [{ text: 'A container is a process.', quote: 'A container is just a process.', slug: 'docker1' }], differences: [], conclusion: 'Use them.' },
    { slug: 'retrieval-augmented-generation', title: 'Retrieval-augmented generation', description: 'RAG', posts: ['rag1'], summary: 'Retrieval first.', idea: [],
      claims: [], differences: [], conclusion: '' },
  ],
};

describe('wiki tools', () => {
  it('listTopics returns every topic with a link, sorted by name', () => {
    const list = listTopics(WIKI);
    expect(list.map(t => t.topic)).toEqual(['Docker', 'Retrieval-augmented generation']);
    expect(list[0]).toMatchObject({ url: '/topics/docker/', posts: 1 });
  });

  it('searchWiki finds a topic page and the posts behind it', () => {
    const found = searchWiki('docker', WIKI);
    expect(found.topics[0].url).toBe('/topics/docker/');
    expect(found.posts[0].url).toBe('/posts/docker1/');
  });

  it('searchWiki returns nothing for an empty query', () => {
    expect(searchWiki('', WIKI)).toEqual({ topics: [], posts: [] });
  });

  it('getTopic accepts a slug, a title or a /topics/ address', () => {
    expect(getTopic('docker', WIKI)?.topic).toBe('Docker');
    expect(getTopic('Docker', WIKI)?.topic).toBe('Docker');
    expect(getTopic('/topics/docker/', WIKI)?.topic).toBe('Docker');
  });

  it('getTopic returns null for an unknown topic and links claims to their posts', () => {
    expect(getTopic('nothing-here', WIKI)).toBeNull();
    expect(getTopic('docker', WIKI)?.claims[0].url).toBe('/posts/docker1/');
  });
});
