import React, { useState, useEffect } from 'react'

export default function ProductOptions({ name, values, selectedOptions, setOptions, productInventory, selectedVariant }) {
  
  return (
    <fieldset >
      <legend>{name}</legend>
      <div >
        {
          values.map(value => {
            const id = `option-${name}-${value}`
            const checked = selectedOptions[name] === value

            return (
              <label key={id} htmlFor={id}>
                <input
                  type="radio"
                  id={id}
                  name={`option-${name}`}
                  value={value}
                  checked={checked}
                  onChange={() => {
                    setOptions(name, value)
                  }}
                />
                <div>
                  <span>{value}</span>
                </div>
              </label>
            )
          })
        }
      </div>
    </fieldset>
  )
}
