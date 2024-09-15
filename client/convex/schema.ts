import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    project: defineTable({
        creator: v.string(),
        name: v.string(), 
        shared_users: v.optional(v.array(v.string())),
        code: v.optional(v.string()),
        description: v.optional(v.string()),
        embedding: v.optional(v.array(v.float64())),
    })
    .index('byCreator', ['creator'])
    // .index('bySharedUsers', ['shared_users'])
    .vectorIndex("by_embedding", {
        vectorField: "embedding",
        dimensions: 1536,
        filterFields: ["description"],
      }),

    user: defineTable({
        user_id: v.string(),
        pfp_url: v.string(), 
        email: v.string(), 
        name: v.string(),
        owned_projects: v.optional(v.array(v.string())),
        shared_projects: v.optional(v.array(v.string())),
    })
    .index("byUserId", ["user_id"])
    .index("byEmail", ["email"])
    .index("byName", ["name"])

});