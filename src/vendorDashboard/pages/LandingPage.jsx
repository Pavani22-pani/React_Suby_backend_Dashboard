import React,{useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage=()=>{
    const [showLogin,setShowLogin]=useState(false)
    const [showRegister,setShowRegister]=useState(false)
    const [showFirm,setShowFirm]=useState(false)
    const [showProduct,setShowProduct]=useState(false)
    const[showWelcome,setShowWelcome]=useState(false)
    const [showAllProducts,setShowAllProducts]=useState(false)
    const [showLogOut,setShowLogOut]=useState(false)
    const [showFirmTitle,setShowFirmTitle]=useState(true)
    const [token,setToken]=useState(null)

    useEffect(() => {
        const loginToken = localStorage.getItem("authToken"); // Get token from localStorage
        if (loginToken) {
          setToken(loginToken); // Save it in state
          setShowLogOut(true); // Show logout button if token exists
        
        }
      }, []);
    


    useEffect(()=>{
        const loginToken=localStorage.getItem('loginToken')
        if(loginToken){
            setShowLogOut(true)
            setShowWelcome(true)

        }
    },[])
    useEffect(() => {
        const updateFirmName = () => {
            const firmName = localStorage.getItem("firmName");
            if (firmName) {
                setShowFirmTitle(true);
                setShowFirm(false);
            } else {
                setShowFirmTitle(false);
            }
        };
    
        updateFirmName(); // Run initially
        window.addEventListener("storage", updateFirmName);
    
        return () => {
            window.removeEventListener("storage", updateFirmName);
        };
    }, []);
    const showLoginHandler=()=>{
        setShowLogin(true)
        setShowRegister(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)
    }
    const showRegisterHandler=()=>{
        setShowRegister(true)
        setShowLogin(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)

    }
    const showFirmHandler=()=>{
        if(showLogOut){
            setShowFirm(true)
            setShowRegister(false)
            setShowLogin(false)
            setShowProduct(false)
            setShowWelcome(false)
            setShowAllProducts(false)
        }
        else{
            alert("Please Login")
            setShowLogin(true)
            setShowRegister(false)
        }
      

    }
    const showProductHandler=()=>{
        if(showLogOut){
            setShowProduct(true)
            setShowFirm(false)
            setShowRegister(false)
            setShowLogin(false)
            setShowWelcome(false)
            setShowAllProducts(false)
        }
        else{
            alert("Please Login")
            setShowLogin(true)
            setShowRegister(false)
        }
       

    }
    const showWelcomeHandler=()=>{
        setShowWelcome(true)
        setShowProduct(false)
        setShowFirm(false)
        setShowRegister(false)
        setShowLogin(false)
        setShowAllProducts(false)

    }
    const showAllProductsHandler=()=>{
        if(showLogOut){
            setShowAllProducts(true)
            setShowProduct(false)
            setShowFirm(false)
            setShowRegister(false)
            setShowLogin(false)
            setShowWelcome(false)
        }
        else{
            alert("Please Login")
            setShowLogin(true)
            setShowRegister(false)
        }

    }
    const logOutHandler = () => {
        if (confirm("Are you sure to logout?")) {
            localStorage.removeItem("loginToken");
            localStorage.removeItem("firmId");
            localStorage.removeItem("vendorId");
            localStorage.removeItem("firmName");
            window.dispatchEvent(new Event("storage")); 
            setShowLogOut(false);
            setShowFirmTitle(false);
            setShowLogin(true);  // Redirect user to login after logout
            setShowRegister(false);
            setShowFirm(false);
            setShowProduct(false);
            setShowWelcome(false);
            setShowAllProducts(false);
            window.location.reload()
           
        }
    };
    
    return (
        <>
        <section className="landingSection">
            <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogOut={showLogOut} logOutHandler={logOutHandler}/>

            <div className="collectionSection">
                <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} 
                    showAllProductsHandler={showAllProductsHandler}
                    showFirmTitle={showFirmTitle}/>
                {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
                {showRegister && <Register showLoginHandler={showLoginHandler}/>}
                {showFirm && !showFirmTitle && showLogOut && <AddFirm />}

                {showProduct && showLogOut && <AddProduct/>}
                {showWelcome && <Welcome/>}
                {showAllProducts && showLogOut && <AllProducts />}    
                

            </div>
           


        </section>


        </>
    )
}
 export default LandingPage





// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import Login from '../components/forms/Login';
// import Register from '../components/forms/Register';
// import AddFirm from '../components/forms/AddFirm';
// import AddProduct from '../components/forms/AddProduct';
// import Welcome from '../components/Welcome';
// import AllProducts from '../components/AllProducts';

// const LandingPage = () => {
//     const [showLogin, setShowLogin] = useState(false);
//     const [showRegister, setShowRegister] = useState(false);
//     const [showFirm, setShowFirm] = useState(false);
//     const [showProduct, setShowProduct] = useState(false);
//     const [showWelcome, setShowWelcome] = useState(false);
//     const [showAllProducts, setShowAllProducts] = useState(false);
//     const [showLogOut, setShowLogOut] = useState(false);
//     const [showFirmTitle, setShowFirmTitle] = useState(false);
//     const [token, setToken] = useState(null);

//     // ✅ Combined `useEffect` for token & firmName
//     useEffect(() => {
//         const loginToken = localStorage.getItem('authToken');
//         const firmName = localStorage.getItem("firmName");

//         if (loginToken) {
//             setToken(loginToken);
//             setShowLogOut(true);
//         }

//         if (firmName) {
//             setShowFirmTitle(true);
//             setShowFirm(false);
//         }
//     }, []);

//     // 🔹 Show Handlers
//     const showLoginHandler = () => {
//         setShowLogin(true);
//         setShowRegister(false);
//         setShowFirm(false);
//         setShowProduct(false);
//         setShowWelcome(false);
//         setShowAllProducts(false);
//     };

//     const showRegisterHandler = () => {
//         setShowRegister(true);
//         setShowLogin(false);
//         setShowFirm(false);
//         setShowProduct(false);
//         setShowWelcome(false);
//         setShowAllProducts(false);
//     };

//     const showFirmHandler = () => {
//         if (showLogOut) {
//             setShowFirm(true);
//             setShowRegister(false);
//             setShowLogin(false);
//             setShowProduct(false);
//             setShowWelcome(false);
//             setShowAllProducts(false);
//         } else {
//             alert("Please Login!!!");
//             setShowLogin(true);
//         }
//     };

//     const showProductHandler = () => {
//         if (showLogOut) {
//             setShowProduct(true);
//             setShowFirm(false);
//             setShowRegister(false);
//             setShowLogin(false);
//             setShowWelcome(false);
//             setShowAllProducts(false);
//         } else {
//             alert("Please Login");
//             setShowLogin(true);
//             setShowRegister(false);
//         }
//     };

//     const showWelcomeHandler = () => {
//         setShowWelcome(true);
//         setShowProduct(false);
//         setShowFirm(false);
//         setShowRegister(false);
//         setShowLogin(false);
//         setShowAllProducts(false);
//     };

//     const showAllProductsHandler = () => {
//         if (showLogOut) {
//             setShowAllProducts(true);
//             setShowProduct(false);
//             setShowFirm(false);
//             setShowRegister(false);
//             setShowLogin(false);
//             setShowWelcome(false);
//         } else {
//             alert("Please Login");
//             setShowLogin(true);
//             setShowRegister(false);
//         }
//     };

//     // ✅ Improved Logout Handler
//     const logOutHandler = () => {
//         if (confirm("Are you sure to logout?")) {
//             localStorage.removeItem("authToken");
//             localStorage.removeItem("firmId");
//             localStorage.removeItem("vendorId");
//             localStorage.removeItem("firmName");

//             setShowLogOut(false);
//             setShowFirmTitle(false);

//             // ✅ Redirect to login page or refresh to clear session
//             window.location.href = "/login";
//         }
//     };

//     return (
//         <>
//             <section className="landingSection">
//                 <Navbar
//                     showLoginHandler={showLoginHandler}
//                     showRegisterHandler={showRegisterHandler}
//                     showLogOut={showLogOut}
//                     logOutHandler={logOutHandler}
//                     showFirmTitle={showFirmTitle}
//                 />

//                 <div className="collectionSection">
//                     <Sidebar
//                         showFirmHandler={showFirmHandler}
//                         showProductHandler={showProductHandler}
//                         showAllProductsHandler={showAllProductsHandler}
//                         showFirmTitle={showFirmTitle}
//                     />

//                     {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
//                     {showRegister && <Register showLoginHandler={showLoginHandler} />}
//                     {showFirm && showLogOut && <AddFirm />}
//                     {showProduct && showLogOut && <AddProduct />}
//                     {showWelcome && <Welcome />}
//                     {showAllProducts && showLogOut && <AllProducts />}
//                 </div>
//             </section>
//         </>
//     );
// };

// export default LandingPage;
