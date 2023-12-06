import { Request, Response } from 'express';
import bannerClicksService from './productClicks.service';

const getAllProductClicks = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Request received to get all products');
        const products = await bannerClicksService.getAllBannersClic();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getProductClicksByBannerId = async (req: Request, res: Response): Promise<void> => {
    try {
        const bannerId = req.params.bannerId;
        console.log(`Request received to get clicks for banner: ${bannerId}`);
        const clicks = await bannerClicksService.getBannerClicksById(bannerId);
        if (clicks) {
            res.status(200).json({ bannerId, clicks });
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) {
        console.error(`Error fetching clicks for banner ${req.params.bannerId}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export default {
    getAllProductClicks,
    getProductClicksByBannerId,
};
