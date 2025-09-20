'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '../lib/posts';
import { Category, categories, getCategoryByName } from '../lib/categories';

interface CategoryFilterProps {
  posts: BlogPost[];
  onFilterChange: (filteredPosts: BlogPost[], selectedCategory: string | null) => void;
  selectedCategory?: string | null;
}

export function CategoryFilter({ posts, onFilterChange, selectedCategory }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategory || null);

  // Calculate post counts per category
  const categoryStats = categories.map(category => ({
    ...category,
    count: posts.filter(post => post.category === category.name).length
  })).filter(cat => cat.count > 0);

  const handleCategoryClick = (categoryName: string | null) => {
    setActiveCategory(categoryName);
    
    if (categoryName === null) {
      onFilterChange(posts, null);
    } else {
      const filtered = posts.filter(post => post.category === categoryName);
      onFilterChange(filtered, categoryName);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Browse by Category
      </h2>
      
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Posts ({posts.length})
        </button>
        
        {categoryStats.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryClick(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
              activeCategory === category.name
                ? 'bg-blue-600 text-white'
                : `${category.color} hover:opacity-80`
            }`}
          >
            <span>{category.icon}</span>
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Active Category Info */}
      {activeCategory && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 mb-6">
          {(() => {
            const category = getCategoryByName(activeCategory);
            return category ? (
              <div className="flex items-start gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
}

interface CategoryCardProps {
  category: Category;
  postCount: number;
  latestPost?: {
    title: string;
    date: string;
    slug: string;
  };
}

export function CategoryCard({ category, postCount, latestPost }: CategoryCardProps) {
  return (
    <Link href={`/posts/category/${category.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {category.name}
              </h3>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                {postCount} {postCount === 1 ? 'post' : 'posts'}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {category.description}
        </p>
        
        {latestPost && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Latest:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {latestPost.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(latestPost.date).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

interface CategoryGridProps {
  posts: BlogPost[];
}

export function CategoryGrid({ posts }: CategoryGridProps) {
  const categoryStats = categories.map(category => {
    const categoryPosts = posts.filter(post => post.category === category.name);
    const latestPost = categoryPosts.length > 0 ? categoryPosts[0] : undefined;
    
    return {
      category,
      postCount: categoryPosts.length,
      latestPost: latestPost ? {
        title: latestPost.title,
        date: latestPost.date,
        slug: latestPost.slug
      } : undefined
    };
  }).filter(item => item.postCount > 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoryStats.map(({ category, postCount, latestPost }) => (
        <CategoryCard
          key={category.slug}
          category={category}
          postCount={postCount}
          latestPost={latestPost}
        />
      ))}
    </div>
  );
}

interface RelatedPostsProps {
  currentPost: BlogPost;
  posts: BlogPost[];
  limit?: number;
}

export function RelatedPosts({ currentPost, posts, limit = 3 }: RelatedPostsProps) {
  const relatedPosts = posts
    .filter(post => 
      post.category === currentPost.category && 
      post.slug !== currentPost.slug
    )
    .slice(0, limit);

  if (relatedPosts.length === 0) return null;

  const category = getCategoryByName(currentPost.category);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
        {category?.icon && <span>{category.icon}</span>}
        More in {currentPost.category}
      </h3>
      
      <div className="space-y-3">
        {relatedPosts.map(post => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block p-3 bg-white dark:bg-gray-700 rounded-md hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              {post.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">
              {post.description}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
              {new Date(post.date).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
      
      <Link
        href={`/posts/category/${category?.slug}`}
        className="inline-block mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
      >
        View all {currentPost.category} posts →
      </Link>
    </div>
  );
}