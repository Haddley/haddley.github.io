import { getAllPosts, getCategories } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

export default function PostsPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="display-2 mb-6">
            <strong>Blog Posts</strong>
          </h1>
          <p className="display-7 max-w-3xl mx-auto">
            Explore my latest articles on web development, cloud computing, and modern technologies.
            From Azure and Angular to Business Central and machine learning.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {post.image && (
                <div className="aspect-video relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  <Link href={`/posts/${post.slug}`} className="text-gray-900 hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Want to work together?</h2>
          <p className="display-7 mb-8">
            I help organizations connect with clients, comply with regulations, and automate workflows.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://www.linkedin.com/in/neil-haddley/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary display-4"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}