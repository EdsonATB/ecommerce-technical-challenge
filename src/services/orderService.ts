import prisma from '../utils/prisma';

export interface OrderItemDTO {
    productId: number;
    productTitle: string;
    productPrice: number;
    productImage: string;
    productQnt: number;
}

export interface CreateOrderDTO {
    customerId: number;
    items: OrderItemDTO[];
}


class OrderService {

    async createOrder(data: CreateOrderDTO) {
        try{
            const itemsWithSubtotal = data.items.map((item) => ({
                productId: item.productId,
                productTitle: item.productTitle,
                productPrice: item.productPrice,
                productImage: item.productImage,
                quantity: item.productQnt,
                subTotal: item.productPrice * item.productQnt
            }))

            const totalPrice = itemsWithSubtotal.reduce((sum,item) => sum + item.subTotal, 0)

            const order = await prisma.order.create({
                data: {
                    customerId: data.customerId,
                    totalPrice: totalPrice,
                    items: {
                        create: itemsWithSubtotal,
                    },
                },
                include: {
                    items: true,
                }
            })

            return order;
        } catch (err){
            console.error(`Error creating order: ${err}`);
            throw new Error("Failed to create new order");
        }
    }

    async getOrderById(id: number) {
        try{
            const order = await prisma.order.findUnique({
                where: {id},
                include: {
                    items: true,
                    customer: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    }
                }
            });
            
            return order;
        } catch(err) {
            console.error(`Error fetching order ${id}. ${err}`);
            throw new Error(`Failed to fetch order`);
        }
    }

    async getOrdersByCustomerId(customerId: number) {
        try {
            const orders = await prisma.order.findMany({
                where: {customerId},
                include: {
                    items: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });

            return orders;
        } catch(err) {
            console.error(`Error fetching orders for this customer ${customerId}. ${err}`);
            throw new Error(`failed to fetch customer orders.`)
        }
    }

    async getAllOrders(){
        try{
            const orders = await prisma.order.findMany({
                include: {
                    items: true,
                    customer: {
                        select:{
                            id: true,
                            name: true,
                            email: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });

            return orders
        }catch(err){
            console.error(`Error fetching all orders. ${err}`);
            throw new Error(`failed to fetch all orders.`)
        }
    }

    async getCustomerStats(customerId: number) {
        try{
            const orders = await prisma.order.findMany({
                where: {customerId},
                select:{
                    totalPrice: true,
                }
            });

            const totalOrders = orders.length;
            const totalSpent = orders.reduce((sum, order) => sum + Number(order.totalPrice), 0);
            const averageValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

            return {
                totalOrders,
                totalSpent,
                averageValue
            };
        } catch(err) {
            console.error(`Error fetching stats for this customer. ${err}`);
            throw new Error(`failed to fetch customer stats.`)
        }
    }
}

export default new OrderService();