import { Router } from "express";
import orderController from '../controllers/orderController';

const router = Router();

//POST /api/orders (create new order)
router.post('/', orderController.create);

//GET /api/orders (get all orders)
router.get('/', orderController.getAll);

//GET /api/orders/customer/:customerId/stats (get customer stats)
router.get('/customer/:customerId/stats', orderController.getCustomerStats);

//GET /api/orders/customer/:customerId (get orders by customerId)
router.get('/customer/:customerId', orderController.getByCustomerId);

//GET /api/orders/:id (get order by id)
router.get('/:id', orderController.getById);

export default router;