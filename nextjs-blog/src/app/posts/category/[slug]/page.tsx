import { getAllPosts, BlogPost } from '@/lib/posts';
import { categories, getCategoryBySlug } from '@/lib/categories';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allSlugs: string[] = [];
  
  categories.forEach((category) => {
    // Add the main slug
    allSlugs.push(category.slug);
    
    // Add all aliases if they exist
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

  const posts = getAllPosts();
  const categoryPosts = posts.filter((post: BlogPost) => post.category === category.name);

  return (
    <section data-bs-version="5.1" className="content2 cid-socNq9ZEoK" id="content2-q">
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

        {/* Posts Grid */}
        {categoryPosts.length === 0 ? (
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
        ) : (
          <div className="row mt-4">
            {categoryPosts.map((post: BlogPost) => (
              <div key={post.slug} className="item features-image col-12 col-md-6 col-lg-4">
                <div className="item-wrapper">
                  <div className="item-img">
                    <Link href={`/posts/${post.slug}`}>
                      <Image
                        src={post.image || '/assets/images/posts-meta.svg'}
                        alt={post.title}
                        width={300}
                        height={200}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="item-content">
                    <h5 className="item-title mbr-fonts-style display-5">
                      <Link href={`/posts/${post.slug}`} className="text-primary">
                        {post.title}
                      </Link>
                    </h5>
                    <h6 className="item-subtitle mbr-fonts-style mt-1 display-7">
                      <strong>Neil Haddley</strong>
                      <em> • {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</em>
                    </h6>
                    <p className="mbr-text mbr-fonts-style mt-3 display-7">
                      {post.description}
                    </p>
                    
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="mt-2 mb-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="badge bg-secondary me-1"
                            style={{ fontSize: '0.75rem' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mbr-section-btn item-footer mt-2">
                    <Link href={`/posts/${post.slug}`} className="btn btn-primary item-btn display-7">
                      Read More &gt;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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