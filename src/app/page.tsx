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
      <section data-bs-version="5.1" className="image1 cid-so67cSs55y" id="image1-7">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className="image-wrapper">
                <Link href="/posts/spring-boot-2">
                  <Image 
                    src="/assets/images/screen-shot-2021-02-05-at-1.31.11-pm.png" 
                    alt="Azure"
                    width={600}
                    height={400}
                  />
                </Link>
                <p className="mbr-description mbr-fonts-style pt-2 align-center display-4">
                  Microsoft Azure Resource Group
                </p>
              </div>
            </div>
            <div className="col-12 col-lg">
              <div className="text-wrapper">
                <h3 className="mbr-section-title mbr-fonts-style mb-3 display-5">
                  <strong>Microsoft Azure</strong>
                </h3>
                <p className="mbr-text mbr-fonts-style display-7">
                  I use my understanding of{' '}
                  <Link href="/posts/npm" className="text-primary">
                    Node.js
                  </Link>
                  ,{' '}
                  <Link href="/posts/dotnet-core-part1" className="text-primary">
                    .NET Core
                  </Link>
                  {' '}and{' '}
                  <Link href="/posts/spring-boot" className="text-primary">
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
      <section data-bs-version="5.1" className="image2 cid-tPzDVBdeT6" id="image2-6sk">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className="image-wrapper">
                <Link href="/posts/purview">
                  <Image 
                    src="/assets/images/screen-shot-2021-02-04-at-2.13.37-pm.png" 
                    alt="Microsoft Office 365"
                    width={600}
                    height={400}
                  />
                </Link>
                <p className="mbr-description mbr-fonts-style mt-2 align-center display-4">
                  Microsoft 365 admin center
                </p>
              </div>
            </div>
            <div className="col-12 col-lg">
              <div className="text-wrapper">
                <h3 className="mbr-section-title mbr-fonts-style mb-3 display-5">
                  <strong>Microsoft 365</strong>
                </h3>
                <p className="mbr-text mbr-fonts-style display-7">
                  I use my understanding of Microsoft 365 to improve the way my clients share documents, protect data, find people and develop a corporate identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ionic Framework Section */}
      <section data-bs-version="5.1" className="image1 cid-so6g9moZwH" id="image1-8">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className="image-wrapper">
                <a href="https://haddley.github.io/directory/www/index.html" target="_blank" rel="noopener noreferrer">
                  <Image 
                    src="/assets/images/screen-shot-2021-02-06-at-3.55.19-pm.png" 
                    alt="Ionic"
                    width={600}
                    height={400}
                  />
                </a>
                <p className="mbr-description mbr-fonts-style pt-2 align-center display-4">
                  Ionic Framework
                </p>
              </div>
            </div>
            <div className="col-12 col-lg">
              <div className="text-wrapper">
                <h3 className="mbr-section-title mbr-fonts-style mb-3 display-5">
                  <strong>Ionic Framework</strong>
                </h3>
                <p className="mbr-text mbr-fonts-style display-7">
                  I use my understanding of{' '}
                  <Link href="/posts/ionic" className="text-primary">
                    Ionic
                  </Link>
                  {' '}to create{' '}
                  <a href="https://haddley.github.io/directory/www/index.html" className="text-primary" target="_blank" rel="noopener noreferrer">
                    corporate
                  </a>
                  {' '}and{' '}
                  <a href="https://haddley.github.io/flappy/www/index.html" className="text-primary" target="_blank" rel="noopener noreferrer">
                    less serious
                  </a>
                  {' '}mobile applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amazon AWS Section */}
      <section data-bs-version="5.1" className="image2 cid-so62ilvPop" id="image2-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className="image-wrapper">
                <Link href="/posts/aspnetcoreawseks">
                  <Image 
                    src="/assets/images/amazon-eks-google-chrome-8-16-2021-9-39-05-pm-1644x1069.png" 
                    alt="Amazon EKS"
                    width={600}
                    height={400}
                  />
                </Link>
                <p className="mbr-description mbr-fonts-style mt-2 align-center display-4">
                  Amazon Elastic Kubernetes Service (Amazon EKS)
                </p>
              </div>
            </div>
            <div className="col-12 col-lg">
              <div className="text-wrapper">
                <h3 className="mbr-section-title mbr-fonts-style mb-3 display-5">
                  <strong>Amazon AWS</strong>
                </h3>
                <p className="mbr-text mbr-fonts-style display-7">
                  I use my understanding of Amazon AWS to manage cloud infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}