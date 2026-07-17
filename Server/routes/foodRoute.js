import express from "express";
import multer from "multer";

import {
    addFood,
    listFood,
    removeFood,
    updateFood
} from "../controllers/foodController.js";

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood);

foodRouter.get("/list", listFood);

foodRouter.post("/remove", removeFood);

foodRouter.post("/update", updateFood);

export default foodRouter;