import Link from "next/link"
import './productPage.css'
import { routes } from "../constants/routes"


export default function Product() {
  return (
    <div className="productMainDiv">
      {/* <h1 className="productTitle" >პროდუქცია</h1> */}
      <div className="routesDiv">
        <Link href={routes.detectors} rel="preload" >
          <div className="routes detimg" > დეტექცია </div>
        </Link>
        <Link href={routes.smokesystem} rel="preload" >
          <div className="routes"> კვამლის საწინააღმდეგო ვენტილაცია </div>
        </Link>
        <Link href={routes.watersystem} rel="preload" >
          <div className="routes">წყლის სისტემა</div>
        </Link>
        <Link href={routes.evacuation} rel="preload" > <div className="routes" > ადამიანთა ევაკუაციის მართვის სისტემა </div> </Link>
        <Link href={routes.broadcasting} rel="preload" > <div className="routes" > ტექსტური მაუწყებლობა </div> </Link>

      </div>
    </div>
  )
}
