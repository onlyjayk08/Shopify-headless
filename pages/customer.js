import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import { getCustomer } from "../lib/shopify";
import CustomerAddress from "../components/CustomerAddress";
import CustomerOrder from "../components/CustomerOrder";

export default function Customer(){
    const router = useRouter();

    const [accessToken, setAccessToken] = useState("");
    const [customer, setCustomer] = useState("");

    const handleLogout = async () =>{

        localStorage.removeItem("accessToken")
        router.push('account/login')
    }

    useEffect(async ()=>{
        if(localStorage.accessToken){
            setAccessToken(localStorage.accessToken)
            const customer = await getCustomer(localStorage.accessToken)
            setCustomer(customer)
            console.log(customer)
        }
        else{
            router.push('/account/login')
        }
        
    },[])
    

    return(
        <div>
            <p>Customer page</p>
            {customer? (<div>
                {accessToken}
                <p>Display Name: {customer.displayName}</p>
                <p>First Name: {customer.firstName}</p>
                <p>Last Name: {customer.lastName}</p>
                <p>Email: {customer.email}</p>

                <button onClick={handleLogout}>    
                    Logout
                </button>
                <CustomerOrder orders={customer.orders.edges}/>
                <CustomerAddress customerAccessToken={accessToken} addresses={customer.addresses.edges}/>
            </div>): null}
        </div>
    )
}