import { useState } from "react";
import { customerAccessTokenCreate } from "../../lib/shopify";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login(){
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    useEffect(()=>{
        if(localStorage.accessToken){
            const accesstoken = localStorage.accessToken
            console.log(accesstoken)
            router.push('/customer')
        }
    },[])

    const handleLogin = async (e) => {
        e.preventDefault();

        const input = {
            email: email,
            password: password
        }
        const data = await customerAccessTokenCreate(input);
        console.log(data)
        if (data.customerAccessToken) {
            localStorage.setItem("accessToken", data.customerAccessToken.accessToken)
            router.push('/customer')
        }
        {data.customerUserErrors ? (setLoginError(data.customerUserErrors.message)) : null}
    }

    return(
        <div>
            <form onSubmit={handleLogin}>
                {loginError ? {loginError} : null}
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
        </div>
    )
}