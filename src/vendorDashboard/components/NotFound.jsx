import React from 'react'
import {Link} from "react-router-dom"
const NotFound=()=>{
    return (
       <>
             <div className="errorSection">
                    <Link to="/">
                        <button >Go Back</button>
                    </Link>
                <h1>404</h1>
                <div>Page not Found</div>
            </div>
       </>
    )
}
 export default NotFound




 