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
        getAllBanners: async () => {
            try {
                console.log('Request received to get all banners');
                const banners = await bannerService.getAllBanners();
                return banners;
            } catch (error) {
                console.error('Error fetching banners:', error);
                throw new Error('Internal server error');
            }
        },
        getBannerById: async (_, args) => {
            try {
                const banner = await bannerService.getBannerById(args._id);
                if (!banner) {
                    throw new Error('Banner not found');
                }
                return banner;
            } catch (error) {
                console.error('Error fetching banner by ID:', error);
                throw new Error('Internal server error');
            }
        },
        getBannersByCategory: async (_, args) => {
            try {
                const banners = await bannerService.getBannersByCategory(args.category);
                if (banners.length === 0) {
                    throw new Error('No banners found in this category');
                }
                return banners;
            } catch (error) {
                console.error('Error fetching banners by category:', error);
                throw new Error('Internal server error');
            }
        },
        getBannersByAuthor: async (_, args) => {
            try {
                const banners = await bannerService.getBannersByAuthor(args.author);
                if (banners.length === 0) {
                    throw new Error('No banners found for this author');
                }
                return banners;
            } catch (error) {
                console.error('Error fetching banners by author:', error);
                throw new Error('Internal server error');
            }
        },
        getBannerByProductID: async (_, args) => {
            try {
                const banner = await bannerService.getBannerByProductID(args.productID);
                if (!banner) {
                    throw new Error('Banner not found with the given product ID');
                }
                return banner;
            } catch (error) {
                console.error('Error fetching banner by product ID:', error);
                throw new Error('Internal server error');
            }
        },
    },
    Mutation: {
        createBanner: async (_, args) => {
            try {
                const newBanner = await bannerService.createBanner(args.banner);
                return newBanner;
            } catch (error) {
                console.error('Error creating banner:', error);
                throw new Error('Internal server error');
            }
        },
        updateBanner: async (_, args) => {
            try {
                const updatedBanner = await bannerService.updateBanner(args._id, args.updatedBanner);
                if (!updatedBanner) {
                    throw new Error('Banner not found');
                }
                return updatedBanner;
            } catch (error) {
                console.error('Error updating banner:', error);
                throw new Error('Internal server error');
            }
        },
        deleteBanner: async (_, args) => {
            try {
                const deletedBanner = await bannerService.deleteBanner(args._id);
                if (!deletedBanner) {
                    throw new Error('Banner not found');
                }
                return deletedBanner;
            } catch (error) {
                console.error('Error deleting banner:', error);
                throw new Error('Internal server error');
            }
        },
    }
};

export default resolvers;
