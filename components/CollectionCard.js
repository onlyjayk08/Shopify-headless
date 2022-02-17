import Image from "next/image";
import Link from "next/link";

export default function CollectionCard({ collection }){
    
    return(
        <div className="md-6">
            <Link href={`/collections/${collection.handle}`}>
                <a>
                    {collection.image ?(
                        <Image
                        src={collection.image.src}
                        width={465}
                        height={365}
                    />
                    ):(<h1>no image</h1>)}
                    <h1>{collection.title}</h1>
                </a>
            </Link>
        </div>
    )
}