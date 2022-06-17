import Link from "next/link";
import Navbar from "./Navbar";
import { useContext } from "react";
import { CartContext } from "../context/shopContext";

export default function Header({collections, storeName}){

    const { cart } = useContext(CartContext)

    let cartQuantity = 0;
    cart.map(item => {
        return (cartQuantity += item?.variantQuantity)
    })

    return (
        <header className=" py-8 items-center grid grid-cols-3" role="banner">
        <div className="h-full lag:flex-col place-content-between">
            <div className="text-center w-full flex justify-between items-center">
                <div className="uppercase text-3xl tracking-widest m-0 leading-0">
                    <Link href="/">
                        <a>
                            {storeName}
                        </a>
                    </Link> 
                </div>          
            </div> 
            
        </div>
        <div>
        <Navbar collections={collections} storeName={storeName}/>
        </div>
        <div className="justify-self-end flex">
        <Link href="/account/login">
            <a>
                Account
            </a>
        </Link>  
        <Link href="/cart">
            <a>
                Cart({cartQuantity})
            </a>
        </Link> 
        </div>
        </header>
    )
}