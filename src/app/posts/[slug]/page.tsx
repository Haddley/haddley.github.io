import { getPostById, getAllPosts } from '@/lib/posts';
import { getMarkdownPost } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MobiriseContentRenderer from '@/components/MobiriseContentRenderer';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostById(slug);

  if (!post) {
    notFound();
  }

  // Try to get markdown content
  const markdownPost = await getMarkdownPost(slug);

  return (
    <>
      {/* Header Section with Title */}
      <section className="content4 cid-uBU3VQlp0E" id="content4-cru">
        <div className="container">
          <div className="row justify-content-center">
            <div className="title col-md-12 col-lg-10">
              <h3 className="mbr-section-title mbr-fonts-style align-center mb-4 display-2">
                <strong>{post.title}</strong>
              </h3>

              <h4 className="mbr-section-subtitle align-center mbr-fonts-style mb-4 display-5">
                <><strong>Neil Haddley</strong>
                  <em> • {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</em>
                </>
              </h4>

              <h4 className="mbr-section-subtitle align-center mbr-fonts-style mb-4 display-5">
                {post.description}
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <section className="content1 cid-content" id="content1-breadcrumb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="mb-4">
                <Link href="/posts" className="link text-primary display-7">
                  ← Back to Posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Render markdown content in Mobirise sections */}
      {markdownPost?.content ? (
        <MobiriseContentRenderer markdownContent={markdownPost.content} />
      ) : (
        <section className="content5 cid-content5" data-bs-version="5.1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-10">
                <div className="alert alert-warning">
                  <strong>Note:</strong> Content is being processed. The original HTML content
                  from <code>{slug}.html</code> will be displayed here.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}