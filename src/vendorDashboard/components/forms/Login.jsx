import React,{useState} from 'react'
import { API_PATH } from '../../helpers/ApiPath'

const Login=({showWelcomeHandler})=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const loginHandler=async(e)=>{
        e.preventDefault()

        try {
            const response=await fetch(`${API_PATH}/vendor/login`,
               {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({email,password})
               })
            const data=await response.json()
            if (!response.ok) {
                console.error("Login failed:", data.message || "Unknown error");
                alert(data.message || "Login failed. Please try again.");
                return;
            }

            alert("Login Success");
            localStorage.setItem("loginToken", data.token);
            setPassword('');
            setEmail("");
            showWelcomeHandler();

            const vendorId = data.vendorId;
            if (!vendorId) {
                console.error("Vendor ID is missing from the response");
                return;
            }
            localStorage.setItem("vendorId",vendorId)
            console.log("Checking for vendorId:", vendorId);
            const vendorResponse = await fetch(`${API_PATH}/vendor/single-vendor/${vendorId}`);
            const vendorData = await vendorResponse.json();

            if (!vendorResponse.ok) {
                console.error("Failed to fetch vendor details:", vendorData.message || "Unknown error");
                alert(vendorData.message || "Failed to fetch vendor details.");
                return;
            }

            const vendorFirm= vendorData.firm;
            console.log("Checking for FirmId", vendorFirm);

            if (vendorFirm) {
                localStorage.setItem("firmId",vendorFirm._id);
                localStorage.setItem("firmName",vendorFirm.firmName)
                
            } else {
                console.error("Firm is missing from vendor data");
            }
            window.location.reload()

        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    };


    return (
        <div className="loginSection" >
            <form className="authForm"  onSubmit={loginHandler}>
                <h3>Vendor Login</h3><br/>
                <label>Email</label>
                <input type="text" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}placeholder='Enter your email'/><br/>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your Password'/><br/>
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}
 export default Login