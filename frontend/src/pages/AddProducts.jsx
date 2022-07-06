import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddProducts = () => {

    // const [formData, setFormData]= useState({
    //     name:"",
    //     price:0,
    //     description:"",
    //     photos:[],
    //     category:"",
    //     stock:0,
    //     brand:""
    // })

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState("");
    const [photos, setPhotos] = useState([]);
    // const [imagesPreview, setImagesPreview] = useState([]);


    // const handleChange=(e)=>{

    //     const {name, value}=e.target
    //     setFormData((prevState)=>({
    //         ...prevState,
    //         [name]:value,
    //         //photos:e.target.files[0]
    //     }))
    // }

    // const uploadImage=(pics)=>{
    //     const data=new FormData()
    //     // for (let i = 0; i < pics.length; i++) {
    //     //     data.append('files', pics[i]);                      
    //     // }
    //         data.append("file",pics)
    //         data.append("upload_preset","ecommerce")
    //         data.append("cloud_name", "reddyarun59")
    //         fetch("https://api.cloudinary.com/v1_1/reddyarun59/image/upload", {
    //             method:"post",
    //             body:data
    //         })
    //         .then(res=>res.json())
    //         .then(data=>{
    //             console.log(data)
    //             setFormData(prevState=>({
    //                 ...prevState,
    //                 photos:data.url.toString()
    //             }))
    //         }).catch((err)=>{
    //             console.log(err)
    //         })

    // }

    // const handleSubmit=async()=>{
        
        
    //     try {
    //         const config={
    //             header:{
    //                 "Content-type":"application/json"
    //             }
    //         }

    //         const {data} = await axios.post("/api/v1/admin/product/add", {name, price, description, photos, category, stock, brand}, config)
    //         console.log(data)
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     // console.log(formData)
    // }

    const handleSubmit = async(e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        myForm.set("brand", brand);
    
        photos.forEach((image) => {
          myForm.append("photos", image);
        });
        try {
                    const config={
                        header:{
                            "Content-type":"application/json"
                        }
                    }
        
                    const {data} = await axios.post("/api/v1/admin/product/add",myForm , config)
                    console.log(data)
                    
                } catch (error) {
                    console.log(error);
                }

      };

    const uploadImage=e=>{
        const files = Array.from(e.target.files);

        setPhotos([]);

        files.forEach((file) => {
            const reader = new FileReader();
      
            reader.onload = () => {
              if (reader.readyState === 2) {
                setPhotos((old) => [...old, reader.result]);
              }
            };
      
            reader.readAsDataURL(file);
          });
    }

    
    

  return (
    <div>
        <div>
            <form>
                <div>
                    <label>Product Name</label>
                    <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label>Product price</label>
                    <input type="number" name="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div>
                    <label>Product description</label>
                    <input type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>Product photos</label>
                    <input type="file" name="photos" multiple onChange={uploadImage}/>
                </div>
                <div>
                    <label>Product category</label>
                    <input type="text" name="category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                <div>
                    <label>Product stock</label>
                    <input type="number" name="stock" value={stock} onChange={(e)=>setStock(e.target.value)}/>
                </div>
                <div>
                    <label>Product brand</label>
                    <input type="text" name="brand" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddProducts