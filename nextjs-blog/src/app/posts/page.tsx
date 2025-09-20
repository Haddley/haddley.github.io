import { getAllPosts, getCategories } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

export default function PostsPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <section data-bs-version="5.1" className="content2 cid-socNq9ZEoK" id="content2-q">
      <div className="container">
        <div className="mbr-section-head">
          <h4 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
            <strong>Blog Posts</strong>
          </h4>
          <h5 className="mbr-section-subtitle mbr-fonts-style align-center mb-0 mt-2 display-5">
            Read my recent blog posts
          </h5>
        </div>
        
        <div className="row mt-4">
          {posts.map((post) => (
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
                    <em>&nbsp;{new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</em>
                  </h6>
                  <p className="mbr-text mbr-fonts-style mt-3 display-7">
                    {post.description}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="badge badge-secondary me-1"
                          style={{ fontSize: '0.8rem' }}
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
        
        {/* Categories Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h5 className="mbr-section-subtitle mbr-fonts-style align-center mb-3 display-5">
              Categories
            </h5>
            <div className="text-center">
              {categories.map((category) => (
                <span
                  key={category}
                  className="badge badge-info me-2 mb-2"
                  style={{ fontSize: '0.9rem' }}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}