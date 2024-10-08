import React from 'react';

const ProductDetail = ({ name, description, price, quantity }) => {
    return (
        <div className='max--w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
            <div className='px-6 py-4'>
                <h2 className='text-xl text-gray-700'>{name}</h2>
                <p className='text-gray-500 text-base mt-2'>{description}</p>
                <p className='text-gray-900 text-lg mt-4'><strong>Preço</strong>${price}</p>
                <span className='text-gray-900 text-lg mt-2'>{quantity}</span>
            </div>

        </div>
    );
}

export default ProductDetail;
