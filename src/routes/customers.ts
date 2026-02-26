import { Router } from "express";
import customerController from '../controllers/customerController';

const router = Router();

//POST /api/customers (Create or Login)
router.post('/', customerController.createOrLogin);

//GET /api/customers/:email (Search by email)
router.get('/:email', customerController.getByEmail);

//GET /api/customers/:id (Search by Id)
router.get('/id/:id', customerController.getById);

//PUT /api/customers/:id (Update customer)
router.put('/:id', customerController.update);

//DELETE /api/customers/:id (Delete :) )
router.delete('/:id', customerController.delete);

export default router;