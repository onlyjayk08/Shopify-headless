import { useState } from "react";
import { customerAccessTokenCreate } from "../../lib/shopify";
import Link from "next/link";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accessToken, setAccessToken] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const input = {
            email: email,
            password: password
        }
        const data = await customerAccessTokenCreate(input);
        console.log(data)
        {data.customerAccessToken ? (setAccessToken(data.customerAccessToken.accessToken)) : null}
    }

    return(
        <div>
            <form onSubmit={handleLogin}>
                <label className="px-4">Enter your Email</label>
                <input type="email" id="email" placeholder="Email" name={"email"} value={email} onChange={(event) => { setEmail(event.target.value) }} required />
                <br />
                <label className="px-4">Enter your Password</label>
                <input type="password" id="password" placeholder="Password" name={"password"} value={password} onChange={(event) => setPassword(event.target.value)} required/>                
                <br/>
                <button type="submit" className="px-4">{'Log In'}</button>
            </form>
            <Link href={"/account/register"}>
                <a>
                    or Create an Account
                </a>
            </Link>
            {accessToken ? <p>{accessToken}</p>: <p>error</p>}
        </div>
    )
}