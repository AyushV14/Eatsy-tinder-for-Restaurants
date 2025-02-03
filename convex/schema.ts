import {defineSchema, defineTable} from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    user: defineTable({
        name:v.string(),
        userName:v.string(),
        email:v.string(),
        location:v.string(),
        avatar:v.any(),
    }).index('by_email', ['email'])
})