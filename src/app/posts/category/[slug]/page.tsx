import { getVisibleBlogPostsByAnyCategory, BlogPost } from '@/lib/posts';
import { categories, getCategoryBySlug } from '@/lib/categories';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CategoryPostSearch from '@/components/CategoryPostSearch';

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

  const categoryPosts = await getVisibleBlogPostsByAnyCategory(category.name);
  
  // Get featured posts (3 most recent for this category)
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

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <>
            <div className="row mt-5 mb-5">
              <div className="col-12">
                <h6 className="mbr-fonts-style display-7 mb-4 text-center">
                  <strong>✨ Featured {category.name} Posts</strong>
                </h6>
                <div className="row g-4">
                  {featuredPosts.map((post: BlogPost, index: number) => (
                    <div key={post.slug} className={index === 0 ? "col-12" : "col-12 col-md-6"}>
                      <Link href={`/posts/${post.slug}`} className="text-decoration-none">
                        <div className="featured-card" style={{
                          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                          borderRadius: '16px',
                          padding: index === 0 ? '40px' : '32px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          minHeight: index === 0 ? '350px' : '450px'
                        }}>
                          <div className="featured-badge" style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            padding: '8px 20px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                          }}>
                            {index === 0 ? '🔥 Latest' : '⭐ Recent'}
                          </div>
                          <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
                            {post.image && (
                              <div style={{ 
                                borderRadius: '12px',
                                overflow: 'hidden',
                                flexShrink: 0,
                                width: '100%',
                                maxWidth: '300px'
                              }}>
                                <Image
                                  src={post.image}
                                  alt={post.title}
                                  width={300}
                                  height={200}
                                  className="img-fluid"
                                />
                              </div>
                            )}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                              <h5 style={{ 
                                fontSize: index === 0 ? '2rem' : '1.5rem',
                                fontWeight: '700',
                                color: '#1a1a1a',
                                marginBottom: '16px',
                                lineHeight: '1.3'
                              }}>
                                {post.title}
                              </h5>
                              <p style={{
                                color: '#666',
                                fontSize: index === 0 ? '1.1rem' : '1rem',
                                marginBottom: '16px',
                                lineHeight: '1.6',
                                flex: 1
                              }}>
                                {post.description.substring(0, index === 0 ? 200 : 150)}...
                              </p>
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                {/* Show current category first, then others */}
                                <span style={{
                                  background: 'rgba(102, 126, 234, 0.15)',
                                  color: '#667eea',
                                  padding: '6px 16px',
                                  borderRadius: '12px',
                                  fontSize: '0.8rem',
                                  fontWeight: '700',
                                  border: '2px solid #667eea'
                                }}>
                                  {category.name}
                                </span>
                                {post.categories?.filter(cat => cat !== category.name).slice(0, 1).map(cat => (
                                  <span key={cat} style={{
                                    background: 'rgba(102, 126, 234, 0.15)',
                                    color: '#667eea',
                                    padding: '6px 16px',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                  }}>
                                    {cat}
                                  </span>
                                ))}
                              </div>
                              <p style={{
                                color: '#999',
                                fontSize: '0.9rem',
                                margin: 0
                              }}>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Search and All Posts Section */}
        {remainingPosts.length > 0 && (
          <>
            <div className="row mt-5">
              <div className="col-12">
                <h3 className="mbr-section-title mbr-fonts-style align-center mb-4 display-5">
                  <strong>All {category.name} Posts</strong>
                </h3>
              </div>
            </div>
            <CategoryPostSearch posts={remainingPosts} categoryName={category.name} />
          </>
        )}

        {/* Posts Grid - Only show if no remaining posts */}
        {featuredPosts.length > 0 && remainingPosts.length === 0 && (
          <div className="row mt-4">
            <div className="col-12 text-center">
              <p className="mbr-text mbr-fonts-style display-7 text-muted">
                Showing all posts in this category
              </p>
            </div>
          </div>
        )}

        {/* Posts Grid - Original fallback for when there are no posts */}
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