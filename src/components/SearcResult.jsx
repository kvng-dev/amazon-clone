import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { callAPI } from "../utils/axioInstance";
import { ProductDetails } from "./ProductDetails";
import { GB_CURRENCY } from "../utils/constant";

export const SearcResult = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const getSearchResult = () => {
    const searchTerms = searchParams.get("searchTerm");
    const category = searchParams.get("category");
    callAPI(`data/search.json`).then((searchResult) => {
      console.log(searchResult);
      const categoryResults = searchResult[category];
      if (searchTerms) {
        const results = categoryResults.filter((product) =>
          product.title.toLowerCase().includes(searchTerms.toLowerCase())
        );
        setProducts(results);
      } else {
        setProducts(categoryResults);
      }
    });
  };
  useEffect(() => {
    getSearchResult();
  }, [searchParams]);

  return (
    <div className="min-w-[1200px] max-w-[1300px] m-auto pt-4">
      {products &&
        products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className="h-[250px] grid grid-cols-12 rounded mt-1 bg-purple-500">
              <div className="col-span-2 p-4 bg-gray-200">
                <img src={product.image_small} alt={product.title} />
              </div>
              <div className="col-span-10 bg-gray-50 border border-gary-100 hover:bg-gray-100">
                <div className="font-medium text-black p-2">
                  <ProductDetails product={product} ratings={true} />
                  <div className="text-xl xl:text-2xl pt-1">
                    {GB_CURRENCY.format(product.price)}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};
