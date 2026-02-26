import { Request, Response } from "express";
import productService from '../services/productService';
import { responseEncoding } from "axios";

class ProductController {
    async getAll(req: Request, res: Response): Promise<void>{
        try{
            const category = req.query.category as string | undefined;

            let products;

            if(category){
                products = await productService.getProductsByCategory(category);
            } else{
                products = await productService.getAllProducts();
            }

            res.status(200).json({
                success: true,
                data: products,
                count: products.length
            })
        }catch (err: any){
            console.error(`Error in getAll. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || 'Failed to fetch products'
            })
        }
    }

    async getById(req: Request, res: Response): Promise<void>{
        try {
            const id = parseInt(req.params.id as string);

            if(isNaN(id)){
                res.status(400).json({
                    success: false,
                    error: 'Invalid Product ID'
                });
                return;
            }

            const product = await productService.getProductById(id);

            if(!product){
                res.status(404).json({
                    success: false,
                    error: 'Product not found',
                });
            }

            res.status(200).json({
                success: true,
                data: product,
            });
        } catch (err: any) {
            console.error(`Error in getById. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || 'Failed to fetch product by id'
            })
        }
    }

    async getCategories(req: Request, res: Response): Promise<void>{
        try {
            const categories = await productService.getAllCategories();

            res.status(200).json({
                success: true,
                data: categories,
                count: categories.length
            });
        } catch (err: any) {
            console.error(`Error in getCategories. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || 'Failed to fetch categories'
            })
        }
    }
}

export default new ProductController();