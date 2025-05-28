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
        <p><strong>ტელეფონი:</strong> +995 599 12 34 56</p>
        <p><strong>ელ. ფოსტა:</strong> info@archstudio.ge</p>
        <p><strong>მისამართი:</strong> თბილისი, საქართველო</p>
      </div>

      <div className="contact-form">
        <h2>მოგვწერეთ</h2>
        <form>
          <input type="text" placeholder="სახელი და გვარი" required />
          <input type="email" placeholder="ელ. ფოსტა" required />
          <textarea placeholder="თქვენი შეტყობინება" required></textarea>
          <button type="submit">გაგზავნა</button>
        </form>
      </div>
    </div>
  )
}
