interface NavyImageBannerProps {
  images: string[];
  children: React.ReactNode;
  padding?: string;
}

export default function NavyImageBanner({
  images,
  children,
  padding = '5rem 0 3.5rem',
}: NavyImageBannerProps) {
  const bannerImages = images.filter(Boolean).slice(0, 6);

  return (
    <section style={{ backgroundColor: 'var(--navy)', padding, position: 'relative', overflow: 'hidden' }}>
      {/* Navy-stained image strip */}
      {bannerImages.length > 0 && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
          {bannerImages.map((src, i) => (
            <div key={i} style={{ flex: 1, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.25) sepia(1) hue-rotate(200deg) saturate(2)',
                }}
              />
            </div>
          ))}
          {/* Overlay keeps text legible */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 30, 61, 0.55)' }} />
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}
