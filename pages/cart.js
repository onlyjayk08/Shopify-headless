import { useContext } from "react"
import { CartContext } from "../context/shopContext"
import Image from "next/image";
import Link from "next/link";
import { formatter } from '../utils/helpers'

export default function Cart(){
    
  const { cart, checkoutUrl, removeCartItem } = useContext(CartContext);

  let cartTotal = 0
  cart.map(item => {
    cartTotal += item?.variantPrice * item?.variantQuantity
  })

  return(
    <div>
      <div>
        {cart.length > 0 ?
          (<ul role="list">
          {cart.map((product) =>(
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
                  <p className="text-gray-500">Qty {product.variantQuantity}</p>
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
          ))}
          </ul>):
          (<div>
            <p>Nothing in your cart!</p>
          </div>)
        }
      </div>  
      {cart.length > 0 ?
        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{formatter.format(cartTotal)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <a
              href={checkoutUrl}
              className=" flex justify-center items-center px-10 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800"
            >
              Checkout
            </a>
          </div>
          <div className="mt-6 justify-center text-sm text-center text-gray-500">
            <p>
              or{' '}
              <button
                type="button"
                className="font-medium hover:text-gray-800"
              >
                Continue Shopping<span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div> : null
      }
    </div>
  )
}