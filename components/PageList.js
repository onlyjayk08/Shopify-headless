import Link from "next/link"

export default function PageList({ pages }){

    return (
        <div>
            <h1>Page List</h1>
            {pages.map((page) => (
                <Link key={page.node.id} href={`/pages/${page.node.handle}`}>
                    <a>
                        <li>
                            {page.node.title}
                        </li>
                    </a>
                </Link>
            ))}
        </div>
    )
}