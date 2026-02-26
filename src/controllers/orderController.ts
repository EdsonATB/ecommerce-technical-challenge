import { Request, Response } from "express";
import orderService from '../services/orderService';
import customerService from '../services/customerService';

class OrderController {
    async create(req: Request, res: Response): Promise<void> {
        try {

            const { customerId, items } = req.body;

            if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
                res.status(400).json({
                    success: false,
                    error: 'customerId and items array are required'
                });
                return;
            }

            const customer = await customerService.getCustomerById(customerId);

            if (!customer) {
                res.status(400).json({
                    success: false,
                    error: 'Customer not found'
                });
            }

            for (const item of items) {
                if (
                    !item.productId ||
                    !item.productTitle ||
                    !item.productPrice ||
                    !item.productImage ||
                    !item.quantity ||
                    item.quantity <= 0
                ) {
                    res.status(400).json({
                        success: false,
                        error: 'Invalid item format. Each item must have productId, productTitle, productPrice, productImage, and quantity > 0',
                    });
                    return;
                }
            }

            //Criar
            const order = await orderService.createOrder({customerId, items});

            res.status(201).json({
                success: true,
                data: order,
                message: 'Order created successfully!!'
            });

        } catch (err: any) {
            console.error(`Error in creating order. ${err}`);
            
            if(err.messsage === 'Customer not found'){
                res.status(404).json({
                    success: false,
                    error: 'Customer not Found',
                });
                return;
            }

            res.status(500).json({
                success: false,
                error: err.message || 'Failed to create order'
            });
        }
    }

    async getById(req: Request, res: Response): Promise<void>{
        try {
            const id = parseInt(req.params.id as string);

            if (isNaN(id)){
                res.status(404).json({
                    success: false,
                    error: 'Invalid order Id'
                });
                return;
            }

            const order = await orderService.getOrderById(id);

            if(!order){
                res.status(404).json({
                    success: false,
                    error: 'Order not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: order,
            });
        } catch (err: any) {
            console.error(`Error in getById. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || "Failed to fetch order"
            });
        }
    }

    async getByCustomerId(req: Request, res: Response): Promise<void>{
        try {
            const customerId = parseInt(req.params.customerId as string);

            if (isNaN(customerId)){
                res.status(400).json({
                    success: false,
                    error: 'Invalid customer Id'
                });
                return;
            }

            const customer = await customerService.getCustomerById(customerId);
            if(!customer){
                res.status(404).json({
                    success: false,
                    error: 'Customer not found.'
                });
                return;
            }

            const orders = await orderService.getOrdersByCustomerId(customerId);


            res.status(200).json({
                success: true,
                data: orders,
                count: orders.length
            });
        } catch (err: any) {
            console.error(`Error in getByCustomerId. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || 'Failed to fetch customer orders'
            });
        }
    }

    async getAll(req: Request, res: Response): Promise<void>{
        try {
            const orders = await orderService.getAllOrders();

            if(!orders){
                res.status(400).json({
                    success: false,
                    error: 'Failed fetching all orders'
                })
            }

            res.status(200).json({
                success: true,
                data: orders,
                count: orders.length
            })
        } catch (err: any) {
            console.error(`Error in getAll. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || 'Failed to fetch all orders'
            });
        }
    }

    async getCustomerStats(req: Request, res: Response): Promise<void>{
        try {
            const customerId = parseInt(req.params.id as string);

            if(isNaN(customerId)){
                res.status(400).json({
                    success: false,
                    error: 'Invalid customer Id'
                });
                return;
            }

            const customer = await customerService.getCustomerById(customerId);

            if(!customer){
                res.status(404).json({
                    success: false,
                    error: 'Customer not found'
                });
                return;
            }

            const stats = await orderService.getCustomerStats(customerId);

            res.status(200).json({
                success: true,
                data: stats
            })
        } catch (err: any) {
            console.error(`Error in getCustomerStats. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || 'Failed to fetch customer stats'
            });
        }
    }
}

export default new OrderController();