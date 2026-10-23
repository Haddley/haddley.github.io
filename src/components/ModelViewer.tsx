'use client';

// An interactive 3D model, for a post that shows a printed or built part: ":::demo model <path to a .glb or .gltf>".
// It uses Google's <model-viewer> web component, which loads only in the browser. Drag to turn the model,
// scroll or pinch to zoom, and the model turns slowly by itself until the reader touches it.

import React from 'react';

type Props = { src: string; alt?: string; poster?: string };

export default function ModelViewer({ src, alt, poster }: Props) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    let live = true;
    import('@google/model-viewer').then(() => { if (live) setReady(true); }).catch(() => {});
    return () => { live = false; };
  }, []);

  const viewer = ready
    ? React.createElement('model-viewer', {
        src,
        alt: alt || 'A 3D model that can be turned with the mouse or a finger',
        poster,
        'camera-controls': true,
        'auto-rotate': true,
        'auto-rotate-delay': 4000,
        'touch-action': 'pan-y',
        'shadow-intensity': 1,
        exposure: 1.1,
        'camera-orbit': '35deg 55deg 70%',
        style: { width: '100%', height: '100%', background: 'linear-gradient(#f4f6f9, #dfe4ec)', borderRadius: '8px' },
      })
    : null;

  return (
    <figure className="mbr-fonts-style" style={{ margin: '1.5rem 0' }}>
      <div style={{ width: '100%', height: 'min(70vh, 520px)', minHeight: '320px', position: 'relative' }}>
        {viewer}
        {!ready && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eef1f5', borderRadius: '8px', color: '#6b7280', fontSize: '0.9rem' }}>
            Loading the 3D model…
          </div>
        )}
      </div>
      <figcaption style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>
        Drag to turn the model, and scroll or pinch to zoom.
      </figcaption>
    </figure>
  );
}
