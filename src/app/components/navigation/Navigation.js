'use client'
import Link from "next/link";
import { routes } from "../../constants/routes";
import './Navigation.css';
import './NavigationResp.css';
import Image from "next/image";
import { useState } from 'react';

export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);  

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);  
    };

    return (
        <>
            <div className={`headerRoutes ${menuOpen ? 'show' : ''}`}> 
                <Link href={routes.home} className="linkP linkF" rel="preload" onClick={() => setMenuOpen(false)}>მთავარი</Link>
                <Link href={routes.product} className="linkP" rel="preload" onClick={() => setMenuOpen(false)}>პროდუქცია</Link>
                <Link href={routes.design} className="linkP" rel="preload" onClick={() => setMenuOpen(false)}>პროექტირება</Link>
                <Link href={routes.installation} className="linkP" rel="preload" onClick={() => setMenuOpen(false)}>ინსტალაცია</Link>
                <Link href={routes.contact} className="linkP linkL" rel="preload" onClick={() => setMenuOpen(false)}>კონტაქტი</Link>
                <Link href="/admin" className="linkP linkAdminMobile" title="Admin Login">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="adminIcon"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                </svg>
                </Link>
            </div>
            <Image src='/images/bars.svg' width={24} height={24} alt='bars' className='bars' onClick={toggleMenu} /> 
        </>
    );
}

