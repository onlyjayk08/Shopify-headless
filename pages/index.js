import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getCollection } from '../lib/shopify'
import ImageSlider from '../components/SlickSlider'
import { SliderData } from '../components/SliderData'
import FeaturedCollection from '../components/FeaturedCollection'

export default function Home( { collection } ) {

  const products = collection.products.edges

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopify Headless</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='pb-10'>
        <ImageSlider sliderData={SliderData}/>
      </div>
      <FeaturedCollection products={products}/>
    </div>
  )
}

export async function getStaticProps() {
  const collection = await getCollection("our-most-popular-products");
  return {
    props: { collection },
  }
}
