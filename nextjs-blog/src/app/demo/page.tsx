'use client';

import React, { useState } from 'react';
import { getAllPosts, BlogPost } from '@/lib/posts';
import { CategoryFilter } from '@/components/CategoryComponents';
import Link from 'next/link';
import Image from 'next/image';

export default function InteractivePostsDemo() {
  const allPosts = getAllPosts();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(allPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleFilterChange = (posts: BlogPost[], category: string | null) => {
    setFilteredPosts(posts);
    setSelectedCategory(category);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">
          Interactive Category Demo
        </h1>
        <p className="lead text-muted">
          Experience the category filtering in action
        </p>
      </div>

      {/* Category Filter Component */}
      <CategoryFilter 
        posts={allPosts}
        onFilterChange={handleFilterChange}
        selectedCategory={selectedCategory}
      />

      {/* Results Summary */}
      <div className="mb-4">
        <h3 className="h5">
          {selectedCategory ? (
            <>
              Showing {filteredPosts.length} posts in <strong>{selectedCategory}</strong>
            </>
          ) : (
            <>
              Showing all {filteredPosts.length} posts
            </>
          )}
        </h3>
      </div>

      {/* Posts Grid */}
      <div className="row">
        {filteredPosts.slice(0, 12).map((post: BlogPost) => (
          <div key={post.slug} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-img-top">
                <Link href={`/posts/${post.slug}`}>
                  <Image
                    src={post.image || '/assets/images/posts-meta.svg'}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="img-fluid"
                    style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                  />
                </Link>
              </div>
              <div className="card-body d-flex flex-column">
                <div className="mb-2">
                  <span className="badge bg-primary">
                    {post.category}
                  </span>
                </div>
                <h5 className="card-title">
                  <Link href={`/posts/${post.slug}`} className="text-decoration-none">
                    {post.title}
                  </Link>
                </h5>
                <p className="card-text flex-grow-1 text-muted small">
                  {post.description}
                </p>
                <div className="mt-auto">
                  <small className="text-muted">
                    {new Date(post.date).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show count if filtered */}
      {filteredPosts.length > 12 && (
        <div className="text-center mt-4">
          <p className="text-muted">
            Showing 12 of {filteredPosts.length} posts
            {selectedCategory && (
              <>
                {' '}in {selectedCategory}
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}