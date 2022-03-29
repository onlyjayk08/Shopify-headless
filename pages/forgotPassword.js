import { useState, useEffect } from "react";
import { customerRecover } from "../lib/shopify";

export default function ForgotPassword(){

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await customerRecover(email);
        
        return data
    }

    return (
        <div>
            <h1 className="text-xl bold">Forgot Password</h1>

            <form onSubmit={handleSubmit}>
            <label className="px-4">Enter your Email</label>
                <input type="email" id="email" placeholder="Email" name={"email"} value={email} onChange={(event) => { setEmail(event.target.value) }} required />
                <br />
                <button type="submit" className="px-4">{'Submit'}</button>
            </form>
        </div>
    )
}