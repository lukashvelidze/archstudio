import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../images/Logo.png'
import Phone from '../../images/phone.svg'
import './page.css'
import './pageResp.css'
import { routes } from '@/app/constants/routes'
import Navigation from '../navigation/Navigation'


export default function Header() {
    return (
        <div className='headerDiv'>
            <Link href={routes.home}>
                <Image width={70} height={70} src={Logo} alt='Archstudio Logo' priority={true} className='headerLogo' />
            </Link>
            <div className='phoneDiv'>
                <a href='tel:+995 598 11 15 07'><Image width={20} height={20} src={Phone} alt='phone icon' /></a>
                <a href='tel:+995 598 11 15 07'> +995 598 11 15 07</a>
            </div>
            <Navigation />
        </div>
    )
}