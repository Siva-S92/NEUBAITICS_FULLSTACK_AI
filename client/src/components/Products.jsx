import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { backend } from "../constant.js";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${backend}/api/products/get-products`);
      if (res.data.success) {
        setProducts(res.data.products);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    {
      isLoading && (
        <div className="w-full h-96 flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )
    }
      <div className="flex flex-wrap justify-center items-center gap-5">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </>
  );
}

export default Products;
