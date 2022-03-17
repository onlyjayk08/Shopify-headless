import OrderList from "./OrderList"

export default function CustomerOrder({ orders }){

    return(
        <div>
            <h2 className="text-2xl py-3">Order List</h2>
            {orders.map((order, i) => (
                <div key={`order-${i}`} className="pb-5">
                    {/* <h3 className="text-xl bold p-2">{order.node.name}</h3> */}
                    <OrderList order={order.node}/>
                </div>
            ))}
        </div>
    )
}