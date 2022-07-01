import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddProducts = () => {

    const [formData, setFormData]= useState({
        name:"",
        price:0,
        description:"",
        photos:"",
        category:"",
        stock:0,
        brand:""
    })

    const {name, price, description, photos, category, stock, brand} =formData

    const handleChange=(e)=>{

        const {name, value}=e.target
        setFormData((prevState)=>({
            ...prevState,
            [name]:value,
            //photos:e.target.files[0]
        }))
    }

    const uploadImage=(pics)=>{
        const data=new FormData()
        // for (let i = 0; i < pics.length; i++) {
        //     data.append('files', pics[i]);                      
        // }
            data.append("file",pics)
            data.append("upload_preset","ecommerce")
            data.append("cloud_name", "reddyarun59")
            fetch("https://api.cloudinary.com/v1_1/reddyarun59/image/upload", {
                method:"post",
                body:data
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                setFormData(prevState=>({
                    ...prevState,
                    photos:data.url.toString()
                }))
            }).catch((err)=>{
                console.log(err)
            })

    }

    const handleSubmit=async()=>{
        
        
        try {
            const config={
                header:{
                    "Content-type":"application/json"
                }
            }

            const {data} = await axios.post("/api/v1/admin/product/add", {name, price, description, photos, category, stock, brand}, config)
            console.log(data)
            
        } catch (error) {
            console.log(error);
        }
        // console.log(formData)
    }

    
    

  return (
    <div>
        <div>
            <form>
                <div>
                    <label>Product Name</label>
                    <input type="text" name="name" value={name} onChange={handleChange}/>
                </div>
                <div>
                    <label>Product price</label>
                    <input type="number" name="price" value={price} onChange={handleChange}/>
                </div>
                <div>
                    <label>Product description</label>
                    <input type="text" name="description" value={description} onChange={handleChange}/>
                </div>
                <div>
                    <label>Product photos</label>
                    <input type="file" name="photos" multiple onChange={(e)=>uploadImage(e.target.files[0])} id="photos"/>
                </div>
                <div>
                    <label>Product category</label>
                    <input type="text" name="category" value={category} onChange={handleChange}/>
                </div>
                <div>
                    <label>Product stock</label>
                    <input type="number" name="stock" value={stock} onChange={handleChange}/>
                </div>
                <div>
                    <label>Product brand</label>
                    <input type="text" name="brand" value={brand} onChange={handleChange}/>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddProducts