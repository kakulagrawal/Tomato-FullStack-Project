import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add Food
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
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

// List Foods
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

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.log(err);
        });

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