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
                
                return (
                  <Link
                    key={category}
                    href={`/posts/category/${slug}`}
                    className="text-decoration-none"
                    style={{
                      padding: '12px 24px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        
        <style dangerouslySetInnerHTML={{__html: `
          a[href^="/posts/category/"]:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5) !important;
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