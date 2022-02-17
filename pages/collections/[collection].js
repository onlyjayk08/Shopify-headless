import { getAllCollections ,recursiveCollectionCatalog, getCollection } from "../../lib/shopify"
import ProductList from "../../components/ProductList"

export default function CollectionPage({ collection, router }){

    const products = collection.products.edges

    return (
        <div>
            <h1>{collection.title}</h1>
            <ProductList products={products}/>
        </div>
    )
}

  
export async function getStaticPaths() {
    const collections = await recursiveCollectionCatalog()
  
    const paths = collections.map(item => {
      const collection = String(item.node.handle)
  
      return {
        params: { collection }
      }
    })
  
    return {
      paths,
      fallback: false
    }
  }
  
  export async function getStaticProps({ params }) {
    const collection = await getCollection(params.collection)
  
    return {
      props: {
        collection
      }
    }
  }