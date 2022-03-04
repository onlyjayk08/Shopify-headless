import { getAllProducts } from "../lib/shopify";
import ProductList from "../components/ProductList";
import { useState } from "react";

export default function Products({ allProducts, first }){

    const[firstProduct, setFirstProduct] = useState(first);
    const[productsEdges, setProductsEdges] = useState(allProducts.edges)
    const[pageInfo, setPageInfo] = useState(allProducts.pageInfo.hasNextPage)

    const loadMore = async () =>{
        setFirstProduct(firstProduct + 4)
    }   

    useEffect(async ()=>{
        const allProducts = await getAllProducts(firstProduct);
        setProductsEdges(allProducts.edges)
        setPageInfo(allProducts.pageInfo.hasNextPage)
    },[firstProduct])

    return(
        <div>
            <h1>All Products</h1>
            <ProductList products={productsEdges}/>
            <div className="py-10 text-center">
                {pageInfo ? 
                <button 
                    onClick={loadMore}
                    className="bg-black text-white py-2 px-4"
                >
                    Load More
                </button>:
                <button 
                    className="bg-gray-500 text-white py-2 px-4"
                    disabled
                >
                    Load More
                </button>}
            
        </div>
        </div>
    )
}


export async function getStaticProps(){
    const first = 4;
    const allProducts = await getAllProducts(first);

    return{
        props: { allProducts, first }
    }
}