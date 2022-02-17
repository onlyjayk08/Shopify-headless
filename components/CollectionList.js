import CollectionCard from "./CollectionCard"

export default function CollectionList( {collections} ){
    
    return(
        <div>
            <h1> Collection List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {
                    collections.map(collection =>(
                        <CollectionCard key={collection.node.id} collection={collection.node}/>
                    ))
                }
            </div>
        </div>
    )
}