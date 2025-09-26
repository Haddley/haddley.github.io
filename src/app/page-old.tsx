import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section data-bs-version="5.1" className="header14 cid-so66lOsJnC mbr-fullscreen" id="header14-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 image-wrapper">
              <Image 
                src="/assets/images/15018162-1.jpeg" 
                alt="Neil Haddley"
                width={500}
                height={500}
                priority
              />
            </div>
            <div className="col-12 col-md">
              <div className="text-wrapper">
                <h1 className="mbr-section-title mbr-fonts-style mb-3 display-2">
                  <strong>Hi, I&apos;m Neil Haddley</strong>
                </h1>
                <p className="mbr-text mbr-fonts-style display-7">
                  I help organizations to connect with clients, comply with regulations, and automate workflows.
                </p>
                <div className="mbr-section-btn mt-3">
                  <Link href="/posts" className="btn btn-secondary display-4">
                    Blog Posts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Microsoft Azure Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="image-wrapper text-center">
                <Link href="/posts/spring-boot-2">
                  <Image
                    src="/assets/images/screen-shot-2021-02-05-at-1.31.11-pm.png"
                    alt="Azure"
                    width={500}
                    height={300}
                    className="rounded-lg hover:opacity-90 transition-opacity"
                  />
                </Link>
                <p className="text-center mt-4 display-4">
                  Microsoft Azure Resource Group
                </p>
              </div>
            </div>
            <div>
              <div className="text-wrapper">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  <strong>Microsoft Azure</strong>
                </h3>
                <p className="display-7">
                  I use my understanding of{' '}
                  <Link href="/posts/npm" className="text-blue-600 hover:text-blue-800">
                    Node.js
                  </Link>
                  ,{' '}
                  <Link href="/posts/dotnet-core-part1" className="text-blue-600 hover:text-blue-800">
                    .NET Core
                  </Link>
                  {' '}and{' '}
                  <Link href="/posts/spring-boot" className="text-blue-600 hover:text-blue-800">
                    Java Spring
                  </Link>
                  {' '}to create web sites, web applications and back-end services using JavaScript, C++, C# and Java
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Microsoft 365 Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="image-wrapper text-center">
                <Link href="/posts/purview">
                  <Image
                    src="/assets/images/screen-shot-2021-02-04-at-2.13.37-pm.png"
                    alt="Microsoft Office 365"
                    width={500}
                    height={300}
                    className="rounded-lg hover:opacity-90 transition-opacity"
                  />
                </Link>
                <p className="text-center mt-4 display-4">
                  Microsoft 365 admin center
                </p>
              </div>
            </div>
            <div>
              <div className="text-wrapper">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  <strong>Microsoft 365</strong>
                </h3>
                <p className="display-7">
                  I use my understanding of Microsoft 365 to improve the way my clients share documents, 
                  protect data, find people and develop a corporate identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}