import express from 'express'
import { addProduct, listProduct, removeProduct, listMyProducts,updateProduct } from '../controller/newControllerFounder.js'
import Product from '../model/newModelFounder.js'
import upload from '../middleware/multer.js'
import isAuth from '../middleware/isAuth.js'
let productRoutes = express.Router()
productRoutes.post("/addproduct", isAuth, upload.fields([{ name: "profileImage", maxCount: 1 }]), addProduct)
productRoutes.get("/list", listProduct)
productRoutes.get("/my-startups", isAuth, listMyProducts);
productRoutes.post("/remove/:id", isAuth, removeProduct);
productRoutes.get("/single/:id", isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});
productRoutes.patch(
  "/update/:id",
  isAuth,
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  updateProduct
);
export default productRoutes