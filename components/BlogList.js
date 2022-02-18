import ArticleList from "./ArticleList";

export default function BlogList({ blog }){

    const articles = blog.articles.edges

    return(
        <div>
            <h1>{blog.title}</h1>
            <ArticleList articles={articles} blogInfo={blog}/>
        </div>
    )
}