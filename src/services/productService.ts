import axios from 'axios';

const FAKE_STORE_API_URL = process.env.FAKE_STORE_API_URL || 'https://fakestoreapi.com';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}

class ProductService {

    async getAllProducts(): Promise<Product[]> {
        try {
            const response = await axios.get<Product[]>(`${FAKE_STORE_API_URL}/products`);
            return response.data;
        } catch (err) {
            console.error(`Error fetching products ${err}`);
            throw new Error("Failed to fetch products from the FAKE STORE API");
        }
    }

    async getProductById(id: number): Promise<Product | null> {
        try {
            const response = await axios.get<Product>(`${FAKE_STORE_API_URL}/products/${id}`);
            return response.data;
        } catch (err) {
            console.error(`Error fetching product ${id} ${err}`);
            throw new Error("Failed to fetch product from the FAKE STORE API");
        }
    } 

    async getProductsByCategory(category: string): Promise<Product[]> {
        try{
            const response = await axios.get<Product[]>(`${FAKE_STORE_API_URL}/products/category/${category}`)
            return response.data;
        } catch (err) {
            console.error(`Error fetching products by category ${category}. ${err}`);
            throw new Error("Failed to fetch products by category from the FAKE STORE API");       
        }
    }

    async getAllCategories(): Promise<string[]> {
        try{
            const response = await axios.get<string[]>(`${FAKE_STORE_API_URL}/products/categories`);
            return response.data;
        } catch (err) {
            console.error(`Error fetching all categories ${err}`);
            throw new Error("Failed to fetch all categories from the FAKE STORE API");
        }
    }

    async validateProducts(productIds: number[]): Promise<boolean> {
        try{
            const validatePromises = productIds.map((id) => this.getProductById(id));
            const results = await Promise.all(validatePromises);
            const allExist = results.every((product) => product !== null);
            return allExist
        } catch (err) {
            console.error(`Error validating products: ${err}`)
            return false;
        }
    }
}

export default new ProductService();