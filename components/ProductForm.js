import { useState, useEffect, useContext } from "react"
import { formatter } from '../utils/helpers'
import ProductOptions from "./ProductOptions"
import { CartContext } from "../context/shopContext"
import axios from "axios"
import useSWR from 'swr'

// setup inventory fetcher
const fetchInventory = (url, id) =>
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data)

export default function ProductForm({ product }) {

  const { data: productInventory } = useSWR(
    ['/api/available', product.handle],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  )

  const [available, setAvailable] = useState(true)

  
  const { addToCart } = useContext(CartContext)

  const allVariantOptions = product.variants.edges?.map(variant => {
    const allOptions = {}

    variant.node.selectedOptions.map(item => {
      allOptions[item.name] = item.value
    })

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.originalSrc,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 0
    }
  })

  const defaultValues = {}
  product.options.map(item => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)
  const [variantQuantity, setVariantQuantity] = useState(1)

  function setOptions(name, value) {
    setSelectedOptions(prevState => {
      return { ...prevState, [name]: value }
    })

    const selection = {
      ...selectedOptions,
      [name]: value
    }

    allVariantOptions.map(item => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }


  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(item => item.node.id === selectedVariant.id)

      if (checkAvailable[0].node.availableForSale) {
        setAvailable(true)
      } else {
        setAvailable(false)
      }
    }
  }, [productInventory, selectedVariant])

  const handleQuantityChange = (event) =>{
    setVariantQuantity(event.target.value);
  }

  return (
    <div>
      <h2 >{product.title}</h2>
      {product.vendor ? <p>{product.vendor}</p> : null}
      {product.totalInventory ? <p>Items Left: {product.totalInventory}</p> : null}
      {product.tags? 
      (<div>
        <p className="pb-2">Tags</p>
        {product.tags.map((tag,i) => (
          <span key={`tag-${i}`} className="box-border border rounded bg-gray-200 p-1 mr-3">{tag}</span>
        ))}
      </div>): null
      }
      <span >{formatter.format(selectedVariant.variantPrice)}</span>
      {
        product.options.map(({ name, values }) => (
          <ProductOptions
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            setOptions={setOptions}
            selectedVariant={selectedVariant}
            productInventory={productInventory}
            available={available}
          />
        ))
      }
      <br/>
      <label>
        Quantity
        <input min="1" type="number" defaultValue={variantQuantity} onChange={handleQuantityChange}></input>
      </label>
      <br/>
      {
        available ?
          <button
            onClick={() => {
              addToCart(selectedVariant, variantQuantity)
            }}
            >Add To Card
          </button> :
          <button>
              Sold out!
          </button>
      }
      <div className="pt-5">
        {product.description ?
        (<div>
          <h1>Description</h1>
          <p>{product.description}</p>
        </div>)
        :null
        }
      </div>
    </div>
  )
}
