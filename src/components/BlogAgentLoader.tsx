'use client';

import dynamic from 'next/dynamic';

const BlogAgent = dynamic(() => import('./BlogAgent'), { ssr: false });

export default function BlogAgentLoader() {
  return <BlogAgent />;
}
