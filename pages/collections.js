import { getAllCollections } from "../lib/shopify"
import CollectionList from "../components/CollectionList";

export default function Collections({ collections }){

    return(
        <div>
            <h1>Collections Page</h1>
            <CollectionList collections={collections}/>
        </div>
    )
}

export async function getStaticProps(){
    const collections = await getAllCollections();

    return{
        props: { collections }
    }
}