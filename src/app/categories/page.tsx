import {
  getVisibleAutomatedCategories,
  getVisibleBlogPostsByAutomatedCategory,
  getVisibleBlogPosts,
  BlogPost
} from '@/lib/posts';
import { categories as categoryDefinitions, getCategoryByName } from '@/lib/categories';
import Link from 'next/link';

export default async function CategoriesPage() {
  const automatedCategories = await getVisibleAutomatedCategories();
  const allPosts = await getVisibleBlogPosts();

  // Calculate statistics
  const totalPosts = allPosts.length;
  const categorizedPosts = allPosts.filter(post => post.categories && post.categories.length > 0).length;

  // Fetch posts for each category
  const categoryPostsMap: Record<string, BlogPost[]> = {};
  for (const category of automatedCategories) {
    categoryPostsMap[category] = await getVisibleBlogPostsByAutomatedCategory(category);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          📂 Blog Categories
        </h1>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-blue-800">Total Posts</h3>
            <p className="text-2xl font-bold text-blue-600">{totalPosts}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-green-800">Categorized</h3>
            <p className="text-2xl font-bold text-green-600">{categorizedPosts}</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-orange-800">Categories</h3>
            <p className="text-2xl font-bold text-orange-600">{automatedCategories.length}</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automatedCategories.map(category => {
            const categoryPosts = categoryPostsMap[category];
            const postCount = categoryPosts.length;
            const def = getCategoryByName(category);
            const slug = def?.slug ?? category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
            // Use color from definition, or a neutral fallback
            const colorClass = def?.color
              ? def.color.replace('text-', 'text-').replace('bg-', 'bg-')
              : 'bg-slate-100 text-slate-800';

            return (
              <div
                key={category}
                className={`p-6 rounded-lg border-2 hover:shadow-lg transition-shadow ${colorClass} border-current border-opacity-30`}
              >
                <h3 className="text-xl font-bold mb-3">
                  {def?.icon && <span className="mr-2">{def.icon}</span>}
                  {category}
                </h3>
                <p className="text-sm opacity-75 mb-4">
                  {postCount} post{postCount !== 1 ? 's' : ''}
                </p>

                {/* Show first few posts as examples */}
                <div className="space-y-2 mb-4">
                  {categoryPosts.slice(0, 3).map(post => (
                    <div key={post.slug} className="text-sm">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="hover:underline font-medium"
                      >
                        {post.title}
                      </Link>
                    </div>
                  ))}
                  {postCount > 3 && (
                    <div className="text-xs opacity-60">
                      +{postCount - 3} more posts...
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Link
                    href={`/posts/category/${slug}`}
                    className="text-sm font-medium hover:underline"
                  >
                    View All Posts →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/posts"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
