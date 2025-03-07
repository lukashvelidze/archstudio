
import { fittingsJSON } from '@/app/constants/fittingsJSON'
import Link from 'next/link'
import '../watersystem.css'
import React from 'react'
import { waterSystemProducts } from '@/app/constants/productJSON'

export default function Fittings() {



    return (
        <div className='main_div' >
            {/* <h1>Water Systems</h1> */}
            <div className='list_div' >
                {fittingsJSON.map((product, index) => (
                    <Link href={`/product/watersystem/fittings/${product.id}`} rel='preload'  key={index}  >
                        <div className='list_product' >
                            {product.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
