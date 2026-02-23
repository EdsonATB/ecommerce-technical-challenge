import prisma from '../utils/prisma';

export interface CreateCustomerDTO {
    name: string;
    email: string;
}
class CustomerService {
    async createOrGetCustomer(data: CreateCustomerDTO) {
        try {
            const existingCustomer = await prisma.customer.findUnique({
                where: {email: data.email},
            });

            if(existingCustomer) {
                return existingCustomer
            };

            const newCustomer = await prisma.customer.create({
                data: {
                    name: data.name,
                    email: data.email
                }
            });
            return newCustomer;
        } catch (err) {
            console.error(`Error creating/getting a customer: ${err}`);
            throw new Error("Failed to create or get a new customer.");
        }
    }

    async getCustomerByEmail(email: string) {
        try{
            const customer = await prisma.customer.findUnique({
                where: {email}
            })
            return customer
        } catch (err){
            console.error(`Error fetching customer with email: ${email}. ${err}`);
            throw new Error(`Failed to fetch customer by Email`)
        }
    }

    async getCustomerById(id: number)   {
        try{
            const customer = prisma.customer.findUnique({
                where: {id}
            });
            return customer
        } catch (err){
            console.error(`Error fetching customer by Id: ${id}. ${err}`);
            throw new Error(`Failed to fetch customer by Id`)
        }
    }

    async updateCustomer(id: number, data: Partial<CreateCustomerDTO>) {
        try{
            const updatedCustomer = await prisma.customer.update({
                where: {id},
                data
            });
            return updatedCustomer
        } catch (err){
            console.error(`Error updating customer ${id}. ${err}`);
            throw new Error(`Failed to update customer`);
        }
    }

    async deleteCustomer(id: number): Promise<void> {
        try{
            await prisma.customer.delete({
                where: {id}
            });
        }catch (err){
            console.error(`Error deleting customer by Id: ${id}. ${err}`);
            throw new Error(`Failed to delete customer.`);
        }
    }
}

export default new CustomerService();