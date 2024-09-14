import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentUser = query({
    args: {}, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) {
            throw new Error('Not Authenticated');
        }
        const user = await ctx.db.query('user')
            .withIndex('byUserId', (q) => q.eq("user_id", userId.subject))
            .first();

        return user; 
    }
});



export const createUser = internalMutation({
    args: { user_id: v.string(), email: v.string(), name: v.string(), pfp_url: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db.insert("user", {
            user_id: args.user_id,
            email: args.email,
            name: args.name,
            pfp_url: args.pfp_url,
        });
        return user;
    }
});


export const update = internalMutation({
    args: {
        userId: v.string(),
        email: v.string(),
        fullName: v.string(), 
        pfpUrl: v.string(), 

    },
    handler: async (ctx, args) => {
        let existingDoc = await ctx.db.query("user")
        .filter(q => q.eq(q.field("user_id"), args.userId))
        .first();

        const { userId, ...rest } = args; 

        if (!existingDoc) { 
            const newId = await createUser(ctx, {
                user_id: userId,
                email: rest.email,
                name: rest.fullName,
                pfp_url: rest.pfpUrl,
            })
            existingDoc = await ctx.db.query("user")
            .filter(q => q.eq(q.field("_id"), newId))
            .first();
         }

         if(!existingDoc) { throw new Error("User Not Found"); }

        const document = await ctx.db.patch(existingDoc._id, {...rest})

        return document; 
    }
})