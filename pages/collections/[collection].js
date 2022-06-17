import { getAllCollections ,recursiveCollectionCatalog, getCollection, getFilteredCollection } from "../../lib/shopify"
import ProductList from "../../components/ProductList"
import { useState, useEffect } from "react"

export default function CollectionPage({ collection, filterCollection }){

    // const products = collection.products.edges

    const ProductFilters = filterCollection.products.filters

    console.log(ProductFilters)

    const [products, SetProducts] = useState(collection.products.edges)
    const [filters, setFilters] = useState(ProductFilters)

    const [queryFilter, setQueryFilter] = useState([{
      variantOption: {
        name: "Size",
        value: "m"
      }
    },
    {
      productVendor: "Chuzefitness.com"
    }]
    )

    useEffect(async ()=> {
      const filteredCollection =  await getCollection(collection.handle, queryFilter)
      SetProducts(filteredCollection.products.edges)
      console.log("collectionFilter",filteredCollection.products.edges)
    },[queryFilter])

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
                        <li>
                          <input type="checkbox" id={`${filter.label}-${value.label}`} /> 
                          <label for={`${filter.label}-${value.label}`}>{value.label}({value.count})</label>
                        </li>
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
  const filter = {}
  const collection = await getCollection(params.collection, filter)
  const filterCollection = await getFilteredCollection(params.collection)

  return {
    props: {
      collection,
      filterCollection
    }
  }
}