import './installation.css';

export default function Installation() {
  return (
    <div className="installationPage">
      <h1 className="installationTitle">ინსტალაციის სერვისები</h1>

      <p className="installationIntro">
        Arch Studio გთავაზობთ ინსტალაციის სრულ სერვისს საცხოვრებელ და კომერციულ შენობებზე.
        ჩვენი მომსახურება მოიცავს წყალგაყვანილობის, ელექტროსისტემების და ხანძარსაწინააღმდეგო მოწყობილობების მონტაჟს.
      </p>

      <div className="installationGrid">
        <div className="installCard">
          <img src="/images/project1.jpg" alt="Water System Installation" />
          <h3>წყალმომარაგება</h3>
          <p>მრავალწლიანი გამოცდილება წყლის მილებისა და სისტემების სწორად დამონტაჟებაში.</p>
        </div>
        <div className="installCard">
          <img src="/images/project2.jpg" alt="Electrical Work" />
          <h3>ელექტროობა</h3>
          <p>ელექტრო გაყვანილობის უსაფრთხო და სტანდარტული ინსტალაცია.</p>
        </div>
        <div className="installCard">
          <img src="/images/project3.jpg" alt="Fire Safety" />
          <h3>ხანძარსაწინააღმდეგო სისტემები</h3>
          <p>სპრინკლერები, კვამლის დეტექტორები და სხვა მოწყობილობების ინსტალაცია.</p>
        </div>
      </div>
    </div>
  );
}
