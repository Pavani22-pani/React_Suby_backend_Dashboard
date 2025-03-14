// import React from 'react'

// const Navbar=({showLoginHandler,showRegisterHandler,showLogOut,logOutHandler})=>{


//     // console.log(showLoginHandler)
//     const  firmName=localStorage.getItem("firmName")
//     return (
//        <div className="navSection">

//             <div className="company">
//                 vendor DashBoard
//             </div>
//             <div className="firmName">
//                 <h4>Firmname:{firmName}</h4>
//             </div>
//             <div className="useAuth">
//                 {!showLogOut ? <>
//                     <span onClick={showLoginHandler}>Login /</span>
//                     <span onClick={showRegisterHandler}>Register</span>
//                 </> :   <span onClick={logOutHandler}>Logout</span>}


//             </div>
//        </div>
//     )
// }
//  export default Navbar

import React, { useState, useEffect } from 'react';

const Navbar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler }) => {
    const [firmName, setFirmName] = useState(localStorage.getItem("firmName") || "");

    // 🚨 Listen for changes in `firmName` in localStorage
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "firmName") {
                setFirmName(event.newValue);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <div className="navSection">
            <div className="companyTitle">
                    <h2>TastyGo</h2>
              
            </div>
            <div className="company">Vendor Dashboard</div>
            

            <div className="firmName">
                <h4>Firm Name: {firmName || ""}</h4>
            </div>

            <div className="useAuth">
                {!showLogOut ? (
                    <>
                        <span onClick={showLoginHandler}>Login /</span>
                        <span onClick={showRegisterHandler}>Register</span>
                    </>
                ) : (
                    <span onClick={logOutHandler}>Logout</span>
                )}
            </div>
        </div>
    );
};

export default Navbar;
