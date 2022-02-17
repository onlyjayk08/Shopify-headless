import { getAllProducts } from "../lib/shopify";
import ProductList from "../components/ProductList";

export default function Products({ products }){

    return(
        <div>
            <h1>All Products</h1>
            <ProductList products={products}/>
        </div>
    )
}


export async function getStaticProps(){
    const products = await getAllProducts();

    return{
        props: { products }
    }
}