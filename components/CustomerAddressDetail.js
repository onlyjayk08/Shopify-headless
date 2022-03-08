export default function AddressDetails({ addressInfo }){
    
    const address = addressInfo.node;
    console.log(address)

    return(
        <div>
            <h1>Address Details</h1>
            <p>Name: {address.name}</p>
            <p>Address: {address.address1} {address.address2}</p>
            <p>City: {address.city}</p>
            <p>Postal Code: {address.zip}</p>
            <p>Province: {address.province}</p>
            <p>Country: {address.country}</p>
        </div>
    )
}