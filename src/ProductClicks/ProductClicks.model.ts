import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

export interface ProductClicks extends Document {
    banner_id: string;
    clicks: Record<string, number>;
}

const productClicksSchema = new Schema<ProductClicks>({
    banner_id: { type: String, required: true },
    clicks: { type: Map, of: Number }
}, { versionKey: false });

const ProductClicksModel = mongoose.model<ProductClicks>('dateforbanner', productClicksSchema, 'dateforbanner');

const productClicksJoiSchema = Joi.object({
    banner_id: Joi.string().required(),
    clicks: Joi.object().pattern(Joi.date().iso(), Joi.number().min(0)).required()
});

export { ProductClicksModel, productClicksJoiSchema };
