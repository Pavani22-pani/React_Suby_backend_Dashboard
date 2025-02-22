import React,{useState} from 'react'
import { API_PATH } from '../../helpers/ApiPath'

const AddProduct=()=>{
    const[productName,setProductName]=useState("")
    const[price,setPrice]=useState("")
    const[category,setCategory]=useState([])
    const [bestSeller,setBestSeller]=useState(false)
    const[description,setDescription]=useState("")
    const [image,setImage]=useState(null)

    const handleCategoryChange=(event)=>{
        const value=event.target.value
        if(category.includes(value)){
            setCategory(category.filter((item)=>item!=value))
        }
        else{
            setCategory([...category,value])
        }
    }
    const handleBestSeller=(event)=>{
        const value=event.target.value==="true"
        setBestSeller(value)
    }

    const handleImageUpload=(event)=>{
        const selectedImage=event.target.files[0]
        setImage(selectedImage)
        

    }
    const handleAddProduct=async(e)=>{
        e.preventDefault()
        try {
            const firmId=localStorage.getItem("firmId")
            const loginToken=localStorage.getItem('loginToken')

            if(!loginToken || !firmId){
                console.log("User not authenticated")
                return
            }
            const formData=new FormData()
            formData.append("productName",productName)
            formData.append("price",price)
            formData.append("description",description)
           
            category.forEach(value => formData.append("category", value));

             if (image) {
                formData.append("image", image);  // Ensure "img" matches backend field
            } else {
                console.log("No image selected");
            }
            
            const response=await fetch(`${API_PATH}/product/add-product/${firmId}`,{
                method:"POST",
                body:formData
            })
            const data = await response.json();
            console.log("Response Data:", data);
    
            if (!response.ok) {
                console.error("Server Error:", data);
                alert(`Error: ${data.message || "Failed to add firm"}`);
                return;
            }
    
            alert("Product added successfully");
            setProductName("")
            setPrice("")
            setCategory([])
            setBestSeller(false)
            setDescription("")
            setImage(null)
        } catch (error) {
            alert("Failed to add Product")
        }
    }

    return (
        <div className="productSection">
            <form className="tableForm"  onSubmit={handleAddProduct}>
            <h3>Add Product</h3>
                <label>Product Name</label>
                <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)}/>
                <label>Price</label>
                <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)}/>
                {/* <label>Category</label>
                <input type='text'/> */}
                <div className="checkInp">
                    <label>Category:</label>
                    <div className="inputsContainer">
                        <div className="checkBoxContainer">
                            <label>Veg</label>
                            <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />
                        </div>
                        <div className="checkBoxContainer">
                            <label>Non-Veg</label>
                            <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
                        </div>
                    </div>
                </div>
                {/* <label>Best Seller</label>
                <input type='text'/> */}
                <label>Description</label>
                <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                <div className="checkInp">
                    <label>Best Seller</label>
                    <div className="inputsContainer">
                        <div className="checkBoxContainer">
                            <label>Yes</label>
                            <input type="radio" name="bestSeller" value="true" checked={bestSeller===true}  onChange={handleBestSeller}/>
                        </div>
                        <div className="checkBoxContainer">
                            <label>No</label>
                            <input type="radio" name="bestSeller" value="false" checked={bestSeller===false} onChange={handleBestSeller}/>
                        </div>
                    </div>
                </div>
                
                <label>Image</label>
                <input type='file' onChange={handleImageUpload}/>
                <br/>
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
           </form>
        </div>
    )
}
 export default AddProduct