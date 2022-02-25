import { useContext } from "react"
import { CartContext } from "../context/shopContext"
import { formatter } from '../utils/helpers'
import LineItem from "../components/LineItem";

export default function Cart() {

  const { cart, checkoutUrl, removeCartItem, updateLineItemInCart } = useContext(CartContext);

  let cartTotal = 0
  cart.map(item => {
    cartTotal += item?.variantPrice * item?.variantQuantity
  })

  return (
    <div>
      <div>
        {cart.length > 0 ?
          (<ul role="list">
            {cart.map((product) => (
              <div>
                <LineItem
                  key={product.id.toString()}
                  removeCartItem={removeCartItem}
                  updateLineItemInCart={updateLineItemInCart}
                  product={product}
                />
              </div>
            ))}
          </ul>) :
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