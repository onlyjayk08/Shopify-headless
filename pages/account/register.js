import { useState } from "react";
import { createCustomer } from "../../lib/shopify";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register(){
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, SetFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const input = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            // fomatined using E.164 standard 
            // phone: phone
        }
        const data = await createCustomer(input)
        console.log(data)
        if (data.customer){
            router.push('/account/login')
        }
    };

    return(
        <div>
             <form onSubmit={handleSubmit}>
                <label className="px-4">Enter your First Name</label>
                <input type="text" id="first" placeholder="First Name" name={"firstName"} onChange={(event) => { SetFirstName(event.target.value) }}></input>
                <br />
                <label className="px-4">Enter your Last Name</label>
                <input type="text" id="last" placeholder="Last Name" name={"lastName"} onChange={(event) => { setLastName(event.target.value) }}></input>
                <br />
                <label className="px-4">Enter your Email</label>
                <input type="email" id="email" placeholder="Email" name={"email"} value={email} onChange={(event) => { setEmail(event.target.value) }} required />
                <br />
                <label className="px-4">Enter your Password</label>
                <input type="password" id="password" placeholder="Password" name={"password"} value={password} onChange={(event) => setPassword(event.target.value)} required/>
                <br />
                {/* not working for now think it is beacuse of the W. 164 standard formating */}
                {/* <label>Enter your Phone number</label>
                <input type="number" id="phone" placeholder="Phone Number" name={"phone"} value={phone} onChange={(event) => setPhone(event.target.value)}></input>
                <br /> */}
                <button type="submit" className="px-4">{'Sign up'}</button>
            </form>
            <Link href={"/account/login"}>
                <a>
                    or Login
                </a>
            </Link>
        </div>
    )
}