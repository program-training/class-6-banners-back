import { Request, Response } from 'express';
import axios from 'axios'
const getAllBanners = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Request received to get all products');
        const response = await axios.get('https://store-back-3.onrender.com/products');
        const products = response.data;
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export default {
    getAllBanners,
 
};
