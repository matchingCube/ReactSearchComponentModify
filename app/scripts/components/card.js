import React from 'react';

function Card({product}) {
    return(
        <div className='card'>
            <img alt={product.name} src={product.picture} className='product-image' />
            <div>
                <h2 className='product-name'>{product.name}</h2>
                <p className='price'>USD {product.price}</p>
            </div>
        </div>
    )
}

export default Card;