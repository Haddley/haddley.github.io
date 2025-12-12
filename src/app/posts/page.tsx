import { getVisibleBlogPosts, getVisibleAutomatedCategories, BlogPost } from '@/lib/posts';
import { getCategoryByName } from '@/lib/categories';
import Link from 'next/link';
import PostSearch from '@/components/PostSearch';

function categoryToSlug(categoryName: string): string {
  return categoryName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[&]/g, '')
    .replace(/[^a-z0-9-]/g, '');
}

export default async function PostsPage() {
  const posts = await getVisibleBlogPosts();
  const categories = await getVisibleAutomatedCategories();
  
  // Get 3 most recent posts for featured section
  const featuredPosts = posts.slice(0, 3);

  return (
    <section data-bs-version="5.1" className="content2 cid-socNq9ZEoK" id="content2-q">
      <div className="container">
        <div className="mbr-section-head">
          <h4 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
            <strong>Blog Posts</strong>
          </h4>
          <h5 className="mbr-section-subtitle mbr-fonts-style align-center mb-0 mt-2 display-5">
            Explore {posts.length} posts across {categories.length} different categories
          </h5>
        </div>
        
        {/* Category Filter Pills */}
        <div className="row mt-5 mb-4">
          <div className="col-12 text-center">
            <h6 className="mbr-fonts-style display-7 mb-4">
              <strong>Browse by Category:</strong>
            </h6>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {categories.map((category) => {
                const categoryData = getCategoryByName(category);
                const slug = categoryData ? categoryData.slug : categoryToSlug(category);
                const postCount = posts.filter(p => p.categories?.includes(category)).length;
                
                // Category-specific gradients
                const categoryGradients: Record<string, string> = {
                  '.NET': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  'Python': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  'Java': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  'SQL': 'linear-gradient(135deg, #4facfe 0%, #00a8cc 100%)',
                  'JavaScript': 'linear-gradient(135deg, #fad961 0%, #f76b1c 100%)',
                  'React': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                  'Angular': 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
                  'TypeScript': 'linear-gradient(135deg, #3b8ad9 0%, #2c5aa0 100%)',
                  'PHP': 'linear-gradient(135deg, #8e44ad 0%, #3498db 100%)',
                  'Azure': 'linear-gradient(135deg, #0078d4 0%, #00a4ef 100%)',
                  'AWS': 'linear-gradient(135deg, #ff9900 0%, #ff6600 100%)',
                  'AI': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  'Power Platform': 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
                  'Microsoft Dynamics': 'linear-gradient(135deg, #5f2c82 0%, #49a09d 100%)',
                  'Business Central': 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)',
                  'Microsoft 365': 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
                  'DevOps': 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
                  'IOT': 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)',
                  'Mobile': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                };
                
                const gradient = categoryGradients[category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                
                return (
                  <Link
                    key={category}
                    href={`/posts/category/${slug}`}
                    className="text-decoration-none category-btn"
                    style={{
                      padding: '12px 24px',
                      borderRadius: '12px',
                      background: gradient,
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                    }}
                  >
                    {category}
                    <span style={{ 
                      marginLeft: '8px', 
                      opacity: '0.85',
                      fontSize: '0.85rem',
                      fontWeight: '400'
                    }}>
                      ({postCount})
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Featured Posts Section */}
        <div className="row mt-5 mb-5">
          <div className="col-12">
            <h6 className="mbr-fonts-style display-7 mb-4 text-center">
              <strong>✨ Featured Posts</strong>
            </h6>
            <div className="row g-4">
              {featuredPosts.map((post, index) => (
                <div key={post.slug} className={index === 0 ? "col-12" : "col-12 col-md-6"}>
                  <Link href={`/posts/${post.slug}`} className="text-decoration-none">
                    <div className="featured-card" style={{
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                      borderRadius: '16px',
                      padding: index === 0 ? '32px' : '24px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div className="featured-badge" style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {index === 0 ? '🔥 Latest' : '⭐ Recent'}
                      </div>
                      <div style={{ display: 'flex', gap: index === 0 ? '32px' : '16px', flexDirection: index === 0 ? 'row' : 'column' }}>
                        {post.image && (
                          <div style={{ 
                            flex: index === 0 ? '0 0 300px' : '1',
                            height: index === 0 ? '200px' : '150px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            background: `url(${post.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <h5 style={{ 
                            fontSize: index === 0 ? '1.75rem' : '1.25rem',
                            fontWeight: '700',
                            color: '#1a1a1a',
                            marginBottom: '12px'
                          }}>
                            {post.title}
                          </h5>
                          <p style={{
                            color: '#666',
                            fontSize: index === 0 ? '1rem' : '0.9rem',
                            marginBottom: '12px',
                            lineHeight: '1.6'
                          }}>
                            {post.description.substring(0, index === 0 ? 200 : 120)}...
                          </p>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                            {post.categories?.slice(0, 2).map(cat => (
                              <span key={cat} style={{
                                background: 'rgba(102, 126, 234, 0.1)',
                                color: '#667eea',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}>
                                {cat}
                              </span>
                            ))}
                          </div>
                          <p style={{
                            color: '#999',
                            fontSize: '0.85rem',
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
        
        <style dangerouslySetInnerHTML={{__html: `
          .featured-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.15) !important;
          }
        `}} />
        
        <style dangerouslySetInnerHTML={{__html: `
          .category-btn:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25) !important;
          }
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
        `}} />

        {/* Search and Posts Grid */}
        <PostSearch posts={posts} />
        
        {/* Statistics */}
        <div className="row mt-5">
          <div className="col-md-12 text-center">
            <p className="mbr-text mbr-fonts-style display-7">
              Total posts: {posts.length} | Categories: {categories.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}