
import { ProductClicksModel,ProductClicks } from './ProductClicks.model';

const bannerClicksService = {
    getAllBannersClic: async (): Promise<ProductClicks[]> => {
        return await ProductClicksModel.find({});
    },
    getBannerClicksById: async (bannerId: string): Promise<Map<string, number> | null> => {
        const productClicks = await ProductClicksModel.findOne({ banner_id: bannerId });
        return productClicks ? new Map(Object.entries(productClicks.clicks)) : null;
    }
};



export default bannerClicksService;
