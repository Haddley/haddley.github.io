import { getVisibleBlogPosts } from '@/lib/posts';
import Link from 'next/link';
import PostsPageWithSearch from '@/components/PostsPageWithSearch';

export default async function PostsPage() {
  const posts = await getVisibleBlogPosts();
  
  // Get 6 most recent posts for featured section
  const featuredPosts = posts.slice(0, 6);
  const remainingPosts = posts.slice(6);

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
      `}} />
      <div className="container">
        <div className="mbr-section-head">
          <h4 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
            <strong>📝 All Blog Posts</strong>
          </h4>
          <h5 className="mbr-section-subtitle mbr-fonts-style align-center mb-0 mt-2 display-5">
            Explore all articles
          </h5>
          <p className="mbr-text mbr-fonts-style align-center mt-2 display-7">
            {posts.length} total posts
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
                <li className="breadcrumb-item active" aria-current="page">
                  Posts
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Client-side search and posts display */}
        <PostsPageWithSearch
          allPosts={posts}
          featuredPosts={featuredPosts}
          remainingPosts={remainingPosts}
        />
      </div>
    </section>
  );
}