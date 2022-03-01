import { getAllCollections ,recursiveCollectionCatalog, getCollection, getFilteredCollection } from "../../lib/shopify"
import ProductList from "../../components/ProductList"
import { useState } from "react"

export default function CollectionPage({ collection, filterCollection }){

    const products = collection.products.edges

    const ProductFilters = filterCollection.products.filters

    const [filters, setFilters] = useState(ProductFilters)
    const [selectedFilter, setSelectedFilter] = useState();

    const addFilter = () => {

    }

    const fil = (value) =>{
      
    }

    return (
        <div>
          <h1>{collection.title}</h1>
          <p>Filters:</p>
          {filters.map((filter, index)=>(
            <div key={`filter-${index}`}>
              <details data-index={index}>
                <summary>
                  <div>
                    <span>{filter.label}</span>
                  </div>
                  <ul role="list">
                    {filter.values.map((value, i) => (
                      <div key={`filtervalue-${i}`}>
                        <li>{value.label}({value.count})</li>
                      </div>
                    ))}
                  </ul>
                </summary>
              </details>           
            </div>  
          ))}
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
  const filterCollection = await getFilteredCollection(params.collection)

  return {
    props: {
      collection,
      filterCollection
    }
  }
}