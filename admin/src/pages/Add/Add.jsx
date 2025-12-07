import React, { useState, useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {
    const baseUrl = 'http://localhost:4000';
    
    const [image, setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    });
    
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}));
    }

    // Form submission handler - removed debug logging
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', Number(data.price));
            formData.append('category', data.category);
            formData.append('image', image);

            const response = await axios.post(`${baseUrl}/api/food/add`, formData);
            if (response?.data?.success) {
                toast.success('Food item added successfully')
                setData({ name: '', description: '', price: '', category: 'Salad' });
                setImage(false);
            } else {
                toast.error(response?.data?.message || 'Failed to add item')
            }
        } catch (err) {
            console.error(err)
            toast.error('Server error — could not add item')
        }
    }
  return (
    <div className='add'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-image-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor = "image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} name="name" type="text" placeholder='Enter product name' required />
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Enter product description' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} name="price" type="number" placeholder="Enter product price" required />  
                </div>
            </div>
            <button type='submit' className='add-product-btn'>Add Product</button>
        </form>
    </div>
  )
}

export default Add