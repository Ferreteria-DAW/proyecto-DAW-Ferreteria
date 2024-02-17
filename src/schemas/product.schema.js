import { z } from 'zod';

export const createProductSchema = z.object({
    productName: z.string({
        required_error: 'El nombre del producto es requerido',
    }),
    productPrice: z.number({
        required_error: 'El precio del producto es requerido',
    }),
    productImage: z.string({
        required_error: 'La imagen del producto es requerida',
    }),
    productDescription: z.string({
        required_error: 'La descripción del producto es requerida',
    }),
});
