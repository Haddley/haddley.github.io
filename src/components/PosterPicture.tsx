import type { CSSProperties } from 'react';

/**
 * A poster picture. When the visitor has asked their device to reduce motion, the browser takes the static poster instead of the
 * motion one (the <source> below), so the poster never moves for them. Everyone else gets the file that was passed in.
 * The static file is the motion file's name without "-motion" (poster-motion.svg becomes poster.svg).
 */
export function staticOf(src: string): string {
  return src.replace(/-motion\.svg$/, '.svg');
}

interface PosterPictureProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  loading?: 'lazy' | 'eager';
  ariaHidden?: boolean;
}

export default function PosterPicture({ src, alt = '', width, height, className, style, loading = 'lazy', ariaHidden }: PosterPictureProps) {
  const still = staticOf(src);
  return (
    <picture>
      {still !== src && <source media="(prefers-reduced-motion: reduce)" srcSet={still} />}
      <img src={src} alt={alt} width={width} height={height} className={className} style={style} loading={loading} decoding="async" aria-hidden={ariaHidden ? true : undefined} />
    </picture>
  );
}
