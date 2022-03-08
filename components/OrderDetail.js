import { formatter } from "../utils/helpers"

export default function OrderDetail({ order }){

    const orderinfo = order.node
    console.log(orderinfo)

    return(
        <div>
            <p>name: {orderinfo.name}</p>
            <p>price: {formatter.format(orderinfo.currentTotalPrice.amount)}</p>
        </div>
    )
}