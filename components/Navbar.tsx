'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const TOP_OFFSET = 60;

const Navbar = () => {
  const [showBackground, setShowBackground] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const pathname = usePathname()

  const navLinks = [
    {name: 'Work', href: '/work'},
    {name: 'About', href: '/about'},
    {name: 'Services', href: '/services'},
    {name: 'Ideas', href: '/ideas'},
    {name: 'Careers', href: '/careers'},
    {name: 'Contact', href: '/contact'},
  ]

  useEffect(() => {
    var prevScrollpos = window.scrollY;

    const handleScroll = () => {
      var currentScrollPos = window.scrollY;

      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }

      if (prevScrollpos > currentScrollPos) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }

      prevScrollpos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClass = `${showNav ? "z-50 top-0": "-top-52"} w-full justify-between py-6 fixed flex px-[3.8rem] transition-all ease-in bg-[#ec5f22] duration-300 ${showBackground ? 'bg-primary opacity-85' : 'bg-transparent '}`;

  return (
    <div className={navbarClass}>
      <a href='/' className="nav-brand mx-5">
        <Image src={showBackground ? "/logo-white.png" : "/logo.png"} width={100} height={100} alt="Suitmedia Logo" />
      </a>
      <div className=" flex flex-row mt-auto">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <Link href={link.href} key={link.name} 
              className={isActive ? "nav-link border-b-4 border-white" : "nav-link"}>
              {link.name}
            </Link>
          )
        })}
      </div>
    </div>
  );
};

export default Navbar;

      