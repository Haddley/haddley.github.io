'use client';

import { useState } from 'react';
import { BlogPost } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

interface PostsPageWithSearchProps {
  allPosts: BlogPost[];
  featuredPosts: BlogPost[];
  remainingPosts: BlogPost[];
}

// Define categories with their slugs
const categories = [
  { name: 'AI', slug: 'ai', icon: '🤖' },
  { name: '.NET', slug: 'net', icon: '💻' },
  { name: 'Java', slug: 'java', icon: '☕' },
  { name: 'Azure', slug: 'azure', icon: '☁️' },
  { name: 'Microsoft 365', slug: 'microsoft-365', icon: '📊' },
  { name: 'Microsoft Dynamics', slug: 'microsoft-dynamics', icon: '🏢' },
  { name: 'Power Platform', slug: 'power-platform', icon: '⚡' },
  { name: 'DevOps', slug: 'devops', icon: '🔧' },
  { name: 'Cloud', slug: 'cloud', icon: '☁️' },
  { name: 'IOT', slug: 'iot', icon: '🌐' },
  { name: 'Mobile', slug: 'mobile', icon: '📱' },
];

export default function PostsPageWithSearch({ 
  allPosts,
  featuredPosts, 
  remainingPosts 
}: PostsPageWithSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = allPosts.filter(post => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.description.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      post.categories?.some(cat => cat.toLowerCase().includes(searchLower))
    );
  });

  const showingSearchResults = searchTerm.length > 0;
  const postsToShow = showingSearchResults ? filteredPosts : remainingPosts;

  return (
    <>
      {/* Category Navigation Badges */}
      <div className="row mt-4 mb-3">
        <div className="col-12">
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '12px', 
            justifyContent: 'center',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/posts/category/${category.slug}`}
                className="badge"
                style={{
                  fontSize: '1rem',
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                }}
              >
                {category.icon} {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mt-4 mb-4">
        <div className="col-12">
          <div className="search-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="🔍 Search posts by title, description, tags, or category..."
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

      {/* Featured Posts Section - 3 items with first full width */}
      {!showingSearchResults && featuredPosts.length > 0 && (
        <>
          <div className="row mt-5 mb-5">
            <div className="col-12">
              <h6 className="mbr-fonts-style display-7 mb-4 text-center">
                <strong>✨ Featured Posts</strong>
              </h6>
              <div className="row g-4">
                {featuredPosts.slice(0, 3).map((post: BlogPost, index: number) => (
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
                              {post.categories?.slice(0, 2).map(cat => (
                                <span key={cat} style={{
                                  background: 'rgba(102, 126, 234, 0.15)',
                                  color: '#667eea',
                                  padding: '6px 16px',
                                  borderRadius: '12px',
                                  fontSize: '0.8rem',
                                  fontWeight: index === 0 ? '700' : '600',
                                  border: index === 0 ? '2px solid #667eea' : 'none'
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

      {/* All Posts Section */}
      {postsToShow.length > 0 && (
        <>
          <div className="row mt-5">
            <div className="col-12">
              <h3 className="mbr-section-title mbr-fonts-style align-center mb-4 display-5">
                <strong>{showingSearchResults ? 'Search Results' : 'All Posts'}</strong>
              </h3>
            </div>
          </div>
          <div className="row mt-4">
            {postsToShow.map((post: BlogPost) => (
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
                      <em> • {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</em>
                    </h6>
                    <p className="mbr-text mbr-fonts-style mt-3 display-7">
                      {post.description}
                    </p>
                    
                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                      <div className="mt-2 mb-2">
                        {post.categories.slice(0, 3).map((cat) => (
                          <span
                            key={cat}
                            className="badge bg-info me-1"
                            style={{ fontSize: '0.75rem' }}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                    
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
        </>
      )}

      {/* No results message */}
      {showingSearchResults && filteredPosts.length === 0 && (
        <div className="row mt-4">
          <div className="col-12 text-center py-5">
            <h5 className="text-muted">No posts found matching &quot;{searchTerm}&quot;</h5>
            <p className="text-muted">Try a different search term</p>
          </div>
        </div>
      )}
    </>
  );
}