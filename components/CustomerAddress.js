import { useState } from 'react'
import { customerAddressCreate } from '../lib/shopify';
import AddressDetails from './CustomerAddressDetail';
import { useRouter } from "next/router";
import $ from "jquery"

export default function CustomerAddress({ customerAccessToken, addresses }) {

    const router = useRouter();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [phone, setPhone] = useState("");
    const [province, setProvince] = useState("");
    const [zip, setZip] = useState("");

    const handleAddAddress = async (e) => {
        e.preventDefault();

        const address = `{
            address1: "${address1}",
            address2: "${address2}",
            city: "${city}",
            country: "${country}",
            firstName: "${firstName}",
            lastName: "${lastName}",
            province: "${province}",
            zip: "${zip}"
        }`

        console.log(address)
        const data = await customerAddressCreate(address, customerAccessToken)
        console.log(data)

        if (data.customerAddress) {
            router.reload();
        }
    }

    const toggleAddAddress = () => {
        $(".addAddressForm").toggle()
    }

    return (
        <div>
            <button id="addAddress" onClick={toggleAddAddress}> Add Address </button>
            <div className="addAddressForm hidden">
                <h2 className='text-2xl bold p-5'> Add Address</h2>
                <form onSubmit={handleAddAddress}>
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
                    <button type='submit' className='px-4'>Add Address</button>
                    <br />
                </form>
            </div>
            <h2 className='text-2xl bold p-5'> Address List</h2>
            {addresses.map((address, i) => (
                <div key={i}>
                    <h3 className='text-xl pt-4'>Address {i + 1}</h3>
                    <AddressDetails addressInfo={address} customerAccessToken={customerAccessToken} />
                </div>
            ))}
        </div>
    )
}