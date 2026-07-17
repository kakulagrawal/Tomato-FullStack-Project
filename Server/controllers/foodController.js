import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Add Food
const addFood = async (req, res) => {
    try {

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "Tomato_Foods"
        });

        fs.unlinkSync(req.file.path);

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: result.secure_url,
            imagePublicId: result.public_id
        });

        await food.save();

        res.json({
            success: true,
            message: "Food Added"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }
};

// List Food
const listFood = async (req, res) => {
    try {

        const foods = await foodModel.find({});

        res.json({
            success: true,
            data: foods
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }
};

// Remove Food
const removeFood = async (req, res) => {

    try {

        const food = await foodModel.findById(req.body._id);

        if (!food) {
            return res.json({
                success: false,
                message: "Food not found"
            });
        }

        // Delete image from Cloudinary
        if (food.imagePublicId) {
            await cloudinary.uploader.destroy(food.imagePublicId);
        }

        // Delete food document
        await foodModel.findByIdAndDelete(req.body._id);

        res.json({
            success: true,
            message: "Food Removed"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });

    }
};

// Update Food
const updateFood = async (req, res) => {

    try {

        const food = await foodModel.findById(req.body._id);

        if (!food) {
            return res.json({
                success: false,
                message: "Food not found"
            });
        }

        food.name = req.body.name;
        food.description = req.body.description;
        food.category = req.body.category;
        food.price = req.body.price;

        await food.save();

        res.json({
            success: true,
            message: "Food Updated Successfully"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error updating food"
        });

    }
};

export {
    addFood,
    listFood,
    removeFood,
    updateFood
};