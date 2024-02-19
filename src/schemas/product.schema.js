import { z } from 'zod';

export const createProductSchema = z.object({
    productName: z.string({
        required_error: 'El nombre del producto es requerido',
    }),
    productPrice: z.number({
        required_error: 'El precio del producto es requerido',
    }),
    productDescription: z.string({
        required_error: 'La descripción del producto es requerida',
    }),
});

// .refine(value => /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(value), {
//     message: 'El nombre de la imagen no tiene una extensión de archivo válida',
// }),

// ,productImage: z.union([
//     z.string(), // La ruta de la imagen almacenada
//     z.object({ // Datos de la imagen si se envía un nuevo archivo
//         filename: z.string(),
//         mimetype: z.string(),
//         size: z.number(),
//         // Puedes agregar más validaciones aquí si es necesario
//     })
// ]),
