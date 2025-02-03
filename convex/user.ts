import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createUser = mutation({
  args: {
    name: v.string(),
    userName: v.string(),
    email: v.string(),
    location: v.string(),
    avatar: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('user', args);
  },
});

export const getUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, { email }) => {
      return await ctx.db.query('user')
        .withIndex('by_email', q => q.eq('email', email))
        .unique();
    },
  });
  