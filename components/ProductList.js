import ProductCard from "./ProductCard"

export default function ProductList({ products }){

    return(
        <div className="items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap8 mb-8">
                {products.map(product => (
                <ProductCard className="mx-auto" key={product.node.id} product={product} />
                ))}
            </div>
        </div>
    )
}