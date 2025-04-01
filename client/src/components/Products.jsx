import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from 'axios'
import { backend } from "../constant.js";


function Products() {

  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backend}/api/products/get-products`);
      if (res.data.success) {
        console.log(res.data.products);
        setProducts(res.data.products)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-5">
        {
            products.length > 0 && products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))
        }
      </div>
    </>
  );
}

export default Products;
