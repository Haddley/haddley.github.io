'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="menu menu3 cid-uBU3VPzqgj" id="menu3-crt">
      <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
        <div className="container">
          <div className="navbar-brand">
            <span className="navbar-caption-wrap">
              <Link href="/" className="navbar-caption text-black text-primary display-7">
                Neil Haddley
              </Link>
            </span>
          </div>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown nav-right">
              <li className="nav-item">
                <Link href="/posts" className="nav-link link text-black text-primary display-4">
                  Blog Posts
                </Link>
              </li>
            </ul>
            
            <div className="icons-menu">
              <a className="iconfont-wrapper" href="https://www.linkedin.com/in/neil-haddley/" target="_blank" rel="noopener noreferrer">
                <span className="p-2 mbr-iconfont socicon-linkedin socicon"></span>
              </a>
              <a className="iconfont-wrapper" href="https://github.com/haddley" target="_blank" rel="noopener noreferrer">
                <span className="p-2 mbr-iconfont mbrib-github"></span>
              </a>
              <a className="iconfont-wrapper" href="https://www.npmjs.com/~haddley" target="_blank" rel="noopener noreferrer">
                <span className="p-2 mbr-iconfont socicon-npm socicon"></span>
              </a>
              <a className="iconfont-wrapper" href="https://hub.docker.com/u/haddley" target="_blank" rel="noopener noreferrer">
                <span className="p-2 mbr-iconfont mobi-mbri-delivery mobi-mbri"></span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}