import { getVisibleBlogPosts } from '@/lib/posts';
import Link from 'next/link';
import PostsPageWithSearch from '@/components/PostsPageWithSearch';

export default async function PostsPage() {
  const posts = await getVisibleBlogPosts();
  const featuredPosts = posts.slice(0, 3);
  const remainingPosts = posts.slice(3);

  return (
    <>
      {/* Navy header banner */}
      <section style={{ backgroundColor: 'var(--navy)', padding: '5rem 0 3.5rem' }}>
        <div className="container text-center">
          <h1 className="mbr-section-title mbr-fonts-style display-2" style={{ color: '#ffffff', fontWeight: 700 }}>
            All Blog Posts
          </h1>
          <p className="mbr-text mbr-fonts-style display-7 mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {posts.length} posts
          </p>
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb justify-content-center" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item">
                <Link href="/" style={{ color: 'var(--gold)' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Posts
              </li>
            </ol>
          </nav>
        </div>
      </section>

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
          <PostsPageWithSearch
            allPosts={posts}
            featuredPosts={featuredPosts}
            remainingPosts={remainingPosts}
          />
        </div>
      </section>
    </>
  );
}
