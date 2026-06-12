import {
  getVisibleAutomatedCategories,
  getVisibleBlogPostsByAutomatedCategory,
  getVisibleBlogPosts,
  BlogPost
} from '@/lib/posts';
import { getCategoryByName } from '@/lib/categories';
import Link from 'next/link';
import NavyImageBanner from '@/components/NavyImageBanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories | Neil Haddley',
  description: 'Browse blog posts by technology category — Azure, AI, Business Central, Power Platform, and more.',
  openGraph: {
    title: 'Categories | Neil Haddley',
    description: 'Browse blog posts by technology category — Azure, AI, Business Central, Power Platform, and more.',
    url: 'https://haddley.github.io/categories/',
  },
};

export default async function CategoriesPage() {
  const automatedCategories = await getVisibleAutomatedCategories();
  const allPosts = await getVisibleBlogPosts();

  const totalPosts = allPosts.length;
  const categorizedPosts = allPosts.filter(post => post.categories && post.categories.length > 0).length;

  const categoryPostsMap: Record<string, BlogPost[]> = {};
  for (const category of automatedCategories) {
    categoryPostsMap[category] = await getVisibleBlogPostsByAutomatedCategory(category);
  }

  return (
    <>
      <NavyImageBanner images={
        automatedCategories
          .map(cat => categoryPostsMap[cat]?.find(p => p.image)?.image)
          .filter((img): img is string => !!img)
          .slice(0, 6)
      }>
        <div className="container text-center">
          <h1 className="mbr-section-title mbr-fonts-style display-2" style={{ color: '#ffffff', fontWeight: 700 }}>
            Blog Categories
          </h1>
          <p className="mbr-text mbr-fonts-style display-7 mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {totalPosts} posts across {automatedCategories.length} categories
          </p>
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb justify-content-center" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item">
                <Link href="/" style={{ color: 'var(--gold)' }}>Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/posts" style={{ color: 'var(--gold)' }}>Posts</Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Categories
              </li>
            </ol>
          </nav>
        </div>
      </NavyImageBanner>

      {/* Stats + Cards */}
      <section style={{ backgroundColor: 'var(--section-light)', padding: '3rem 0 4rem' }}>
        <div className="container">

          {/* Stats row */}
          <div className="row g-4 mb-5">
            {[
              { label: 'Total Posts', value: totalPosts },
              { label: 'Categorized', value: categorizedPosts },
              { label: 'Categories', value: automatedCategories.length },
            ].map(({ label, value }) => (
              <div key={label} className="col-12 col-md-4">
                <div className="card text-center h-100" style={{ border: 'none', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div className="card-body py-4">
                    <p className="mbr-text mbr-fonts-style display-7 mb-1" style={{ color: '#6b7280' }}>{label}</p>
                    <p className="mbr-section-title mbr-fonts-style display-2" style={{ color: 'var(--navy)', fontWeight: 700, margin: 0 }}>{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Category cards */}
          <div className="row g-4">
            {automatedCategories.map(category => {
              const categoryPosts = categoryPostsMap[category];
              const postCount = categoryPosts.length;
              const def = getCategoryByName(category);
              const slug = def?.slug ?? category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');

              return (
                <div key={category} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 category-card" style={{ border: 'none', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                    {/* Card cover image — navy stained */}
                    {categoryPosts[0]?.image && (
                      <div style={{ height: 110, overflow: 'hidden', position: 'relative', backgroundColor: 'var(--navy)' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={categoryPosts[0].image}
                          alt=""
                          aria-hidden="true"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25) sepia(1) hue-rotate(200deg) saturate(2)' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,30,61,0.45)' }} />
                      </div>
                    )}
                    {/* Card header — navy */}
                    <div style={{ backgroundColor: 'var(--navy)', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3 className="mbr-section-title mbr-fonts-style display-5" style={{ color: '#ffffff', margin: 0, fontWeight: 700 }}>
                        {def?.icon && <span style={{ marginRight: 8 }}>{def.icon}</span>}
                        {category}
                      </h3>
                      <span style={{ backgroundColor: 'var(--gold)', color: 'var(--navy)', borderRadius: 20, padding: '2px 10px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {postCount} post{postCount !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Card body — recent posts */}
                    <div className="card-body" style={{ padding: '1.25rem' }}>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {categoryPosts.slice(0, 3).map(post => (
                          <li key={post.slug} style={{ padding: '0.4rem 0', borderBottom: '1px solid #e5e7eb' }}>
                            <Link
                              href={`/posts/${post.slug}`}
                              className="mbr-text mbr-fonts-style"
                              style={{ color: 'var(--navy)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}
                            >
                              {post.title}
                            </Link>
                          </li>
                        ))}
                        {postCount > 3 && (
                          <li style={{ padding: '0.4rem 0', color: '#9ca3af', fontSize: '0.8rem' }}>
                            +{postCount - 3} more posts
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Card footer */}
                    <div className="card-footer" style={{ background: 'transparent', borderTop: '1px solid #e5e7eb', padding: '0.75rem 1.25rem' }}>
                      <Link
                        href={`/posts/category/${slug}`}
                        style={{ color: 'var(--navy)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}
                      >
                        View all posts →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back link */}
          <div className="text-center mt-5">
            <Link
              href="/posts"
              style={{ backgroundColor: 'var(--navy)', color: '#ffffff', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}
            >
              ← All Posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
