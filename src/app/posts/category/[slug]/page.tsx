import { getCategoryBySlug } from '@/lib/categories';
import { categories } from '@/lib/categories';
import CategoryDetailPage from '@/components/CategoryDetailPage';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Kept for backwards compatibility with old links — /categories/<slug>/ is now the primary
// URL and this canonicalizes to it, but this route still renders the same real content
// rather than redirecting (a static export has no server to redirect from).
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} Posts | Neil Haddley`,
    description: category.description,
    alternates: { canonical: `https://haddley.github.io/categories/${slug}/` },
    openGraph: {
      title: `${category.name} Posts | Neil Haddley`,
      description: category.description,
      url: `https://haddley.github.io/posts/category/${slug}/`,
    },
  };
}

export async function generateStaticParams() {
  const allSlugs: string[] = [];
  categories.forEach((category) => {
    allSlugs.push(category.slug);
    if (category.aliases) {
      allSlugs.push(...category.aliases);
    }
  });
  return allSlugs.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  return <CategoryDetailPage slug={slug} />;
}
