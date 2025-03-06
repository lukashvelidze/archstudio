
import { fittingsJSON } from '@/app/constants/fittingsJSON'
import Link from 'next/link'
import '../watersystem.css'
import React from 'react'

export default function Fittings() {



    return (
        <div className='main_div' >
            {/* <h1>Water Systems</h1> */}
            <div className='list_div' >
                {fittingsJSON.map((product) => (
                    <Link href={`/product/watersystem/fittings/${product.id}`} rel='preload' >
                        <div className='list_product' >
                            {product.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
