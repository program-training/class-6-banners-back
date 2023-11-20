import { BannerModel, Banner } from './Banners.model';

const bannerDAL = {
    getAllBanners: async (): Promise<Banner[]> => {
        try {
            return await BannerModel.find();
        } catch (error) {
            throw new Error('Error fetching banners');
        }
    },

    getBannerById: async (_id: string): Promise<Banner | null> => {
        try {
            return await BannerModel.findOne({ _id });
        } catch (error) {
            throw new Error('Error fetching banner by ID');
        }
    },

    createBanner: async (banner: Banner): Promise<Banner> => {
        try {
            return await BannerModel.create(banner);
        } catch (error) {
            throw new Error('Error creating banner');
        }
    },

    updateBanner: async (_id: string, updatedBanner: Banner): Promise<Banner | null> => {
        try {
            return await BannerModel.findOneAndUpdate({ _id }, updatedBanner, { new: true });
        } catch (error) {
            throw new Error('Error updating banner');
        }
    },

    deleteBanner: async (_id: string): Promise<Banner | null> => {
        try {
            return await BannerModel.findOneAndDelete({ _id });
        } catch (error) {
            throw new Error('Error deleting banner');
        }
    }
};

export default bannerDAL;
