import React,{useEffect, useState,useffect} from 'react'
import { API_PATH } from '../helpers/ApiPath'

const AllProducts=()=>{
    const [products,setProducts]=useState([])
    
    const productSHandler=async()=>{
        const {firmId}=localStorage.getItem("firmId")
        try {
            const response=await fetch(`${API_PATH}/product/${firmId}/products`)
            const newProductsData=await response.json()
            setProducts(newProductsData.products)
            console.log(newProductsData)

        } catch (error) {
            console.log("failed to fetch products",error)
            alert("failed to fetch products")
        }
    }
    const deleteProductById=async(productID)=>{
        try {
            const response=await fetch(`${API_PATH}/product/${productID}`,{
                method:"DELETE"
            })
            if(response.ok){
                setProducts(products.filter((product)=>product._id!== productID))
                confirm("Are you sure , you want to delete?")
                alert("Product Deletd Successfully!!!!")
            }

        } catch (error) {
            console.log("Failed to delete product")
            alert("Failed to delete product")
        }
    }
    useEffect(()=>{
        productSHandler()
        console.log("this is useEfect")
    },[])
    return (
        <div>
            {!products ?(
                <p>No products added </p>) : (
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Delete</th>
                            </tr>

                        </thead>
                        <tbody>
                            {products.map((item)=>{
                                return(
                                    <>
                                    <tr key={item._id}>
                                        <td>{item.productName}</td>
                                        <td>{item.price}</td>
                                        <td>{item.image &&(
                                            <img src={`${API_PATH}${item.image}`} alt={item.productName} style={{width:"50px",height:"50px"}}/>
                                        )}</td>
                                        <td>
                                            <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                                        </td>
                                    </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
 export default AllProducts