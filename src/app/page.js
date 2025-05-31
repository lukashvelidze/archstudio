import './reset.css'
import Link from 'next/link'
import './page.css'
import { routes } from './constants/routes'

export default function HomePage() {
  return (
    <div className='container'>
      <div className='backgroundImage'>
        <div className='insideDiv'>
          <Link href={routes.design}>
            <button className='homePageButton1'>პროექტირება</button>
          </Link>
          <Link href={routes.installation}>
            <button className='homePageButton2'>ინსტალაცია</button>
          </Link>
        </div>
        <Link href={routes.product} rel='preload'>
          <button className='homePageButton'>პროდუქცია</button>
        </Link>
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

      <section className="offersSection">
        <div className="offerGrid">
          <div className="offerCard">
            <img src="/images/offer1.jpg" alt="Offer 1" />
            <p>ცეცხლსაწინააღმდეგო სისტემები</p>
          </div>
          <div className="offerCard">
            <img src="/images/offer2.jpg" alt="Offer 2" />
            <p>პროექტირება და კონსულტაცია</p>
          </div>
          <div className="offerCard">
            <img src="/images/offer3.jpg" alt="Offer 3" />
            <p>ინსტალაცია და ტესტირება</p>
          </div>
        </div>
      </section>

      <div className='projects'>
        <h1 className='projects_title'>შესრულებული პროექტები</h1>
        <div className="projectsGrid">
          <img src="/images/project1.jpg" alt="Project 1" />
          <img src="/images/project2.jpg" alt="Project 2" />
          <video controls>
            <source src="/videos/projectVid1.mp4" type="video/mp4" />
            თქვენი ბრაუზერი არ უჭერს მხარს ვიდეოს ჩაშენებას.
          </video>
          <img src="/images/project3.jpg" alt="Project 3" />
        </div>
      </div>
    </div>
  )
}
