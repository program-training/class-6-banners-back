import bannerService from "./banners.service";
import { Banner } from "./Banners.model";

interface QueryResolvers {
    getAllBanners: () => Promise<Banner[]>;
    getBannerById: (_: any, args: { _id: string }) => Promise<Banner | null>;
    getBannersByCategory: (_: any, args: { category: string }) => Promise<Banner[]>;
    getBannersByAuthor: (_: any, args: { author: string }) => Promise<Banner[]>;
    getBannerByProductID: (_: any, args: { productID: string }) => Promise<Banner | null>;
}

interface MutationResolvers {
    createBanner: (_: any, args: { banner: Banner }) => Promise<Banner>;
    updateBanner: (_: any, args: { _id: string, updatedBanner: Banner }) => Promise<Banner | null>;
    deleteBanner: (_: any, args: { _id: string }) => Promise<Banner | null>;
}

const resolvers: { Query: QueryResolvers, Mutation: MutationResolvers } = {
    Query: {
        getAllBanners: () => bannerService.getAllBanners(),
        getBannerById: (_, { _id }) => bannerService.getBannerById(_id),
        getBannersByCategory: (_, { category }) => bannerService.getBannersByCategory(category),
        getBannersByAuthor: (_, { author }) => bannerService.getBannersByAuthor(author),
        getBannerByProductID: (_, { productID }) => bannerService.getBannerByProductID(productID),
    },
    Mutation: {
        createBanner: (_, { banner }) => bannerService.createBanner(banner),
        updateBanner: (_, { _id, updatedBanner }) => bannerService.updateBanner(_id, updatedBanner),
        deleteBanner: (_, { _id }) => bannerService.deleteBanner(_id),
    }
};

export default resolvers;
