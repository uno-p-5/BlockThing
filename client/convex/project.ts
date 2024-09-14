import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentProject = query({
    args: { projectId: v.string() }, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) {
            throw new Error('Not Authenticated');
        }
        const proj = await ctx.db.query('project')
            .filter((q) => q.eq("_id", args.projectId))
            .first();

        return proj; 
    }
});



export const createProject = mutation({
    args: { name: v.string(), description: v.string() },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) {
            throw new Error('Not Authenticated');
        }

        const proj = await ctx.db.insert("project", {
            creator: userId.subject,
            name: args.name,
            description: args.description,
            shared_users: [],
        });
        return proj;
    }
});



export const getProjectsByIds = query({
    args: { projectIds: v.array(v.string()) }, // Takes an array of project IDs
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) {
          throw new Error('Not Authenticated');
        }
    
        // If no project IDs are provided, return an empty array
        if (args.projectIds.length === 0) {
          return [];
        }
    
        // Loop through the projectIds and fetch each project individually
        const projects = [];
        for (const projectId of args.projectIds) {
          const project = await ctx.db.query('project')
            .filter((q) => q.eq(q.field("_id"), projectId))
            .first();
    
          if (project) {
            projects.push(project);
          }
        }
    
        return projects;
    }
});


// export const update = internalMutation({
//     args: {
//         user_id: v.string(),
//         email: v.string(),
//         name: v.string(), 
//         pfp_url: v.string(), 

//     },
//     handler: async (ctx, args) => {
//         let existingDoc = await ctx.db.query("user")
//         .filter(q => q.eq(q.field("user_id"), args.user_id))
//         .first();

//         const { user_id, ...rest } = args; 

//         if (!existingDoc) { 
//             const newId = await createUser(ctx, {
//                 user_id: user_id,
//                 email: rest.email,
//                 name: rest.name,
//                 pfp_url: rest.pfp_url,
//             })
//             existingDoc = await ctx.db.query("user")
//             .filter(q => q.eq(q.field("_id"), newId))
//             .first();
//          }

//          if(!existingDoc) { throw new Error("User Not Found"); }

//         const document = await ctx.db.patch(existingDoc._id, {...rest})

//         return document; 
//     }
// })