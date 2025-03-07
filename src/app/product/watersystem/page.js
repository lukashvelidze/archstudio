import { waterSystemProducts } from "@/app/constants/productJSON";
import Link from "next/link";
import './watersystem.css'

export default function WaterSystems() {
  return (
    <div className='main_div' >
      {/* <h1>Water Systems</h1> */}
      <div className='list_div'  >
        {waterSystemProducts.map((product, index) => (
          <Link href={`/product/watersystem/${product.id}`} rel='preload' key={index}   >
            <div className='list_product' >
              {product.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
