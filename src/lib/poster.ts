/**
 * Which picture a post's poster shows. Every poster has a static version (poster.svg, posts-meta.svg), and some also have a
 * motion version beside it (poster-motion.svg, posts-meta-motion.svg). Both files are always kept.
 *
 * Flip USE_MOTION_POSTERS to false to show the static poster everywhere; true shows the motion poster wherever one exists.
 * Social-media previews (open graph) always use the static poster, because those sites do not animate.
 */
export const USE_MOTION_POSTERS = true;

export function posterOf(post: { image?: string; imageMotion?: string }): string | undefined {
  return USE_MOTION_POSTERS && post.imageMotion ? post.imageMotion : post.image;
}
