import Navbar from "./Navbar"
import { getStoreInfo, getAllCollections } from "../lib/shopify";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }){

    const [storeName, setStoreName] = useState();
    const [collections, setCollections] = useState();


    useEffect(async ()=>{
        const storeinfo =  await getStoreInfo();
        const allcollections = await getAllCollections();
        setStoreName(storeinfo.name)
        setCollections(allcollections);
    },[])
 
    return (
        <div className="w-[120rem] m-0 justify-center">
            <Header collections={collections} storeName={storeName}/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    )
}