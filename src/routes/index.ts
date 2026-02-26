import { Router } from 'express';
import customerRoutes from './customers';
import productRoutes from './products';
import orderRoutes from './orders';

const router = Router();

//endpoint to verify if api is running
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Api is running!',
        timestamp: new Date().toISOString()
    });
});

//Customer Routes
router.use('/customers', customerRoutes);

//Product Routes
router.use('/prodcuts', productRoutes);

//Order Routes
router.use('/orders', orderRoutes);

export default router;