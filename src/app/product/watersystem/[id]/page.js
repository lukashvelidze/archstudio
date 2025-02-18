'use client'
import { useParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { waterSystemProducts } from '@/app/constants/productJSON';
import './watersystemproduct.css'
import Fittings from '../fittings/page';

export default function WaterSystemProduct() {
    const { id } = useParams();

    const product = waterSystemProducts.find((product) => product.id === id);


    if (!product) {
        return <div>Product not found</div>;
    }

    if (product.id === 'fittings') {
        return <div><Fittings /></div>
    }

    return (
        <div className='product_main_div' >
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <Link href="/product/watersystem">Back to Water Systems</Link>
        </div>
    );
}


