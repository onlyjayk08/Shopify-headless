import Link from "next/link"


export default function Navbar(  ){

    return (
        <nav className="hidden lg:block text-center">
            <ul className="md:flex items-center justify-center">
                <li>
                    <div className="block p-4 hover:opacity-80">
                        <Link href={"/"}>
                            <a>
                                Home
                            </a>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className="block p-4 hover:opacity-80">
                        <Link href={"/collections"}>
                            <a>
                                Collections
                            </a>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className="block p-4 hover:opacity-80">
                        <Link href={"/products"}>
                            <a>
                                Products 
                            </a>
                        </Link>
                    </div>
                </li>
                <li>
                    <div  className="block p-4 hover:opacity-80">
                        <Link href={"/blogs"}>
                            <a>
                                Blogs
                            </a>
                        </Link>
                    </div>
                </li>
                <li>
                    <div  className="block p-4 hover:opacity-80">
                        <Link href={"/pages"}>
                            <a>
                                CMS Pages
                            </a>
                        </Link>
                    </div>
                </li>
                <li>
                    <div  className="block p-4 hover:opacity-80">
                        <Link href={"/pages/about-us"}>
                            <a>
                                About Us
                            </a>
                        </Link>
                    </div>
                </li>
            </ul>
        </nav>
        
    )
}
  