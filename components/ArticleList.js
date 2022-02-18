import Link from "next/link"

export default function ArticleList({ articles, blogInfo }){

    return(
        <div>
            {articles.map((article) => (
                <Link key={article.node.id} href={`/${blogInfo.handle}/articles/${article.node.handle}`}>
                    <a>
                        <li>
                            {article.node.title}
                        </li>
                    </a>
                </Link>
            ))}
        </div>
    )
}