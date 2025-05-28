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
         <p className='serviceDiv_text'>
          Arch Studio გთავაზობთ სრულ მომსახურებას ხანძარსაწინააღმდეგო სისტემების პროექტირებაში, 
          მონტაჟში და პროდუქციის მოწოდებაში. ჩვენი გუნდი აერთიანებს ინჟინრებსა და სპეციალისტებს, 
          რომლებიც ზრუნავენ თითოეული ობიექტის უსაფრთხოებაზე მაღალი სტანდარტების შესაბამისად.
          <br /><br />
          ჩვენ ვამუშავებთ ინდივიდუალურ პროექტებს, ვირჩევთ შესაბამის აღჭურვილობას, 
          და ვუზრუნველყოფთ მის პროფესიონალურ ინსტალაციას. Arch Studio-ს პარტნიორობა 
          ნიშნავს ხარისხზე, სანდოობაზე და ეფექტურ შედეგებზე ორიენტირებულ მიდგომას.
        </p>
      </div>

      <div className='projects'>
        <h1 className='projects_title' >შესრულებული პროექტები</h1>
      </div>
    </div>
  )
}