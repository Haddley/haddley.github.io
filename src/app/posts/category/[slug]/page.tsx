import { getVisibleBlogPostsByAnyCategory } from '@/lib/posts';
import { categories, getCategoryBySlug } from '@/lib/categories';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CategoryPageWithSearch from '@/components/CategoryPageWithSearch';

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
  
  return allSlugs.map((slug) => ({
    slug: slug,
  }));
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
    <section data-bs-version="5.1" className="content2 cid-socNq9ZEoK" id="content2-q">
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
        <div className="mbr-section-head">
          <h4 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
            <strong>{category.icon} {category.name}</strong>
          </h4>
          <h5 className="mbr-section-subtitle mbr-fonts-style align-center mb-0 mt-2 display-5">
            {category.description}
          </h5>
          <p className="mbr-text mbr-fonts-style align-center mt-2 display-7">
            {categoryPosts.length} {categoryPosts.length === 1 ? 'post' : 'posts'} in this category
          </p>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link href="/" className="text-primary">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/posts" className="text-primary">Posts</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {category.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Client-side search and posts display */}
        <CategoryPageWithSearch
          categoryPosts={categoryPosts}
          categoryName={category.name}
          categoryIcon={category.icon}
          featuredPosts={featuredPosts}
          remainingPosts={remainingPosts}
        />

        {/* No posts fallback */}
        {categoryPosts.length === 0 && (
          <div className="row mt-4">
            <div className="col-12 text-center">
              <p className="mbr-text mbr-fonts-style display-7">
                No posts found in this category yet.
              </p>
              <Link href="/posts" className="btn btn-primary display-7">
                Browse All Posts
              </Link>
            </div>
          </div>
        )}

        {/* Back to All Posts */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <Link href="/posts" className="btn btn-secondary display-7">
              ← Browse All Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}