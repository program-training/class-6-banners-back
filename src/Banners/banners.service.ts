import { BannerModel, Banner } from './Banners.model';

const bannerService = {
    getAllBanners: async (): Promise<Banner[]> => {
        return await BannerModel.find({});
    },
    getBannerById: async (_id: string): Promise<Banner | null> => {
        return await BannerModel.findOne({ _id });
    },
    createBanner: async (banner: Banner): Promise<Banner> => {
        return await BannerModel.create(banner);
    },
    updateBanner: async (_id: string, updatedBanner: Banner): Promise<Banner | null> => {
        return await BannerModel.findOneAndUpdate({ _id }, updatedBanner, { new: true });
    },
    // בשירות
    updateOneBanner: async (_id: string, updatedBanner: any): Promise<Banner | null> => {
        return await BannerModel.findOneAndUpdate({ _id }, { $set: updatedBanner }, { new: true });
    },

    deleteBanner: async (_id: string): Promise<Banner | null> => {
        return await BannerModel.findOneAndDelete({ _id });
    },
    getBannersByCategory: async (category: string): Promise<Banner[]> => {
        return await BannerModel.find({ category });
    },
    getBannersByAuthor: async (author: string): Promise<Banner[]> => {
        return await BannerModel.find({ author: author });
    },

};


export default bannerService;
