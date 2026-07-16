import userModel from "../models/userModel.js";

// Add items to cart
const addToCart = async (req, res) => {
    try {
        const userId = req.userId;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({
            success: true,
            message: "Added To Cart"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        });
    }
};

// Remove items from cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({
            success: true,
            message: "Removed From Cart"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        });
    }
};

// Fetch user cart
const getCart = async (req, res) => {
    try {
        const userId = req.userId;

        const userData = await userModel.findById(userId);

        res.json({
            success: true,
            cartData: userData.cartData
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        });
    }
};

export { addToCart, removeFromCart, getCart };