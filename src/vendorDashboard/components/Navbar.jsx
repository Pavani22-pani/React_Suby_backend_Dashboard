import React from 'react'

const Navbar=({showLoginHandler,showRegisterHandler,showLogOut,logOutHandler})=>{


    // console.log(showLoginHandler)
    const  firmName=localStorage.getItem("firmName")
    return (
       <div className="navSection">
           
            <div className="company">
                vendor DashBoard
            </div>
            <div className="firmName">
                <h4>Firmname:{firmName}</h4>
            </div>
            <div className="useAuth">
                {!showLogOut ? <>
                    <span onClick={showLoginHandler}>Login/</span>
                    <span onClick={showRegisterHandler}>Register</span>
                </> :   <span onClick={logOutHandler}>Logout</span>}
                
              
            </div>
       </div>
    )
}
 export default Navbar