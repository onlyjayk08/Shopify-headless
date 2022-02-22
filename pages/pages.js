import { getAllPages } from "../lib/shopify"
import PageList from "../components/PageList";

export default function Pages({ pages }){
    
    return(
        <div>
            <h1>CMS Pages</h1>
            <PageList pages={pages}/>
        </div>
    )
}

export async function getStaticProps(){

    const pages = await getAllPages();

    return {
        props: { pages }
    }
}