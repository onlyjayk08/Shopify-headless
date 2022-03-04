import { useState, useEffect } from "react"
import { createCustomer } from "../lib/shopify";

export default function accounts() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, SetFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("")

    const handleSubmit = (e) => {
        
        e.preventDefault();

        const input = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            // fomatined using E.164 standard 
            // phone: phone
        }

        const data = createCustomer(input)
        console.log(data)
    };

    useEffect(() => {

    }, [])

    return (
        <div>
            <h1>Account Page</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter your First Name</label>
                <input type="text" id="first" placeholder="First Name" name={"firstName"} onChange={(event) => { SetFirstName(event.target.value) }}></input>
                <br />
                <label>Enter your Last Name</label>
                <input type="text" id="last" placeholder="Last Name" name={"lastName"} onChange={(event) => { setLastName(event.target.value) }}></input>
                <br />
                <label>Enter your Email</label>
                <input type="email" id="email" placeholder="Email" name={"email"} value={email} onChange={(event) => { setEmail(event.target.value) }} required />
                <br />
                <label>Enter your Password</label>
                <input type="password" id="password" placeholder="Password" name={"password"} value={password} onChange={(event) => setPassword(event.target.value)} required/>
                <br />
                {/* not working for now think it is beacuse of the W. 164 standard formating */}
                {/* <label>Enter your Phone number</label>
                <input type="number" id="phone" placeholder="Phone Number" name={"phone"} value={phone} onChange={(event) => setPhone(event.target.value)}></input>
                <br /> */}
                <button type="submit">{'Sign up'}</button>
            </form>
        </div>
    )
}