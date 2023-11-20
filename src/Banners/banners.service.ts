import { BannerModel, Banner } from './Banners.model';

const bannerService = {
    getAllBanners: async (): Promise<Banner[]> => BannerModel.find({}),
    getBannerById: async (_id: string): Promise<Banner | null> => BannerModel.findOne({ _id }),
    createBanner: async (banner: Banner): Promise<Banner> => BannerModel.create(banner),
    updateBanner: async (_id: string, updatedBanner: Banner): Promise<Banner | null> =>
        BannerModel.findOneAndUpdate({ _id }, updatedBanner, { new: true }),
    deleteBanner: async (_id: string): Promise<Banner | null> => BannerModel.findOneAndDelete({ _id }),
};

export default bannerService;
