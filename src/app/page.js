// import './reset.css'
import Link from 'next/link'
import './page.css'
import { routes } from './constants/routes'

export default function HomePage() {
  return (
    <div className='container'>
      <div className='backgroundImage'>
        <div className='insideDiv' >
          <Link href={routes.design}>
            <button className='homePageButton1' > პროექტირება </button>
          </Link>
          <Link href={routes.installation} >
            <button className='homePageButton2' > ინსტალაცია </button>
          </Link>
        </div>
        <Link href={routes.product} rel='preload' ><button className='homePageButton' > პროდუქცია  </button></Link>

      </div>
    </div>
  )
}