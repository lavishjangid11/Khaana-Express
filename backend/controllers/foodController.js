import foodModel from '../models/foodModel.js';
import fs from 'fs';

// add food item

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    })
    try{
        await food.save();
        res.json({success: true, message: "Food item added successfully"});
    } catch (error){
        console.log(error);
        res.json({success: false, message: "Error while adding food item"});
    }
}

// add food list
const listFood = async (req, res) => {
    try{
        const foods =  await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error while fetching food list" });
    }
}

// remove food item (optional)

const removeFood = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        if (food && food.image) {
            // delete image file if exists
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.warn('Failed to remove image file:', err.message);
            });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food item removed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error while removing food item" });
    }
}
export {addFood, listFood, removeFood}