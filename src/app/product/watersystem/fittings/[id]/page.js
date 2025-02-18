'use client'
import { fittingsJSON } from '@/app/constants/fittingsJSON'
import { useParams } from 'next/navigation';
import Image from 'next/image';  // Import Image component
import './fittingsSub.css'
import React, { useState, useEffect } from 'react'

export default function FittingsSub() {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState("");
    const [price, setPrice] = useState("");
    const [dimensions, setDimensions] = useState("");

    // Find the specific product based on the id
    const product = fittingsJSON.find((product) => product.id === id);

    // Set initial price and size when the component mounts
    useEffect(() => {
        if (product) {
            const smallestSize = product.sizes[0];
            setSelectedSize(smallestSize.size);
            setPrice(smallestSize.price);
            setDimensions(smallestSize.dimensions);
        }
    }, [product]);

    // Update price when size is changed
    const handleSizeChange = (e) => {
        const selectedSize = e.target.value;
        setSelectedSize(selectedSize);
        
        // Find the selected size details
        const sizeDetails = product.sizes.find(size => size.size === selectedSize);
        if (sizeDetails) {
            setPrice(sizeDetails.price);
            setDimensions(sizeDetails.dimensions);
        }
    }

    return (
        <div className='fittingsSub_div'>
            {/* Product Image using next/image */}
            <div className="productImageDiv">
                <Image 
                    src={product.image} 
                    alt={product.name} 
                    className="productImage" 
                    width={500} 
                    height={500} 
                    objectFit="cover"  
                />
            </div>

            {/* Product Details */}
            <div className="productDetails">
                <h1 className="productTitle">{product.name.replace(/-/g, " ")}</h1>
                <p className="productDescription">{product.description}</p>

                {/* Size Selector */}
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

                {/* Price */}
                <p className="productPrice"><strong>Price:</strong> {price}</p>
            </div>
        </div>
    )
}
