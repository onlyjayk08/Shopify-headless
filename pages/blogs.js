import { getBlogs } from "../lib/shopify"
import BlogList from "../components/BlogList";

export default function Blogs({ blogs }){
    
    console.log(blogs)

    return(
        <div>
            <h1>Blogs Page</h1>
            {blogs.map((blog, index) => (
                <BlogList key={`blog-${index}`} blog={blog.node}/>
            ))}
            
        </div>
    )
}

export async function getStaticProps(){
    const blogs = await getBlogs();

    return {
        props: { blogs }
    }
}