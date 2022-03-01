import ProductCard from "./ProductCard";

export default function RecommendedList({current, products}){

    return(
        <div>
            <h2 className="text-2xl py-5">Recommended Products</h2>
            <div className="items-center overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap8 mb-8">
                    {
                        products.map(product =>(
                            product.node.id === current ? null : <ProductCard className="mx-auto" key={product.node.id} product={product} />
                        ))
                    }
                </div>
            </div>
            
        </div>
    )
}