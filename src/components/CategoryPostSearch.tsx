'use client';

import { useState } from 'react';
import { BlogPost } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryPostSearchProps {
  posts: BlogPost[];
  categoryName: string;
}

export default function CategoryPostSearch({ posts, categoryName }: CategoryPostSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.description.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <>
      {/* Search Bar */}
      <div className="row mt-4 mb-4">
        <div className="col-12">
          <div className="search-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={`🔍 Search ${categoryName} posts...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: '50px',
                padding: '12px 24px',
                fontSize: '1rem',
                border: '2px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
              }}
            />
            {searchTerm && (
              <p className="text-center mt-2 text-muted">
                Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="row mt-4">
        {filteredPosts.length === 0 ? (
          <div className="col-12 text-center py-5">
            <h5 className="text-muted">No posts found matching &quot;{searchTerm}&quot;</h5>
            <p className="text-muted">Try a different search term</p>
          </div>
        ) : (
          filteredPosts.map((post: BlogPost) => (
            <div key={post.slug} className="item features-image col-12 col-md-6 col-lg-4">
              <div className="item-wrapper post-card">
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
          ))
        )}
      </div>
    </>
  );
}
