import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import NavyImageBanner from '@/components/NavyImageBanner';
import { getPostById } from '@/lib/posts';
import type { Metadata } from 'next';

const TOPICS_DIR = path.join(process.cwd(), 'wiki', 'concepts');

export const metadata: Metadata = {
  title: 'Topics | Neil Haddley',
  description: 'Ideas that run across several posts, each with what the posts say and where they changed their minds.',
  alternates: { canonical: 'https://haddley.github.io/topics/' },
};

interface Topic {
  slug: string;
  title: string;
  description: string;
  postCount: number;
  posts: { slug: string; title: string }[];
}

async function getTopics(): Promise<Topic[]> {
  if (!fs.existsSync(TOPICS_DIR)) return [];
  const topics: Topic[] = [];
  for (const file of fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.md'))) {
    const { data } = matter(fs.readFileSync(path.join(TOPICS_DIR, file), 'utf8'));
    const posts = (await Promise.all(((data.posts as string[]) ?? []).map(s => getPostById(s))))
      .filter((p): p is NonNullable<typeof p> => !!p)
      .map(p => ({ slug: p.slug, title: p.title }));
    topics.push({ slug: data.slug, title: data.title, description: data.description ?? '', postCount: posts.length, posts });
  }
  return topics.sort((a, b) => a.title.localeCompare(b.title));
}

export default async function TopicsPage() {
  const topics = await getTopics();

  return (
    <>
      <NavyImageBanner images={[]}>
        <div className="container text-center">
          <h1 className="mbr-section-title mbr-fonts-style display-2" style={{ color: '#ffffff', fontWeight: 700 }}>
            Topics
          </h1>
          <p className="mbr-text mbr-fonts-style display-7 mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Ideas that run across several posts: what the posts say, and where they changed their minds
          </p>
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb justify-content-center" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item">
                <Link href="/" style={{ color: 'var(--gold)' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Topics
              </li>
            </ol>
          </nav>
        </div>
      </NavyImageBanner>

      <section style={{ backgroundColor: 'var(--section-light)', padding: '3rem 0 4rem' }}>
        <div className="container">
          <p className="mbr-text mbr-fonts-style display-7 mb-4" style={{ color: '#6b7280' }}>
            A category is a shelf of posts. A topic is a short summary of one idea, with every claim quoted from the post it came from.
            The posts are the authority.
          </p>
          {topics.length === 0 ? (
            <p className="mbr-text mbr-fonts-style display-7">No topics yet.</p>
          ) : (
            <div className="row g-4">
              {topics.map(topic => (
                <div key={topic.slug} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100" style={{ border: 'none', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                    <div style={{ backgroundColor: 'var(--navy)', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3 className="mbr-section-title mbr-fonts-style display-5" style={{ color: '#ffffff', margin: 0, fontWeight: 700 }}>
                        {topic.title}
                      </h3>
                      <span style={{ backgroundColor: 'var(--gold)', color: 'var(--navy)', borderRadius: 20, padding: '2px 10px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {topic.postCount} post{topic.postCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="card-body" style={{ padding: '1.25rem' }}>
                      <p className="mbr-text mbr-fonts-style display-7" style={{ color: '#444' }}>{topic.description}</p>
                      <ul style={{ paddingLeft: '1.1rem', fontSize: '0.9rem' }}>
                        {topic.posts.map(p => (
                          <li key={p.slug}><Link href={`/posts/${p.slug}/`}>{p.title}</Link></li>
                        ))}
                      </ul>
                      <Link href={`/topics/${topic.slug}/`} className="link text-primary display-7">
                        Read the topic →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
