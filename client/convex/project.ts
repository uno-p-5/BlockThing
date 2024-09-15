import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentProject = query({
    args: { projectId: v.string() },
    handler: async (context, args) => {  
        const identity = await context.auth.getUserIdentity();  

        if (!identity) {
            throw new Error('Not Authenticated');
        }

        const proj = await context.db.query('project')
            .filter(q => q.eq(q.field("_id"), args.projectId)) 
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
            chat_history: [],
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


export const deleteProject = mutation({
    args: { projectId: v.id("project") },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) {
            throw new Error('Not Authenticated');
        }

        const project = await ctx.db.get(args.projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        if (project.creator !== userId.subject) {
            throw new Error('You do not have permission to delete this project');
        }

        await ctx.db.delete(args.projectId);
        return true;
    }
});


export const update = mutation({
    args: {
        project_id: v.string(),
        name: v.optional(v.string()),
        code: v.optional(v.string()),
        description: v.optional(v.string()),
        embedding: v.optional(v.array(v.float64())),
        chat_history: v.optional(v.array(v.any())),
    },
    handler: async (ctx, args) => {
        let existingDoc = await ctx.db.query("project")
        .filter(q => q.eq(q.field("_id"), args.project_id))
        .first();

        const { project_id, ...rest } = args; 
        if(!existingDoc) { throw new Error("Project Not Found"); }

        const document = await ctx.db.patch(existingDoc._id, {...rest})

        return document; 
    }
})


export const getAllProjects = query({
    args: {},
    handler: async (ctx) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) {
            throw new Error('Not Authenticated');
        }

        const projects = await ctx.db.query('project').collect()

        return projects;
    }
});