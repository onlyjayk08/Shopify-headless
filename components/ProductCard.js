import Image from "next/image"
import Link from "next/link"
import { formatter } from "../utils/helpers"

export default function ProductCard({ product }) {

    const { handle, title } = product.node
    
    const { altText, originalSrc } = product.node.images.edges[0] ? product.node.images.edges[0].node: ""

    const price = product.node.priceRange.minVariantPrice.amount

    return(
        <div>
            <Link href={`/products/${handle}`}>
                <div>  
                    <a>
                        {originalSrc ? (
                            <Image
                            src={originalSrc}
                            alt={altText}
                            width={200}
                            height={200}
                        />
                        ):(<h1>no image</h1>)}
                        <h3>{title}</h3>
                        <h3>{formatter.format(price)}</h3>
                        
                    </a>                    
                </div>
            </Link>
        </div>
        
        
    )
}