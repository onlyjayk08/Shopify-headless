import { formatter } from "../utils/helpers"
import Link from "next/link"

export default function OrderList({ order }){

    console.log(order)

    return( 
        
        <div>
            <Link
            href={{
                pathname: `/customer/order/${order.id}`,
                query: { order: JSON.stringify(order) }
              }}>
                <a>
                    <p>name: {order.name}</p>
                </a>
            </Link>
            <p>Date: {order.processedAt}</p>
            <p>Payment Status: {order.financialStatus}</p>
            <p>Fullfilment Status: {order.fulfillmentStatus}</p>
            <p>Total: {formatter.format(order.currentTotalPrice.amount)}</p>
        </div>
    )
}