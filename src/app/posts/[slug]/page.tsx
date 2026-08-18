import { getPostById, getAllPosts, getSeriesNavigation } from '@/lib/posts';
import { getMarkdownPost } from '@/lib/markdown';
import { categoryNameToSlug } from '@/lib/categories';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import MobiriseContentRenderer from '@/components/MobiriseContentRenderer';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostById(slug);
  if (!post) return {};
  const url = `https://haddley.github.io/posts/${slug}/`;
  return {
    title: `${post.title} | Neil Haddley`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: ['Neil Haddley'],
      ...(post.image ? { images: [{ url: `https://haddley.github.io${post.image}` }] } : {}),
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostById(slug);

  if (!post) {
    notFound();
  }

  // Try to get markdown content
  const markdownPost = await getMarkdownPost(slug);
  const { name: seriesName, previous, next } = await getSeriesNavigation(post);

  return (
    <>
      {/* Header Section with Title */}
      <section className="content4 cid-uBU3VQlp0E" id="content4-cru">
        <div className="container">
          <div className="row justify-content-center">
            <div className="title col-md-12 col-lg-10">
              <h3 className="mbr-section-title mbr-fonts-style align-center mb-4 display-2">
                <strong>{post.title}</strong>
              </h3>

              <h4 className="mbr-section-subtitle align-center mbr-fonts-style mb-4 display-5">
                <><strong>Neil Haddley</strong>
                  <em> • {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</em>
                </>
              </h4>

              <h4 className="mbr-section-subtitle align-center mbr-fonts-style mb-4 display-5">
                {post.description}
              </h4>

              {/* Categories and Tags */}
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
                {post.categories && post.categories.length > 0 && (
                  <>
                    {[...new Set(post.categories)].map((category) => (
                      <Link
                        key={category}
                        href={`/categories/${categoryNameToSlug(category)}`}
                        style={{
                          background: 'rgba(15, 30, 61, 0.1)',
                          color: '#0f1e3d',
                          padding: '4px 14px',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          textDecoration: 'none',
                        }}
                      >
                        {category}
                      </Link>
                    ))}
                  </>
                )}
                {post.tags && (Array.isArray(post.tags) ? post.tags : [post.tags]).filter(Boolean).length > 0 && (
                  <>
                    {(Array.isArray(post.tags) ? post.tags : [post.tags]).filter(Boolean).map((tag) => (
                      <span key={tag} style={{
                        background: 'rgba(15, 30, 61, 0.05)',
                        color: '#666',
                        padding: '4px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <section className="content1 cid-content" id="content1-breadcrumb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="mb-4">
                <Link href="/posts" className="link text-primary display-7">
                  ← Back to Posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Render markdown content in Mobirise sections */}
      {markdownPost?.content ? (
        <MobiriseContentRenderer markdownContent={markdownPost.content} />
      ) : (
        <section className="content5 cid-content5" data-bs-version="5.1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-10">
                <div className="alert alert-warning">
                  <strong>Note:</strong> Content is being processed. The original HTML content
                  from <code>{slug}.html</code> will be displayed here.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Series Navigation */}
      {seriesName && (previous || next) && (
        <section className="content1 cid-content" id="content1-series-nav">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-10">
                <div className="mb-4">
                  <p className="text-center display-7" style={{ color: '#666', marginBottom: '1.25rem' }}>
                    Part of the <strong>{seriesName}</strong> series
                  </p>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      {previous ? (
                        <Link href={`/posts/${previous.slug}/`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
                          <div style={{
                            background: '#fff',
                            border: '1px solid rgba(15, 30, 61, 0.1)',
                            borderRadius: '12px',
                            padding: '20px',
                            height: '100%',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                          }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f1e3d', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '8px' }}>
                              ← Previous in series
                            </div>
                            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>
                              {previous.title}
                            </div>
                            <div style={{
                              fontSize: '0.85rem',
                              color: '#666',
                              lineHeight: 1.4,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical' as const,
                              overflow: 'hidden',
                            }}>
                              {previous.description}
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div style={{
                          border: '1px dashed rgba(15, 30, 61, 0.2)',
                          borderRadius: '12px',
                          padding: '20px',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          color: '#999',
                          fontSize: '0.9rem',
                        }}>
                          📍 You&apos;re at the start of the series
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-md-6">
                      {next ? (
                        <Link href={`/posts/${next.slug}/`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
                          <div style={{
                            background: '#fff',
                            border: '1px solid rgba(15, 30, 61, 0.1)',
                            borderRadius: '12px',
                            padding: '20px',
                            height: '100%',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                          }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f1e3d', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '8px' }}>
                              Next in series →
                            </div>
                            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>
                              {next.title}
                            </div>
                            <div style={{
                              fontSize: '0.85rem',
                              color: '#666',
                              lineHeight: 1.4,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical' as const,
                              overflow: 'hidden',
                            }}>
                              {next.description}
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div style={{
                          border: '1px dashed rgba(15, 30, 61, 0.2)',
                          borderRadius: '12px',
                          padding: '20px',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          color: '#999',
                          fontSize: '0.9rem',
                        }}>
                          ✍️ This is the latest part — more may follow
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}