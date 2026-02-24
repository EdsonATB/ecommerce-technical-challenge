import {Request, Response} from 'express';
import customerService from '../services/customerService';

class CustomerController {
    async createOrLogin(req: Request, res: Response): Promise<void>{
        try{
            const {name, email} = req.body;

            if(!name || !email) {
                res.status(400).json({
                    success: false,
                    error: 'Name and email required!',
                });
                return;
            }

            //Regex pra validar formatacao do email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid email!',
                });
                return;
            }

            const customer = await customerService.createOrGetCustomer({name, email});

            res.status(200).json({
                success: true,
                data: customer,
                message: 'Welcome!'
            });
            //any so .message can work
        }catch(err: any){
            console.error(`Error in createOrLogin. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || 'Internal Server Error',
            });
        }
    }

    async getByEmail(req: Request, res: Response): Promise<void> {
        try{
            const email = req.params.email as string;

            const customer = await customerService.getCustomerByEmail(email);

            if(!customer) {
                res.status(400).json({
                    success: false,
                    error: 'customer not found!',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: customer,
            });

        } catch(err: any) {
            console.error(`Error in get by email. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || 'Internal Server Error',
            });
        }
    }

    async getById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id as string);
            
            if(isNaN(id)) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid Customer ID',
                });
                return;
            }

            const customer = await customerService.getCustomerById(id);

            if(!customer){
                res.status(404).json({
                    success: false,
                    error: 'Customer not found',
                });
                return
            }

            res.status(200).json({
                success: true,
                data: customer,
            });
        } catch(err: any) {
            console.error(`Error in getById. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || 'Internal Server Error',
            });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id as string);
            const {name, email} = req.body;

            if(isNaN(id)){
                res.status(400).json({
                    success: false,
                    error: 'Invalid Customer ID',
                });
                return;
            }

            const customer = await customerService.updateCustomer(id, {name, email});

            res.status(200).json({
                success: true,
                data: customer,
                message: 'Customer updated successfully!'
            });
        } catch (err: any) {
            console.error(`Error in update. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || 'Internal Server Error',
            });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id as string);

            if(isNaN(id)){
                res.status(400).json({
                    success: false,
                    error: 'Invalid Customer ID',
                });
                return;
            }

            await customerService.deleteCustomer(id);

            res.status(200).json({
                success: true,
                message: 'customer deleted!'
            });
        } catch (err: any) {
            if (err.message === 'Customer not found') {
                res.status(404).json({
                    success: false,
                    error: 'Customer not found',
                });
            return;
            }
            
            console.error(`Error in delete. ${err}`);
            res.status(500).json({
                success: false,
                error: err.message || 'Internal Server Error',
            });
        }
    }
}

export default new CustomerController();