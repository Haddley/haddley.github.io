import { 
  getVisibleAutomatedCategories, 
  getVisibleBlogPostsByAutomatedCategory,
  getVisibleBlogPosts,
  BlogPost
} from '@/lib/posts';
import { categoryNameToSlug } from '@/lib/categories';
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
          📂 Updated Blog Categories
        </h1>
        
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-blue-800">Total Posts</h3>
            <p className="text-2xl font-bold text-blue-600">{totalPosts}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-green-800">Auto-Categorized</h3>
            <p className="text-2xl font-bold text-green-600">{categorizedPosts}</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-orange-800">Categories</h3>
            <p className="text-2xl font-bold text-orange-600">{automatedCategories.length}</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            Our blog posts have been automatically classified using intelligent content analysis into the following target categories: 
            <strong>.NET, Java, Azure, AI, Microsoft 365, Microsoft Dynamics, Power Platform, DevOps, Cloud, IOT, Mobile</strong>.
            Posts can belong to multiple categories based on their content, title, and tags.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automatedCategories.map(category => {
            const categoryPosts = categoryPostsMap[category];
            const postCount = categoryPosts.length;
            
            // Category color mapping for updated categories
            const getCategoryColor = (cat: string) => {
              const colors: Record<string, string> = {
                '.NET': 'bg-purple-100 text-purple-800 border-purple-200',
                'Java': 'bg-orange-100 text-orange-800 border-orange-200',
                'Azure': 'bg-blue-100 text-blue-800 border-blue-200',
                'AI': 'bg-green-100 text-green-800 border-green-200',
                'Microsoft 365': 'bg-indigo-100 text-indigo-800 border-indigo-200',
                'Microsoft Dynamics': 'bg-red-100 text-red-800 border-red-200',
                'Power Platform': 'bg-yellow-100 text-yellow-800 border-yellow-200',
                'DevOps': 'bg-gray-100 text-gray-800 border-gray-200',
                'Cloud': 'bg-cyan-100 text-cyan-800 border-cyan-200',
                'IOT': 'bg-teal-100 text-teal-800 border-teal-200',
                'Mobile': 'bg-pink-100 text-pink-800 border-pink-200'
              };
              return colors[cat] || 'bg-slate-100 text-slate-800 border-slate-200';
            };

            return (
              <div 
                key={category}
                className={`p-6 rounded-lg border-2 hover:shadow-lg transition-shadow ${getCategoryColor(category)}`}
              >
                <h3 className="text-xl font-bold mb-3">{category}</h3>
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
                    href={`/posts/category/${categoryNameToSlug(category)}`}
                    className="text-sm font-medium hover:underline"
                  >
                    View All Posts →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Updated Legend */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">🤖 Updated Automated Classification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">New Target Categories:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>.NET, Java, Azure, AI</li>
                <li>Microsoft 365, Microsoft Dynamics</li>
                <li>Power Platform, DevOps, Cloud</li>
                <li>IOT, Mobile (newly added)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Improvements:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Enhanced Microsoft 365 coverage</li>
                <li>Better DevOps classification</li>
                <li>Separated IOT and Mobile categories</li>
                <li>Multi-category assignment (153 posts)</li>
              </ul>
            </div>
          </div>
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