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
    }).refine(value => /\.(jpg|jpeg|png|gif)$/i.test(value), {
        message: 'El nombre de la imagen no tiene una extensión de archivo válida',
    }),
    productDescription: z.string({
        required_error: 'La descripción del producto es requerida',
    }),
});
