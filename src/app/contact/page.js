import '../reset.css'
import './contacts.css'

export default function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">დაგვიკავშირდით</h1>
      <p className="contact-description">
        გთხოვთ, დაგვიკავშირდით ქვემოთ მითითებული საშუალებებით ნებისმიერი შეკითხვის ან მომსახურებაზე ინფორმაციის მისაღებად.
      </p>

      <div className="contact-info">
        <div className="contact-card">
          <h2>ტელეფონი</h2>
          <p>+995 599 12 34 56</p>
        </div>
        <div className="contact-card">
          <h2>ელ. ფოსტა</h2>
          <p>info@archstudio.ge</p>
        </div>
        <div className="contact-card">
          <h2>მისამართი</h2>
          <p>მედეა ჯუღელის ქუჩა N1, თბილისი, საქართველო</p>
        </div>
      </div>

      <div className="map-placeholder">
        <p>📍 აქ შეიძლება იყოს რუკა ან მდებარეობის სქემა</p>
      </div>
    </div>
  )
}

