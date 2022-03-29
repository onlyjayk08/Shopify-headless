const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2022-01/graphql.json`

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query })
  }

  try {
    const data = await fetch(URL, options).then(response => {
      return response.json()
    })

    return data
  } catch (error) {
    throw new Error("Products not fetched")
  }
}

export async function getStoreInfo() {
  const query = `
  {
    shop{
      name
    }
  }`

  const response = await ShopifyData(query);

  const storeinfo = response.data.shop ? response.data.shop : []

  return storeinfo
}

export async function getAllCollections() {
  const query = `
  {
    collections(first: 250){
      edges{
        node{
          handle
          title
          id
          description
          image{
            src
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query);

  const allcollections = response.data.collections.edges ? response.data.collections.edges : []

  return allcollections
}

export async function getAllProducts(first) {
  const query =
    `{
    products(first: ${first}) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 5) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }`

  const response = await ShopifyData(query)

  const slugs = response.data.products ? response.data.products : []

  return slugs
}

export async function getCollection(handle) {
  const query = `
  {
    collection(handle: "${handle}") {
      title
      handle
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const collection = response.data.collection ? response.data.collection : []

  return collection
}

export async function getFilteredCollection(handle) {
  const query = `
  {
    collection(handle: "${handle}") {
      title
      products(first: 250) {
        filters{
          id
          label
          type
          values{
            id
            label
            count
            input
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const filterCollection = response.data.collection ? response.data.collection : []

  return filterCollection
}

export async function getProduct(handle) {
  const query = `
  {
    product(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  totalInventory
                  images(first: 5) {
                    edges {
                      node {
                        originalSrc
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    	}
      id
      title
      handle
      description
      tags
      vendor
      totalInventory
      images(first: 50) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              originalSrc
              altText
            }
            title
            id
            availableForSale
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const product = response.data.product ? response.data.product : []

  return product
}

export async function getAllBlogs() {
  const query = `
  {
    blogs(first:250){
      edges{
        node{
          handle
          title
          articles(first:25){
            edges{
              node{
                handle
                title
                blog{
                  handle
                }
              }
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query);

  const blogs = response.data.blogs.edges ? response.data.blogs.edges : [];

  return blogs;
}

export async function getArticle(blog_handle, handle) {

  const query = `
  {
    blog(handle: "${blog_handle}"){
      articleByHandle(handle: "${handle}"){
        title
        content
        contentHtml
        publishedAt
      }
    }
  }`

  const response = await ShopifyData(query);

  const article = response.data.blog.articleByHandle ? response.data.blog.articleByHandle : []

  return article
}

export async function getAllPages() {
  const query = `
  {
    pages(first: 250){
      edges{
        node{
          id
          handle
          title
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const pages = response.data.pages.edges ? response.data.pages.edges : []

  return pages
}

export async function getPage(handle) {
  const query = `
  {
    page(handle: "${handle}"){
      title
      id
      body
      bodySummary
      createdAt
      updatedAt
    }
  }`

  const response = await ShopifyData(query);

  const page = response.data.page ? response.data.page : []

  return page
}

export async function getCustomer(accessToken) {
  const query = `
  {
    customer(customerAccessToken: "${accessToken}"){
      displayName
      email
      firstName
      lastName
      phone
      createdAt
      updatedAt
      addresses(first:5){
        edges{
          node{
            id
            address1
            address2
            city
            zip
            province
            country
            name
            firstName
            lastName
          }
        }
      }
      orders(first:5){
        edges{
          node{
            id
            name
            orderNumber
            currentTotalPrice{
              amount
            }
            processedAt
            financialStatus
            fulfillmentStatus
            lineItems(first: 20){
              edges{
                node{
                  currentQuantity
                  discountedTotalPrice{
                    amount
                    currencyCode
                  }
                  originalTotalPrice{
                    amount
                    currencyCode
                  }
                  title
                  quantity
                  variant{
                    title
                    sku
                    priceV2{
                      amount
                      currencyCode
                    }
                    selectedOptions{
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query);

  console.log(response)

  const customer = response.data.customer ? response.data.customer : [];

  return customer
}

export async function getCustomerOrder(id){
  const query = `
  {
    node(id: "${id}") {
        ... on Order {
          id
          name
          orderNumber
          currentTotalPrice{
            amount
          }
          processedAt
          financialStatus
          fulfillmentStatus
          shippingAddress{
            address1
            address2
            city
            country
            name
            provinceCode
            zip
          }
          lineItems(first: 20){
            edges{
              node{
                currentQuantity
                discountedTotalPrice{
                  amount
                  currencyCode
                }
                originalTotalPrice{
                  amount
                  currencyCode
                }
                title
                quantity
                variant{
                  title
                  sku
                  priceV2{
                    amount
                    currencyCode
                  }
                  selectedOptions{
                    name
                    value
                  }
                }
              }
            }
          }
        }
    }
  }`

  const response = await ShopifyData(query)

  console.log(response)

  const order = response.data.node ? response.data.node : []

  return order
}

export async function customerAddressCreate(address, customerAccessToken) {
  const query = `
  mutation{
    customerAddressCreate(address: ${address}, customerAccessToken: "${customerAccessToken}"){
      customerAddress{
        id
      }
      customerUserErrors{
        code
        field
        message
      }
    }
  }`

  const response = await ShopifyData(query);

  console.log(response);

  const addAddress = response.data.customerAddressCreate ? response.data.customerAddressCreate : [];

  return addAddress
}

export async function CustomerAddressDelete(customerAccessToken, id){

  const query = `
  mutation{
    customerAddressDelete(customerAccessToken: "${customerAccessToken}", id: "${id}"){
      customerUserErrors{
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }`

  const response = await ShopifyData(query);

  const addressDeleted = response.data.customerAddressDelete ? response.data.customerAddressDelete : [];

  return addressDeleted
}

export async function CustomerUpdateAddress(address, customerAccessToken, id){
  
  const query = `
  mutation{
    customerAddressUpdate(address: ${address}, customerAccessToken: "${customerAccessToken}", id: "${id}"){
      customerUserErrors{
        code
        field
        message
      }
      customerAddress{
        id
      }
    }
  }`

  const response = await ShopifyData(query);
  console.log(response)
  const addressUpdated = response.data.customerAddressUpdate ? response.data.customerAddressUpdate : []

  return addressUpdated
}

export async function createCustomer(input) {

  const query = `
    mutation{
      customerCreate(input: {
        email: "${input.email}", 
        password: "${input.password}",
        firstName: "${input.firstName}",
        lastName: "${input.lastName}",
      }){
        customerUserErrors {
          code
          field
          message
        }
        customer{
          id
        }
      }
    }`

  const response = await ShopifyData(query)

  console.log(response)

  const customer = response.data.customerCreate ? response.data.customerCreate : []

  return customer
}

export async function customerAccessTokenCreate(input) {
  const query = `
  mutation{
    customerAccessTokenCreate(input:{
      email: "${input.email}"
      password: "${input.password}"
    }){
      customerAccessToken{
        accessToken
        expiresAt
      }
      customerUserErrors{
        code
        field
        message
      }
    }
  }`

  const response = await ShopifyData(query);

  console.log(response)

  const token = response.data.customerAccessTokenCreate ? response.data.customerAccessTokenCreate : []

  return token
}

export async function customerRecover(email){
  const query = `
  mutation{
    customerRecover(email: "${email}"){
      customerUserErrors {
        code
        field
        message
      }
    }
  }`

  const response = await ShopifyData(query);

  console.log(response)

  return  (response.data)
}

export async function createCheckout(id, quantity) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`

  const response = await ShopifyData(query)

  const checkout = response.data.checkoutCreate.checkout ? response.data.checkoutCreate.checkout : []

  return checkout
}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map(item => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`
  })

  const query = `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const checkout = response.data.checkoutLineItemsReplace.checkout ? response.data.checkoutLineItemsReplace.checkout : []

  return checkout
}

export async function recursiveProductCatalog(cursor = '', initialRequest = true) {
  let data;

  if (cursor !== '') {
    const query = `{
      products(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;
      console.log('Cursor: ', cursor);

      return data.concat(await recursiveProductCatalog(cursor));
    } else {
      return data;
    }
  } else {
    const query = `{
      products(first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;

      return data.concat(await recursiveProductCatalog(cursor));
    } else {
      return data;
    }
  }
}

export async function recursiveCollectionCatalog(cursor = '', initialRequest = true) {
  let data;

  if (cursor !== '') {
    const query = `{
      collections(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

    const response = await ShopifyData(query);
    data = response.data.collections.edges ? response.data.collections.edges : [];

    if (response.data.collections.pageInfo.hasNextPage) {
      const num = response.data.collections.edges.length;
      const cursor = response.data.collections.edges[num - 1].cursor;
      console.log('Cursor: ', cursor);

      return data.concat(await recursiveCollectionCatalog(cursor));
    } else {
      return data;
    }
  } else {
    const query = `{
      collections(first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `;

    const response = await ShopifyData(query);
    data = response.data.collections.edges ? response.data.collections.edges : [];

    if (response.data.collections.pageInfo.hasNextPage) {
      const num = response.data.collections.edges.length;
      const cursor = response.data.collections.edges[num - 1].cursor;

      return data.concat(await recursiveCollectionCatalog(cursor));
    } else {
      return data;
    }
  }
}

export async function recursiveArticleCatalog(cursor = '', cursor2 = '', initialRequest = true) {
  let data;

  if (cursor !== '') {
    const query = `{
      articles(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            handle
            blog{
              handle
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

    const response = await ShopifyData(query);
    data = response.data.articles.edges ? response.data.articles.edges : [];

    if (response.data.articles.pageInfo.hasNextPage) {
      const num = response.data.articles.edges.length;
      const cursor = response.data.articles.edges[num - 1].cursor;
      console.log('Cursor: ', cursor);

      return data.concat(await recursiveArticleCatalog(cursor));
    } else {
      return data;
    }
  } else {
    const query = `{
      articles(first: 250) {
        edges {
          cursor
          node {
            id
            handle
            blog{
              handle
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `;

    const response = await ShopifyData(query);
    data = response.data.articles.edges ? response.data.articles.edges : [];

    if (response.data.articles.pageInfo.hasNextPage) {
      const num = response.data.articles.edges.length;
      const cursor = response.data.articles.edges[num - 1].cursor;

      return data.concat(await recursiveArticleCatalog(cursor));
    } else {
      return data;
    }
  }
}

export async function recursivePageCatalog(cursor = '', cursor2 = '', initialRequest = true) {
  let data;

  if (cursor !== '') {
    const query = `{
      pages(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

    const response = await ShopifyData(query);
    data = response.data.pages.edges ? response.data.pages.edges : [];

    if (response.data.pages.pageInfo.hasNextPage) {
      const num = response.data.pages.edges.length;
      const cursor = response.data.pages.edges[num - 1].cursor;
      console.log('Cursor: ', cursor);

      return data.concat(await recursivePageCatalog(cursor));
    } else {
      return data;
    }
  } else {
    const query = `{
      pages(first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `;

    const response = await ShopifyData(query);
    data = response.data.pages.edges ? response.data.pages.edges : [];

    if (response.data.pages.pageInfo.hasNextPage) {
      const num = response.data.pages.edges.length;
      const cursor = response.data.pages.edges[num - 1].cursor;

      return data.concat(await recursivePageCatalog(cursor));
    } else {
      return data;
    }
  }
}