'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

interface PostSearchProps {
  posts: BlogPost[];
}

export default function PostSearch({ posts }: PostSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm) return;
    const timer = setTimeout(() => {
      window.gtag?.('event', 'search', { search_term: searchTerm });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredPosts = posts.filter(post => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.description.toLowerCase().includes(searchLower) ||
      post.categories?.some(cat => cat.toLowerCase().includes(searchLower)) ||
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
              placeholder="🔍 Search posts by title, description, category, or tag..."
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
                <div className="item-img" style={{ display: 'flex', justifyContent: 'center' }}>
                  <Link href={`/posts/${post.slug}`} style={{ width: '100%', maxWidth: '300px' }}>
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
                    <em> • {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</em>
                  </h6>
                  <p className="mbr-text mbr-fonts-style mt-3 display-7">
                    {post.description}
                  </p>
                  
                  {/* Categories + Tags */}
                  <div className="mt-2 mb-2" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {post.categories && post.categories.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {[...new Set(post.categories)].slice(0, 3).map((category) => (
                          <span key={category} style={{
                            background: 'rgba(15, 30, 61, 0.1)',
                            color: '#0f1e3d',
                            padding: '3px 10px',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                          }}>
                            {category}
                          </span>
                        ))}
                        {[...new Set(post.categories)].length > 3 && (
                          <span style={{ color: '#999', fontSize: '0.72rem', alignSelf: 'center' }}>
                            +{[...new Set(post.categories)].length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    {post.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} style={{
                            background: 'rgba(15, 30, 61, 0.05)',
                            color: '#666',
                            padding: '3px 10px',
                            borderRadius: '8px',
                            fontSize: '0.72rem',
                          }}>
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span style={{ color: '#999', fontSize: '0.72rem', alignSelf: 'center' }}>
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
