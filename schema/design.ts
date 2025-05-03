import { z } from "zod";


export enum Category {
    LOGO = "LOGO",
    PHOTO = "PHOTO",
    YOUTUBE_THUMBNAIL = "YOUTUBE_THUMBNAIL"
  }

export const DesignSchema = z.object({
    id: z.string().cuid(),
    userId: z.string().min(1, 'User ID required'),
    name: z.string().min(1, 'Name required'),
    canvasData: z.string().min(1, 'Canvas Data required').nullable(),
    width: z.number().min(1, 'width required'),
    height: z.number().min(1, 'height required'),
    category: z.nativeEnum(Category),
    createdAt: z.date(),
    updatedAt: z.date()
})

export type TDesignSchema = z.infer<typeof DesignSchema>

export const CreateDesignSchema = DesignSchema.pick({
    name: true,
    canvasData: true,
    width: true,
    height: true,
    category: true,
}).extend({
    width: z.coerce.number(),
    height: z.coerce.number(),
})

export const ParamsDesignSchema = DesignSchema.pick({
    id:true
})

export type TCreateDesignSchema = z.infer<typeof CreateDesignSchema>

export const UpdateDesignSchema = CreateDesignSchema.pick({
    name: true,
    canvasData: true,
    width: true,
    height: true,
    category: true,
}).extend({
    width: z.coerce.number(),
    height: z.coerce.number(),
})

export type TUpdateDesignSchema = z.infer<typeof UpdateDesignSchema>

export const CreateOrUpdateDesignSchema = DesignSchema.pick({
    id: true,
    name: true,
    canvasData: true,
    width: true,
    height: true,
    category: true,
}).extend({
    width: z.coerce.number(),
    height: z.coerce.number(),
})
.partial({
    id:true
})

export type TCreateOrUpdateDesignSchema = z.infer<typeof CreateOrUpdateDesignSchema>


export const DeleteDesignSchema = DesignSchema.pick({
    id:true
})