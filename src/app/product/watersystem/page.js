import { waterSystemProducts } from "@/app/constants/productJSON";
import Link from "next/link";
import './watersystem.css'

export default function WaterSystems() {
  return (
    <div className='main_div' >
      {/* <h1>Water Systems</h1> */}
      <div className='list_div' key={waterSystemProducts.id} >
        {waterSystemProducts.map((product) => (
          <Link href={`/product/watersystem/${product.id}`} rel='preload' >
            <div className='list_product' >
              {product.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
