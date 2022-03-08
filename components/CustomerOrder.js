import OrderDetail from "./OrderDetail"

export default function CustomerOrder({ orders }){

    return(
        <div>
            <h2 className="text-2xl py-3">Order List</h2>
            {orders.map((order, i) => (
                <div key={`order-${i}`}>
                    <h3 class="text-xl bold p-2">{order.node.name}</h3>
                    <OrderDetail order={order}/>
                </div>
            ))}
        </div>
    )
}