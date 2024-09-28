import mongoose from 'mongoose';
import postModel from "../models/post.model.js";

const postServices = {
  createPost: (post) => {
    return postModel.create(post);
  },
  deletePost: (postId) => {
    return postModel.deleteOne({ _id: postId });
  },
  deletePostUsingAuthorId: (postId, userId) => {
    return postModel.deleteOne({ _id: postId, userId: userId });
  },
  getPost: (postId) => {
    return postModel
      .findByIdAndUpdate({ _id: postId }, { $inc: { views: 1 } }, { new: true })
      .populate("userId", "username");
  },
  getUserBookmarkedPost: (userId, limit, skip) => {
    return postModel
      .find({ bookmarks: { $in: [userId] } })
      .select({ comments: 0, tags: 0, views: 0, status: 0 })
      .populate("userId", "username")
      .limit(limit)
      .skip(skip)
      .lean();
  },
  getRelatedPosts: async (postId, limit) => {
    const post = await postServices.getPost(postId);
    if (!post) {
      throw "No Post Found with the Given ID";
    }

    const postList = await postModel
      .find({
        $and: [{ company: post.company }, { _id: { $ne: post._id } }],
      })
      .limit(limit)
      .select({ _id: 1, title: 1 });

    if (postList.length === limit) return postList;

    const excludePostIds = [post._id];
    for (let i = 0; i < postList.length; i++) {
      excludePostIds.push(postList[i]._id);
    }

    limit -= postList.length;

    const relatedPostList = await postModel.aggregate([
      {
        $search: {
          index: "RecommendPost",
          compound: {
            must: [
              {
                moreLikeThis: {
                  like: {
                    title: post.title,
                    content: post.content,
                    postType: post.postType,
                  },
                },
              },
            ],
            mustNot: [
              {
                in: {
                  path: "_id",
                  value: excludePostIds,
                },
              },
            ],
          },
        },
      },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          title: 1,
        },
      },
    ]);

    return postList.concat(relatedPostList);
  },
  getAllPosts: (filter, sort, limit, skip) => {
    return postModel
      .find(filter)
      .sort(sort)
      .select({ comments: 0, status: 0, tags: 0 })
      .populate("userId", "username")
      .limit(limit)
      .skip(skip)
      .lean();
  },

  getUserPosts: (userId, limit, skip) => {
    return postModel
      .find({ userId })
      .select({ comments: 0, tags: 0 })
      .populate("userId", "username")
      .limit(limit)
      .skip(skip)
      .lean();
  },
  upVotePost: (postId, userId) => {
    const conditions = {
      _id: postId,
      upVotes: { $ne: userId },
    };

    const update = {
      $addToSet: { upVotes: userId },
      $pull: { downVotes: userId },
    };

    return postModel.updateOne(conditions, update);
  },
  downVotePost: (postId, userId) => {
    const conditions = {
      _id: postId,
      downVotes: { $ne: userId },
    };

    const update = {
      $addToSet: { downVotes: userId },
      $pull: { upVotes: userId },
    };

    return postModel.updateOne(conditions, update);
  },
  nullifyUserVote: (postId, userId) => {
    const condition = { _id: postId };
    const update = { $pull: { upVotes: userId, downVotes: userId } };
    return postModel.updateOne(condition, update);
  },
  addUserToBookmark: (postId, userId) => {
    const conditions = {
      _id: postId,
      bookmarks: { $ne: userId },
    };
    const update = { $addToSet: { bookmarks: userId } };
    return postModel.updateOne(conditions, update);
  },
  removeUserFromBookmark: (postId, userId) => {
    const conditions = { _id: postId, bookmarks: userId };
    const update = { $pull: { bookmarks: userId } };
    return postModel.updateOne(conditions, update);
  },
  getCompanyAndRole: () => {
    return postModel.aggregate([
      {
        $group: {
          _id: null,
          company: { $addToSet: "$company" },
          role: { $addToSet: "$role" },
        },
      },
    ]);
  },
  editPost: (postId, userId, editedPostData, isEditorAdmin = false) => {
    let filter = { _id: postId };

    if (!isEditorAdmin) {
      filter = { _id: postId, userId };
    }

    const update = {
      title: editedPostData.title,
      content: editedPostData.content,
      summary: editedPostData.summary,
      company: editedPostData.company,
      role: editedPostData.role,
      postType: editedPostData.postType,
      domain: editedPostData.domain,
      rating: editedPostData.rating,
      status: editedPostData.status,
      tags: editedPostData.tags,
    };

    return postModel.findOneAndUpdate(filter, update);
  },
};

export default postServices;
