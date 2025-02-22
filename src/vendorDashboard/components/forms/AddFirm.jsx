import React,{useState} from 'react'
import { API_PATH } from '../../helpers/ApiPath'


const AddFirm = () => {
    const [firmName,setFirmName]=useState("")
    const [area,setArea]=useState("")
    const [category,setCategory]=useState([])
    const [region,setRegion]=useState([])
    const [offer,setOffer]=useState("")
    const [file,setFile]=useState(null)

    const handleCategoryChange=(event)=>{
        const value=event.target.value
        if(category.includes(value)){
            setCategory(category.filter((item)=>item!=value))
        }
        else{
            setCategory([...category,value])
        }
    }
    const handleRegionChange=(event)=>{
        const value=event.target.value
        if(region.includes(value)){
            setRegion(region.filter((item)=>item!=value))
        }
        else{
            setRegion([...region,value])
        }
    }
    const handleImageUpload=(event)=>{
        const selectedImage=event.target.files[0]
        setFile(selectedImage)
        if (file) {
            formData.append("image", file);
        }

    }
    const handleFirmSubmit=async(e)=>{
        e.preventDefault()
        try {

            const vendorId = localStorage.getItem("vendorId");
            if (!vendorId) {
                console.error("Vendor ID not found. Please log in again.");
                alert("Vendor ID missing. Please log in again.");
                return;
            }

            const loginToken=localStorage.getItem('loginToken')
            if(!loginToken){
                console.log("User not authenticated")
                return
            }
            const formData=new FormData()
            formData.append("firmName",firmName)
            formData.append("area",area)
            formData.append("offer",offer)
            formData.append("vendorId", vendorId);
           
            category.forEach(value => formData.append("category", value));
            region.forEach(value => formData.append("region", value));
            
            if (file) {
                formData.append("image", file);  // Ensure "img" matches backend field
            } else {
                console.log("No image selected");
            }
             // ✅ Debug: Check FormData before sending
             console.log("FormData entries:");
             for (let pair of formData.entries()) {
                 console.log(pair[0], pair[1]);
             }

            const response = await fetch(`${API_PATH}/firm/add-firm`, {
                method: "POST",
                headers: { "token": `${loginToken}` }, 
                body: formData,
            });
            
            const data = await response.json();
            console.log("Response Data:", data);
    
            if (!response.ok) {
                console.error("Server Error:", data);
                alert(`Error: ${data.message || "Failed to add firm"}`);
                return;
            }
    
            alert("Firm added successfully");
            setFirmName("")
            setArea("")
            setCategory([])
            setRegion([])
            setOffer("")
            setFile(null)

            // for to add product based on firmid
            const firmId=data.firmId
            localStorage.setItem("firmId",firmId)
            // const vendorResponse = await fetch(`${API_PATH}/vendor/single-vendor/${vendorId}`);
            // const vendorData = await vendorResponse.json();

            // if (!vendorResponse.ok) {
            //     console.error("Failed to fetch vendor details:", vendorData.message || "Unknown error");
            //     alert(vendorData.message || "Failed to fetch vendor details.");
            //     return;
            // }

            // const vendorFirm= vendorData.firm;
            // console.log("Checking for FirmId", vendorFirm);

            // if (vendorFirm) {
            //     localStorage.setItem("firmName",vendorFirm.firmName)
            //     window.location.reload()
                
            // } else {
            //     console.error("Firm is missing from vendor data");
            // }


        } catch (error) {
            console.error("Failed to addd firm",error)
        }

    }
    
    return (
        <div className="firmSection">
            <form className="tableForm"  onSubmit={handleFirmSubmit}>
                <h3>Add Firm</h3>
                <label>Firm Name:</label>
                <input type='text'name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)} />
                <label>Area:</label>
                <input type='text' name='area' value={area} onChange={(e)=>setArea(e.target.value)} />
                {/* <label>Category</label>
                <input type='text'/> */}
                <div className="checkInp">
                    <label>Category:</label>
                    <div className="inputsContainer">
                        <div className="checkBoxContainer">
                            <label>Veg</label>
                            <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>
                        </div>
                        <div className="checkBoxContainer">
                            <label>Non-Veg</label>
                            <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
                        </div>
                    </div>
                </div>
                <label>Offer:</label>
                <input type='text' name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
                <div className="checkInp">
                    <label>Region:</label>
                    <div className="inputsContainer">
                        <div className="regionBoxContainer">
                            <label>South-Indian</label>
                            <input type="checkbox" name='region' value="south-india" checked={region.includes('south-india')} onChange={handleRegionChange}/>
                        </div>
                        <div className="regionBoxContainer">
                            <label>North-Indian</label>
                            <input type="checkbox" name='region' value="north-india" checked={region.includes('north-india')} onChange={handleRegionChange}/>
                        </div>
                        <div className="regionBoxContainer">
                            <label>Chinese</label>
                            <input type="checkbox" name='region' value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange}/>
                        </div>
                        <div className="regionBoxContainer">
                            <label>Bakery</label>
                            <input type="checkbox" name='region' value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange}/>
                        </div>
                    </div>
                </div>
                {/* <label>Region </label>
                <input type='text'/> */}

                <label>Image:</label>
                <input type='file'onChange={handleImageUpload} />
                <br />
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default AddFirm