/**
 * Which picture a post's poster shows. Every poster has a static version (poster.svg, posts-meta.svg), and some also have a
 * motion version beside it (poster-motion.svg, posts-meta-motion.svg). Both files are always kept.
 *
 * Three constants control where the motion version is used:
 *
 *   USE_MOTION_POSTERS          false shows the static poster everywhere.
 *   LIMIT_MOTION_POSTERS        true: only the Featured cards (Latest and Recent) and the first MOTION_POSTER_LIST_COUNT posts of a
 *                               list or of the search results move. Every other poster, and the banners, stay static.
 *                               false: every poster that has a motion version moves, wherever it is shown.
 *   MOTION_POSTER_LIST_COUNT    how many posts at the top of a list or search result move when LIMIT_MOTION_POSTERS is true.
 *
 * Social-media previews (open graph) always use the static poster, because those sites do not animate.
 * Visitors who prefer reduced motion get the static poster whatever these say (see PosterPicture).
 */
export const USE_MOTION_POSTERS = true;
export const LIMIT_MOTION_POSTERS = true;
export const MOTION_POSTER_LIST_COUNT = 6;

/** Where a poster is shown: a Featured (Latest or Recent) card, or the nth post (counting from 0) of a list or search result.
 *  Leave it out for banners and anywhere else that is not a list. */
export type PosterPlace = 'featured' | number;

export function posterOf(post: { image?: string; imageMotion?: string }, place?: PosterPlace): string | undefined {
  if (!USE_MOTION_POSTERS || !post.imageMotion) return post.image;
  if (!LIMIT_MOTION_POSTERS) return post.imageMotion;
  if (place === 'featured') return post.imageMotion;
  if (typeof place === 'number' && place < MOTION_POSTER_LIST_COUNT) return post.imageMotion;
  return post.image;
}
