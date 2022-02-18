import ProductList from "./ProductList"

export default function FeaturedCollection({ products }){

    return(
        <div>
            <h2 className="font-semibold text-3xl pb-5">Featured Collection</h2>
            <ProductList products={products}/>
        </div>
    )
}