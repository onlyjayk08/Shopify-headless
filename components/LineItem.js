import Image from "next/image";
import Link from "next/link";
import { formatter } from '../utils/helpers'

export default function LineItem({ product, removeCartItem, updateLineItemInCart }) {

    const decrementQuantity = (product) => {
        const updatedQuantity = product.variantQuantity - 1
        updateLineItemInCart(product, updatedQuantity);
    }

    const incrementQuantity = (product) => {
        const updatedQuantity = product.variantQuantity + 1
        updateLineItemInCart(product, updatedQuantity);
    }

    return (
        <div>
            <li key={product.id + Math.random()} className="py-6 flex">
                <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="ml-4 flex-1 flex flex-col">
                    <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                                <Link href={`/products/${product.handle}`}>
                                    <a>
                                        {product.title}
                                    </a>
                                </Link>
                            </h3>
                            <p className="ml-4">{formatter.format(product.variantPrice)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.variantTitle}</p>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                        <button className="Line-item__quantity-update" onClick={() => decrementQuantity(product)}>-</button>
                        <span className="text-gray-500">Qty {product.variantQuantity}</span>
                        <button className="Line-item__quantity-update" onClick={() => incrementQuantity(product)}>+</button>
                        <div className="flex">
                            <button
                                onClick={() => removeCartItem(product.id)}
                                type="button"
                                className="font-medium text-gray-500 hover:text-gray-800">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    )
}