import './design.css';

export default function Design() {
  return (
    <div className="designPage">
      <h1 className="designTitle">პროექტირება და არქიტექტურული დაგეგმარება</h1>

      <p className="designIntro">
        Arch Studio გთავაზობთ პროფესიონალურ არქიტექტურულ დაგეგმარებას,
        რომელიც აერთიანებს უსაფრთხოებას, ფუნქციურობას და ესთეტიკას.
        ჩვენი გუნდი ქმნის გადაწყვეტილებებს, მორგებულს თითოეული პროექტის სპეციფიკაზე.
      </p>

      <div className="designGrid">
        <img src="/images/project1.jpg" alt="Architectural Concept" />
        <img src="/images/project2.jpg" alt="Planning Process" />
        <img src="/images/project3.jpg" alt="Final Layout" />
      </div>

      <div className="designHighlights">
        <div>
          <h3>ინდივიდუალური მიდგომა</h3>
          <p>ყოველი პროექტი უნიკალურია და ვითვალისწინებთ კლიენტის საჭიროებებს.</p>
        </div>
        <div>
          <h3>უსაფრთხოება</h3>
          <p>დაგეგმვა ხორციელდება ყველა რეგულაციის და სტანდარტის გათვალისწინებით.</p>
        </div>
        <div>
          <h3>სწრაფი რეაგირება</h3>
          <p>პროექტირება სრულდება მინიმალურ ვადებში ეფექტურობის შენარჩუნებით.</p>
        </div>
      </div>
    </div>
  );
}
