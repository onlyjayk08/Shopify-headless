import { useRouter } from 'next/router'
import ShopProvider from '../context/shopContext'
import '../styles/globals.css'
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return(
    <ShopProvider>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </ShopProvider>
    
  ) 
}
export default MyApp
