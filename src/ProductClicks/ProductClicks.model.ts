import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

export interface ProductClicks extends Document {
    product_id: string;
    clicks: Record<string, number>;
}

const productClicksSchema = new Schema<ProductClicks>({
    product_id: { type: String, required: true },
    clicks: { type: Map, of: Number }
}, { versionKey: false });

const ProductClicksModel = mongoose.model<ProductClicks>('dateforbanner', productClicksSchema, 'dateforbanner');

const productClicksJoiSchema = Joi.object({
    product_id: Joi.string().required(),
    clicks: Joi.object().pattern(Joi.date().iso(), Joi.number().min(0)).required()
});

export { ProductClicksModel, productClicksJoiSchema };
