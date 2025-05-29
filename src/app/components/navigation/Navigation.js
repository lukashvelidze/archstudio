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
                <Link href="/admin" className="linkP linkAdminMobile" rel="preload" onClick={() => setMenuOpen(false)}>ადმინი</Link>
            </div>
            <Image src='/images/bars.svg' width={24} height={24} alt='bars' className='bars' onClick={toggleMenu} /> 
        </>
    );
}
