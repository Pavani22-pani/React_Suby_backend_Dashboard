import React,{useState} from 'react'
import { API_PATH } from '../../helpers/ApiPath'

const Register=({showLoginHandler})=>{
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        try {
            const response = await fetch(`${API_PATH}/vendor/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                console.error("Error:", data);
                setError(data.message || "Something went wrong!");
                alert(`Registration Failed: ${data.message || "Invalid request"}`);
                return;
            }
    
            console.log(data);
            alert("Vendor registered Successfully");
            setUsername("");
            setEmail("");
            setPassword("");
            showLoginHandler()

    
        } catch (error) {
            console.error("Network error:", error);
            setError("Server is unreachable. Try again later.");
            alert("Network Error! Check console for details.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="registerSection" >
             <form className="authForm" onSubmit={handleSubmit}>
                <h3>Vendor Register</h3><br/>
                <label>Username</label>
                <input type="text" placeholder='Enter your name' name='username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/><br/>
                <label>Email</label>
                <input type="text" placeholder='Enter your email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br/>
                <label>Password</label>
                <input type="password" placeholder='Enter your Password' name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/>
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>

    )
}
 export default Register