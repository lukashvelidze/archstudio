import './reset.css'
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
      <div className='serviceDiv'>
        <h1 className='serviceDiv_title'>რას გთავაზობთ?</h1>
        <p className='serviceDiv_text'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum volutpat efficitur. 
          Nunc ut tristique purus. Nunc interdum sodales justo at placerat. Sed lobortis orci arcu, ac porttitor enim euismod non. 
          Vestibulum nulla sem, sollicitudin non scelerisque eu, placerat non nulla. Nam in enim ut mauris mattis mattis. Suspendisse 
          sagittis nunc et felis posuere bibendum. Duis in ultrices lectus, at pulvinar eros. Cras ullamcorper tristique mi, in interdum 
          dolor sollicitudin in. Phasellus elementum, mauris et auctor molestie, lacus quam consectetur diam, nec elementum metus enim non dui.
          Praesent eu arcu et dui pulvinar varius. Fusce tristique risus quis suscipit malesuada. Integer laoreet tellus sed metus lacinia consectetur. </p>
      </div>

      <div className='projects'>
        <h1 className='projects_title' >შესრულებული პროექტები</h1>
      </div>
    </div>
  )
}