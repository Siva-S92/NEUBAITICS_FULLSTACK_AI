import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProductCard({product}) {
  const navigate = useNavigate()
  return (
    <div className='w-[18rem] h-[22rem] border border-gray-100 rounded-md p-2 '>
        <img className='w-full h-[60%] object-contain ' src={product.thumbnail} alt="image" />
        <div className='w-full h-[40%] p-2 relative'>
            <p className='font-bold'>{product.title}</p>
            <p>category: {product.category}</p>
            <p>price: {product.price}$</p>
            <div className='absolute bottom-0 w-full text-end'>
            <button type='button' onClick={() => navigate(`/product-detail/${product._id}`)} className='border border-gray-300 rounded-full px-6 py-1 mx-2 cursor-pointer'>Reviews</button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard