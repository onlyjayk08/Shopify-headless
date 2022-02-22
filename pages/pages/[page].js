import { getPage, recursivePageCatalog } from "../../lib/shopify";

export default function CMSPage({ page }){

    return(
        <div>
            <h2 className="text-2xl font-bold">{page.title}</h2>
            <div 
            dangerouslySetInnerHTML={{__html: `${page.body}`}}>
            </div>
        </div>
    )
}

export async function getStaticPaths(){
    const pages = await recursivePageCatalog();

    const paths = pages.map(item => {
    const page = String(item.node.handle)

        return {
          params: { page },
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const page = await getPage(params.page)
  
    return {
        props: {
            page
        }
    }
}