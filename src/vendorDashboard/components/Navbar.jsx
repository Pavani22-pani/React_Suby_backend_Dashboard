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

    // 🚨 Handle Redirection for "TastyGo" Title
    const handleRedirect = () => {
        window.location.href = "http://localhost:5173";
    };

    return (
        <div className="navSection">
            {/* Clickable TastyGo Title */}
            <div className="companyTitle" onClick={handleRedirect} style={{ cursor: "pointer" }}>
                <h2>TastyGo</h2>
            </div>


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
