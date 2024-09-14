import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    project: defineTable({
        creator: v.id("user"),
        name: v.string(), 
        shared_users: v.array(v.string()),
        blocks: v.optional(v.any()),
        code: v.optional(v.string()),
        description: v.optional(v.string()),
        embedding: v.array(v.float64()),
    })
    .index('byCreator', ['creator'])
    .index('bySharedUsers', ['shared_users'])
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
    })
    .index("byUserId", ["user_id"])
    .index("byEmail", ["email"])
    .index("byName", ["name"])

});