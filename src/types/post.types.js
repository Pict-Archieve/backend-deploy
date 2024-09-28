import { Types } from "mongoose";
import { IComment } from "./comment.types.js";

// for model
/**
 * @typedef {Object} IPost
 * @property {string} title
 * @property {string} content
 * @property {string} summary
 * @property {Types.ObjectId} userId
 * @property {string} company
 * @property {string} role
 * @property {string} postType
 * @property {string} domain
 * @property {number} rating
 * @property {string} status
 * @property {Date} createdAt
 * @property {Types.ObjectId[]} upVotes
 * @property {Types.ObjectId[]} downVotes
 * @property {number} views
 * @property {Types.ObjectId[]} bookmarks
 * @property {string[]} tags
 * @property {IComment[]} comments
 */

/**
 * @typedef {Object} IPostForm
 * @property {string} title
 * @property {string} content
 * @property {string} summary
 * @property {Types.ObjectId} userId
 * @property {string} company
 * @property {string} role
 * @property {string} postType
 * @property {string} domain
 * @property {number} rating
 * @property {string} status
 * @property {string[]} tags
 */

/**
 * @typedef {Object} IPostDisplay
 * @property {string} title
 * @property {string} content
 * @property {string} summary
 * @property {{ _id: Types.ObjectId; username: string }} userId
 * @property {string} company
 * @property {string} role
 * @property {string} postType
 * @property {string} domain
 * @property {number} rating
 * @property {string} status
 * @property {Date} createdAt
 * @property {Types.ObjectId[]} upVotes
 * @property {Types.ObjectId[]} downVotes
 * @property {number} views
 * @property {Types.ObjectId[]} bookmarks
 * @property {string[]} tags
 * @property {IComment[]} comments
 */

/**
 * @typedef {Object} IPostList
 * @property {string} title
 * @property {string} content
 * @property {string} summary
 * @property {{ _id: Types.ObjectId; username: string }} userId
 * @property {string} company
 * @property {string} role
 * @property {string} postType
 * @property {string} domain
 * @property {Date} createdAt
 * @property {Types.ObjectId[]} upVotes
 * @property {Types.ObjectId[]} downVotes
 * @property {boolean} isUpVoted
 * @property {boolean} isDownVoted
 * @property {boolean} isBookmarked
 */

/**
 * @typedef {Object} IPostFilter
 * @property {Array} $and
 * @property {Array} $or
 */
