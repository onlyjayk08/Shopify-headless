import { useState, useEffect } from "react"
import { CustomerAddressDelete } from "../lib/shopify";
import { useRouter } from "next/router";
import $ from "jquery"
import { CustomerUpdateAddress } from "../lib/shopify";

export default function AddressDetails({ customerAccessToken, addressInfo }) {
    const router = useRouter();

    const address = addressInfo.node;
    // console.log(address)

    const [address1, setAddress1] = useState(address.address1);
    const [address2, setAddress2] = useState(address.address2);
    const [city, setCity] = useState(address.city);
    const [country, setCountry] = useState(address.country);
    const [firstName, setFirstName] = useState(address.firstName);
    const [lastName, setLastName] = useState(address.lastName);
    // const [phone, setPhone] = useState("");
    const [province, setProvince] = useState(address.province);
    const [zip, setZip] = useState(address.zip);

    useEffect(() => {
        if (localStorage.accessToken) {

        }
        else {
            router.push('/customer')
        }
    }, [])

    const deleteAddress = async () => {
        console.log("delete address on button click")
        const data = await CustomerAddressDelete(customerAccessToken, address.id);
        console.log(data)
        if (data.deletedCustomerAddressId) {
            router.reload();
        }

    }

    const handleUpdateAddress = async (e) => {
        e.preventDefault();
        const updateAddress = `{
            address1: "${address1}",
            address2: "${address2}",
            city: "${city}",
            country: "${country}",
            firstName: "${firstName}",
            lastName: "${lastName}",
            province: "${province}",
            zip: "${zip}"
        }`

        console.log(updateAddress)

        const data = await CustomerUpdateAddress(updateAddress, customerAccessToken, address.id)
        console.log(data)
        if (data.customerAddress) {
            router.reload();
        }
    }

    const toggleUpdateAddress = () => {
        $(".updateAddressForm").toggle()
    }

    return (
        <div>
            <h1>Address Details</h1>
            <p>Name: {address.name}</p>
            <p>Address: {address.address1} {address.address2}</p>
            <p>City: {address.city}</p>
            <p>Postal Code: {address.zip}</p>
            <p>Province: {address.province}</p>
            <p>Country: {address.country}</p>
            <br />
            <button onClick={deleteAddress}> Delete Address</button>
            <br/>
            <button onClick={toggleUpdateAddress}>Update Address</button>
            <br />
            <div className="updateAddressForm hidden">
                <form onSubmit={handleUpdateAddress}>
                <label className="px-4">First Name</label>
                    <input type="text" placeholder="First Name" name={"firstName"} value={firstName} onChange={(event) => { setFirstName(event.target.value) }}></input>
                    <br />
                    <label className="px-4">Last Name</label>
                    <input type="text" placeholder="Last Name" name={"lastName"} value={lastName} onChange={(event) => { setLastName(event.target.value) }}></input>
                    <br />
                    <label className="px-4">Address1</label>
                    <input type="text" placeholder="Address1" name={"address1"} value={address1} onChange={(event) => { setAddress1(event.target.value) }}></input>
                    <br />
                    <label className="px-4">Address2</label>
                    <input type="text" placeholder="Address2" name={"address2"} value={address2} onChange={(event) => { setAddress2(event.target.value) }}></input>
                    <br />
                    <label className="px-4">City</label>
                    <input type="text" placeholder="City" name={"city"} value={city} onChange={(event) => { setCity(event.target.value) }}></input>
                    <br />
                    <label className="px-4">Zip Code</label>
                    <input type="text" placeholder="Zip Code" name={"zip"} value={zip} onChange={(event) => { setZip(event.target.value) }}></input>
                    <br />
                    <label className="px-4">Province/State</label>
                    <input type="text" placeholder="Province/State" name={'province'} value={province} onChange={(event) => { setProvince(event.target.value) }}></input>
                    <br />
                    <label className="px-4">Country</label>
                    <input type="text" placeholder="Country" name={'country'} value={country} onChange={(event) => { setCountry(event.target.value) }}></input>
                    <br />
                    <button type='submit' className='px-4'>Update</button>
                    <br />
                </form>
            </div>
        </div>
    )
}