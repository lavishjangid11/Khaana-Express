import mongoose from 'mongoose';
import dotenv from 'dotenv';
import foodModel from './models/foodModel.js';

dotenv.config();

// Sample food data (matching the frontend assets)
const foodData = [
    {
        name: "Greek salad",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 12,
        image: "food_1.png",
        category: "Salad"
    },
    {
        name: "Veg salad",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 18,
        image: "food_2.png",
        category: "Salad"
    },
    {
        name: "Clover Salad",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 16,
        image: "food_3.png",
        category: "Salad"
    },
    {
        name: "Chicken Salad",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 24,
        image: "food_4.png",
        category: "Salad"
    },
    {
        name: "Lasagna Rolls",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 14,
        image: "food_5.png",
        category: "Rolls"
    },
    {
        name: "Peri Peri Rolls",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 12,
        image: "food_6.png",
        category: "Rolls"
    },
    {
        name: "Chicken Rolls",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 20,
        image: "food_7.png",
        category: "Rolls"
    },
    {
        name: "Veg Rolls",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 15,
        image: "food_8.png",
        category: "Rolls"
    },
    {
        name: "Ripple Ice Cream",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 14,
        image: "food_9.png",
        category: "Deserts"
    },
    {
        name: "Fruit Ice Cream",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 22,
        image: "food_10.png",
        category: "Deserts"
    },
    {
        name: "Jar Ice Cream",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 10,
        image: "food_11.png",
        category: "Deserts"
    },
    {
        name: "Vanilla Ice Cream",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 12,
        image: "food_12.png",
        category: "Deserts"
    },
    {
        name: "Chicken Sandwich",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 12,
        image: "food_13.png",
        category: "Sandwich"
    },
    {
        name: "Vegan Sandwich",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 18,
        image: "food_14.png",
        category: "Sandwich"
    },
    {
        name: "Grilled Sandwich",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 16,
        image: "food_15.png",
        category: "Sandwich"
    },
    {
        name: "Bread Sandwich",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 24,
        image: "food_16.png",
        category: "Sandwich"
    },
    {
        name: "Cup Cake",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 14,
        image: "food_17.png",
        category: "Cake"
    },
    {
        name: "Vegan Cake",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 12,
        image: "food_18.png",
        category: "Cake"
    },
    {
        name: "Butterscotch Cake",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 20,
        image: "food_19.png",
        category: "Cake"
    },
    {
        name: "Sliced Cake",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 15,
        image: "food_20.png",
        category: "Cake"
    },
    {
        name: "Garlic Mushroom",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 14,
        image: "food_21.png",
        category: "Pure Veg"
    },
    {
        name: "Fried Cauliflower",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 22,
        image: "food_22.png",
        category: "Pure Veg"
    },
    {
        name: "Mix Veg Pulao",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 10,
        image: "food_23.png",
        category: "Pure Veg"
    },
    {
        name: "Rice Zucchini",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 12,
        image: "food_24.png",
        category: "Pure Veg"
    },
    {
        name: "Cheese Pasta",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 12,
        image: "food_25.png",
        category: "Pasta"
    },
    {
        name: "Tomato Pasta",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 18,
        image: "food_26.png",
        category: "Pasta"
    },
    {
        name: "Creamy Pasta",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 16,
        image: "food_27.png",
        category: "Pasta"
    },
    {
        name: "Chicken Pasta",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 24,
        image: "food_28.png",
        category: "Pasta"
    },
    {
        name: "Butter Noodles",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 14,
        image: "food_29.png",
        category: "Noodles"
    },
    {
        name: "Veg Noodles",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 12,
        image: "food_30.png",
        category: "Noodles"
    },
    {
        name: "Somen Noodles",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 20,
        image: "food_31.png",
        category: "Noodles"
    },
    {
        name: "Cooked Noodles",
        description: "Food provides essential nutrients for overall health and well-being",
        price: 15,
        image: "food_32.png",
        category: "Noodles"
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB (using same connection logic as server)
        const uri = process.env.MONGO_URI || 'mongodb+srv://KhaanaExpress_db:Lavish262@khaanaexpress.3fgokxv.mongodb.net/?appName=KhaanaExpress';
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB');

        // Clear existing food items
        await foodModel.deleteMany({});
        console.log('🗑️  Cleared existing food items');

        // Insert new food items
        const result = await foodModel.insertMany(foodData);
        console.log(`✅ Successfully added ${result.length} food items to the database`);

        // Close connection
        await mongoose.connection.close();
        console.log('👋 Database connection closed');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
