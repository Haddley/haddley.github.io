import { getVisibleBlogPostsByAnyCategory } from '@/lib/posts';
import { categories, getCategoryBySlug } from '@/lib/categories';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CategoryPageWithSearch from '@/components/CategoryPageWithSearch';
import NavyImageBanner from '@/components/NavyImageBanner';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allSlugs: string[] = [];
  categories.forEach((category) => {
    allSlugs.push(category.slug);
    if (category.aliases) {
      allSlugs.push(...category.aliases);
    }
  });
  return allSlugs.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryPosts = await getVisibleBlogPostsByAnyCategory(category.name);
  const featuredPosts = categoryPosts.slice(0, 3);
  const remainingPosts = categoryPosts.slice(3);

  return (
    <>
      <NavyImageBanner images={categoryPosts.slice(0, 6).map(p => p.image).filter((img): img is string => !!img)}>
        <div className="container text-center">
          <h1 className="mbr-section-title mbr-fonts-style display-2" style={{ color: '#ffffff', fontWeight: 700 }}>
            {category.icon} {category.name}
          </h1>
          <p className="mbr-text mbr-fonts-style display-7 mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {category.description}
          </p>
          <p className="mbr-text mbr-fonts-style mt-2" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
            {categoryPosts.length} {categoryPosts.length === 1 ? 'post' : 'posts'} in this category
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
                {category.name}
              </li>
            </ol>
          </nav>
        </div>
      </NavyImageBanner>

      {/* Posts content */}
      <section
        data-bs-version="5.1"
        className="content2 cid-socNq9ZEoK"
        id="content2-q"
        style={{ backgroundColor: 'var(--section-light)' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .post-card {
            transition: all 0.3s ease;
            border-radius: 12px;
            overflow: hidden;
          }
          .post-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
          }
          .post-card .item-img img {
            transition: transform 0.3s ease;
          }
          .post-card:hover .item-img img {
            transform: scale(1.05);
          }
          .featured-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          }
        `}} />
        <div className="container">
          {categoryPosts.length > 0 ? (
            <CategoryPageWithSearch
              categoryPosts={categoryPosts}
              categoryName={category.name}
              featuredPosts={featuredPosts}
              remainingPosts={remainingPosts}
            />
          ) : (
            <div className="row mt-4">
              <div className="col-12 text-center">
                <p className="mbr-text mbr-fonts-style display-7">
                  No posts found in this category yet.
                </p>
              </div>
            </div>
          )}

          <div className="row mt-5">
            <div className="col-12 text-center">
              <Link
                href="/posts"
                style={{ backgroundColor: 'var(--navy)', color: '#ffffff', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}
              >
                ← Browse All Categories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
