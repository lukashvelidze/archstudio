'use client'
import { fittingsJSON } from '@/app/constants/fittingsJSON'
import { useParams } from 'next/navigation';
import Image from 'next/image';  
import './fittingsSub.css'
import React, { useState, useEffect } from 'react'
import Link from 'next/link';

export default function FittingsSub() {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState("");
    const [price, setPrice] = useState("");
    const [dimensions, setDimensions] = useState("");

    const product = fittingsJSON.find((product) => product.id === id);

   
    useEffect(() => {
        if (product) {
            const smallestSize = product.sizes[0];
            setSelectedSize(smallestSize.size);
            setPrice(smallestSize.price);
            setDimensions(smallestSize.dimensions);
        }
    }, [product]);

    const handleSizeChange = (e) => {
        const selectedSize = e.target.value;
        setSelectedSize(selectedSize);
        
       
        const sizeDetails = product.sizes.find(size => size.size === selectedSize);
        if (sizeDetails) {
            setPrice(sizeDetails.price);
            setDimensions(sizeDetails.dimensions);
        }
    }

    return (
        <div className='fittingsSub_div'>
        
            <div className="productImageDiv">
                <Image 
                    src={product.image} 
                    alt={product.name} 
                    className="productImage" 
                    width={500} 
                    height={500} 
                    style={{objectFit:'cover'}}
                />
            </div>

           
            <div className="productDetails">
                <h1 className="productTitle">{product.name.replace(/-/g, " ")}</h1>
                <p className="productDescription">{product.description}</p>

                
                <div className="sizeSelector">
                    <label htmlFor="sizes"><strong>Size:</strong></label>
                    <select
                        id="sizes"
                        value={selectedSize}
                        onChange={handleSizeChange}
                    >
                        {product.sizes.map((size, index) => (
                            <option key={index} value={size.size}>{size.dimensions}</option>
                        ))}
                    </select>
                </div>

                
                <p className="productPrice"><strong>Price:</strong> {price}</p>
            </div>
            <Link href={'/product/watersystem/fittings'} rel='preload' >Back</Link>
        </div>
    )
}
