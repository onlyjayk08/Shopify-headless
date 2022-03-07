import { recursiveArticleCatalog ,getArticle } from "../../../lib/shopify"

export default function ArticlePage({ article }){

    return (
        <div>
            <h1 className="text-2xl font-bold">{article.title}</h1>
            <div 
            dangerouslySetInnerHTML={{__html: `${article.contentHtml}`}}>
            </div>
            
        </div>
    )
}

export async function getStaticPaths(){
    const articles = await recursiveArticleCatalog();

    const paths = articles.map(item => {
        const article = String(item.node.handle)
        const blogs = String(item.node.blog.handle)

        return {
          params: { blogs, article },
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const article = await getArticle(params.blogs, params.article)
  
    return {
        props: {
            article
        }
    }
}