import { Types } from 'mongoose';

/**
 * @typedef {import('./reply.types').IReply} IReply
 */

/**
 * @typedef {Object} IComment
 * @property {Types.ObjectId} userId
 * @property {string} content
 * @property {Date} createdAt
 * @property {IReply[]} replies
 */

/**
 * @typedef {Object} ICommentDisplay
 * @property {{ _id: Types.ObjectId; username: string }} userId
 * @property {string} content
 * @property {Date} createdAt
 */
