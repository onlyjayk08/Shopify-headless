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
        <header className="h-20 lg:h-32" role="banner">
        <div className="h-full lag:flex-col place-content-between">
            <div className="text-center w-full flex justify-between items-center">
                <div className="uppercase text-3xl tracking-widest">
                    <Link href="/">
                        <a>
                            {storeName}
                        </a>
                    </Link> 
                </div>
                <Link href="/accounts">
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
            <Navbar collections={collections} storeName={storeName}/>
        </div>
        </header>
    )
}