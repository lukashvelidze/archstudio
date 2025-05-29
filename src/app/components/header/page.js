import Image from 'next/image'
import Link from 'next/link'
import './page.css'
import './pageResp.css'
import { routes } from '@/app/constants/routes'
import Navigation from '../navigation/Navigation'


export default function Header() {
    return (
        <div className='header'>
            <Link href={routes.home}>
                <Image width={70} height={70} src='/images/Logo.png' alt='Archstudio Logo' priority={true} className='headerLogo' />
            </Link>
            <div className='phoneDiv'>
                <a href='tel:+995 598 11 15 07'><Image width={20} height={20} src='/images/phone.svg' alt='phone icon' /></a>
                <a href='tel:+995 598 11 15 07' style={{color:'black'}} > +995 598 11 15 07</a>
            </div>
            <Navigation />
        </div>
    )
}