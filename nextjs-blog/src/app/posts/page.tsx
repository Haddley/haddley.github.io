import { getAllPosts, getCategories, BlogPost } from '@/lib/posts';
import { getCategoryByName } from '@/lib/categories';
import Link from 'next/link';
import Image from 'next/image';

function categoryToSlug(categoryName: string): string {
  return categoryName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[&]/g, '')
    .replace(/[^a-z0-9-]/g, '');
}

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
            Explore {posts.length} posts across {categories.length} different categories
          </h5>
        </div>
        
        {/* Category Filter Pills */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <h6 className="mbr-fonts-style display-7 mb-3">
              <strong>Browse by Category:</strong>
            </h6>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categories.map((category) => {
                const categoryData = getCategoryByName(category);
                const slug = categoryData ? categoryData.slug : categoryToSlug(category);
                return (
                  <Link
                    key={category}
                    href={`/posts/category/${slug}`}
                    className="btn btn-sm btn-outline-primary mbr-fonts-style display-7"
                  >
                    {categoryData?.icon || '📄'} {category}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="row mt-4">
          {posts.map((post: BlogPost) => (
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
                  
                  {/* Category Badge */}
                  <div className="mt-2 mb-2">
                    <span className="badge bg-primary me-2">
                      {post.category}
                    </span>
                    {post.tags.length > 0 && post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="badge bg-secondary me-1"
                        style={{ fontSize: '0.75rem' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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