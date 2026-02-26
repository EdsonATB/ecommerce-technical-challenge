import { Router } from "express";
import productController from '../controllers/productController';

const router = Router();

//GET /api/products/categories (List all categories)
router.get('/categories', productController.getCategories);

//GET /api/products | /api/products?category=electronics (get all products or filter by category)
router.get('/', productController.getAll);

//GET /api/products/:id (get by id)
router.get('/:id', productController.getById);

export default router;