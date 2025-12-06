import z from "zod";

export const userSchema = z.object({
    name: z.string().min(3).max(15),
    email: z.string(),
    password:z.string()
});

export const signinSchema = z.object({
    username: z.string().min(3).max(15),
    password: z.string()
})

export const createRoomSchema = z.object({
    name: z.string().min(3).max(15)
})
