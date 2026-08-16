import { getCategoryBySlug, categories } from '@/lib/categories';
import CategoryDetailPage from '@/components/CategoryDetailPage';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// /categories/<slug>/ mirrors /posts/category/<slug>/ — same content, same component.
// Canonical points at /posts/category/<slug>/ so search engines treat that as the one true URL.
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} Posts | Neil Haddley`,
    description: category.description,
    alternates: { canonical: `https://haddley.github.io/posts/category/${slug}/` },
    openGraph: {
      title: `${category.name} Posts | Neil Haddley`,
      description: category.description,
      url: `https://haddley.github.io/categories/${slug}/`,
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

export default async function CategoriesSlugPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  return <CategoryDetailPage slug={slug} />;
}
