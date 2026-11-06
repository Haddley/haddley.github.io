import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostById } from '@/lib/posts';
import MobiriseContentRenderer from '@/components/MobiriseContentRenderer';

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

const TOPICS_DIR = path.join(process.cwd(), 'wiki', 'concepts');

function readTopic(slug: string) {
  const file = path.join(TOPICS_DIR, `${slug}.md`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return { data, content };
}

export async function generateStaticParams() {
  if (!fs.existsSync(TOPICS_DIR)) return [];
  return fs.readdirSync(TOPICS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => ({ slug: f.replace(/\.md$/, '') }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = readTopic(slug);
  if (!topic) return {};
  return {
    title: `${topic.data.title} | Neil Haddley`,
    description: topic.data.description,
    alternates: { canonical: `https://haddley.github.io/topics/${slug}/` },
    robots: { index: false },   // prototype: stays out of search until the format is approved
  };
}

// Turn the wiki's claim lines into something a reader can follow:
//   - Claim text.                      **Claim text.**
//     > "quote" — slug          ->     > “quote” — [Post title](/posts/slug/)
async function toReaderMarkdown(content: string): Promise<string> {
  const titles = new Map<string, string>();
  for (const m of content.matchAll(/— ([a-z0-9-]+)\s*$/gm)) {
    if (!titles.has(m[1])) titles.set(m[1], (await getPostById(m[1]))?.title ?? m[1]);
  }
  const lines = content.split('\n');
  const out: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const quote = (l: string) => l.match(/^\s*> "(.+)" — ([a-z0-9-]+)\s*$/);
    const nextQuote = lines[i + 1] ? quote(lines[i + 1]) : null;
    if (lines[i].startsWith('- ') && nextQuote) {
      out.push(`**${lines[i].slice(2)}**`, '');
      continue;
    }
    const q = quote(lines[i]);
    out.push(q ? `> “${q[1]}” — [${titles.get(q[2])}](/posts/${q[2]}/)` : lines[i].replace(/^## Claims$/, '## What the posts say'));
    if (q) out.push('');
  }
  return out.join('\n');
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = readTopic(slug);
  if (!topic) notFound();

  const markdown = await toReaderMarkdown(topic.content);
  const posts = await Promise.all((topic.data.posts as string[]).map(s => getPostById(s)));

  return (
    <>
      <section className="content4 cid-uBU3VQlp0E" id="content4-topic">
        <div className="container">
          <div className="row justify-content-center">
            <div className="title col-md-12 col-lg-11">
              <h3 className="mbr-section-title mbr-fonts-style align-center mb-4 display-2">
                <strong>{topic.data.title}</strong>
              </h3>
              <h4 className="mbr-section-subtitle align-center mbr-fonts-style mb-4 display-5">
                {topic.data.description}
              </h4>
              <p className="align-center mbr-fonts-style display-7" style={{ color: '#666' }}>
                A topic page: a summary of what my posts say, with each claim quoted from the post it came from.
                The posts are the authority. Last checked {String(topic.data.checked).slice(0, 10)}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content1 cid-content" id="content1-topic-back">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-11">
              <div className="mb-4">
                <Link href="/posts" className="link text-primary display-7">← Back to Posts</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MobiriseContentRenderer markdownContent={markdown} />

      <section className="content1 cid-content" id="content1-topic-posts">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-11">
              <h4 className="mbr-fonts-style display-5 mb-3"><strong>The posts behind this page</strong></h4>
              <ul>
                {posts.filter(Boolean).map(p => (
                  <li key={p!.slug}><Link href={`/posts/${p!.slug}/`}>{p!.title}</Link> — {p!.description}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
