import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getCustomerOrder } from "../../../lib/shopify";
import { formatter } from "../../../utils/helpers";

export default function OrderDetail() {
    const router = useRouter();
    const orderId = router.query.orderId;

    const [order, setOrder] = useState([])
    const [lineItems, setLineItems] = useState([])

    useEffect(async () => {
        const decodedOrderId = await Buffer.from(`${orderId}`, 'base64').toString('ascii')
        console.log(decodedOrderId)
        if (decodedOrderId.includes("gid")) {
            const getorder = await getCustomerOrder(decodedOrderId);
            setOrder(getorder)
            const getItems = getorder.lineItems.edges;
            setLineItems(getItems)
        }
    }, [])

    console.log(order)

    return (
        <div>
            <h1>Order Detail</h1>
            <h1>{orderId}</h1>
            <p>{order.name}</p>
            <br />
            {lineItems.map((lineItem, i) => (
                <div key={`lineItem${i}`}>
                    <p>{lineItem.node.title}</p>
                    <p>Quantity: {lineItem.node.currentQuantity}</p>
                    <p>Price: {formatter.format(lineItem.node.originalTotalPrice.amount)}</p>
                    <br />
                </div>
            ))}
            <br />
            <p>Total: {formatter.format(order.currentTotalPrice?.amount)}</p>
            <br/>
            <h2>Billing Address</h2>
            <br/>
            <h2>Shipping Address</h2>
        </div>
    )
}