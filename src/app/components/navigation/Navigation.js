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
                <Link href={routes.home} className="linkP linkF" rel="preload" >მთავარი</Link>
                <Link href={routes.product} className="linkP" rel="preload" >პროდუქცია</Link>
                <Link href={routes.design} className="linkP" rel="preload" >პროექტირება</Link>
                <Link href={routes.installation} className="linkP" rel="preload" >ინსტალაცია</Link>
                <Link href={routes.contact} className="linkP linkL" rel="preload" >კონტაქტი</Link>
            </div>
            <Image src='/images/bars.svg' width={24} height={24} alt='bars' className='bars' onClick={toggleMenu} /> 
        </>
    );
}
