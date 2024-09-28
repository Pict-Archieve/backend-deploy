import { Types } from 'mongoose';
import commentServices from '../services/comment.service.js';

const commentController = {
  getComment: async (req, res) => {
    const postId = req.params.postid;
    if (!Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ message: "No such post found..." });
    }

    let page = parseInt(req.query.page) - 1;
    let limit = parseInt(req.query.limit);

    if (!limit || limit <= 0) limit = 10;
    if (limit > 100) {
      return res.status(500).json({ message: "Limit cannot exceed 100" });
    }

    if (!page || page < 0) {
      page = 0;
    }

    const skip = limit * page;

    try {
      const comments = await commentServices.getComment(postId, skip, limit);

      if (!comments || comments.length === 0) {
        return res.status(200).json({
          message: "No comments",
          data: [],
          page: {
            previousPage: page === 0 ? undefined : page,
            nextPage: undefined,
          },
        });
      }

      const previousPage = page === 0 ? undefined : page;
      const nextPage = page + 2;
      return res.status(200).json({
        message: "comments fetched successfully",
        data: comments,
        page: { nextPage, previousPage },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong...." });
    }
  },
  createComment: async (req, res) => {
    const { content, authTokenData } = req.body;
    const userId = authTokenData.id.toString();

    const postId = req.params.postid;
    if (!Types.ObjectId.isValid(postId)) {
      return res
        .status(404)
        .json({ message: "Please provide a valid post to create comment" });
    }

    if (!content) {
      return res
        .status(401)
        .json({ message: "Comment is Empty, please provide content" });
    }

    try {
      const commentId = await commentServices.createComment(
        userId,
        postId,
        content
      );

      if (!commentId) {
        return res
          .status(404)
          .json({ message: "Please provide a valid Post to Comment" });
      }

      return res.status(200).json({
        message: "Comment Created Successfully",
        commentId: commentId,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong....." });
    }
  },
  deleteComment: async (req, res) => {
    const { authTokenData } = req.body;
    const userId = authTokenData.id.toString();

    const postId = req.params.postid;
    const commentId = req.params.commentid;
    if (!Types.ObjectId.isValid(postId) || !Types.ObjectId.isValid(commentId)) {
      return res
        .status(404)
        .json({ message: "Please provide a valid Comment to Delete" });
    }

    try {
      let commentDeleteResponse = null;

      if (authTokenData.isAdmin) {
        commentDeleteResponse = await commentServices.deleteComment(
          postId,
          commentId
        );
      } else {
        commentDeleteResponse =
          await commentServices.deleteCommentUsingAuthorId(
            postId,
            commentId,
            userId
          );
      }

      if (!commentDeleteResponse.acknowledged) {
        return res.status(400).json({ message: "Something went wrong..." });
      }

      if (commentDeleteResponse.modifiedCount === 0) {
        return res
          .status(404)
          .json({ message: "Comment Could not be Deleted" });
      }

      return res.status(200).json({ message: "Comment Deleted Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong..." });
    }
  },
  getCommentReplies: async (req, res) => {
    const postId = req.params.postid;
    const commentId = req.params.commentid;

    if (!Types.ObjectId.isValid(postId) || !Types.ObjectId.isValid(commentId)) {
      return res
        .status(404)
        .json({ message: "Please provide a valid Post with Comment to reply" });
    }

    let page = parseInt(req.query.page) - 1;
    let limit = parseInt(req.query.limit);

    if (!limit || limit <= 0) limit = 10;

    if (limit > 100) {
      return res.status(500).json({ message: "Limit cannot exceed 100" });
    }

    if (!page || page < 0) {
      page = 0;
    }

    try {
      const skip = limit * page;

      const replies = await commentServices.getAllReplies(
        postId,
        commentId,
        limit,
        skip
      );

      if (!replies || replies.length === 0) {
        return res.status(200).json({
          message: "No replies to display",
          data: [],
          page: {
            previousPage: page === 0 ? undefined : page,
            nextPage: undefined,
          },
        });
      }

      const nextPage = page + 2;
      const previousPage = page === 0 ? undefined : page;

      return res.status(200).json({
        message: "Replies fetched successfully",
        data: replies,
        page: { nextPage, previousPage },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong....." });
    }
  },
  createCommentReply: async (req, res) => {
    const { content, authTokenData } = req.body;
    const userId = authTokenData.id.toString();

    const postId = req.params.postid;
    const commentId = req.params.commentid;
    if (!Types.ObjectId.isValid(postId) || !Types.ObjectId.isValid(commentId)) {
      return res
        .status(404)
        .json({ message: "Please provide a valid Post with Comment to reply" });
    }

    if (!content) {
      return res
        .status(401)
        .json({ message: "Reply is Empty, please provide content" });
    }

    try {
      const replyId = await commentServices.createReply(
        userId,
        postId,
        commentId,
        content
      );

      if (!replyId) {
        return res
          .status(404)
          .json({ message: "Please provide a valid Comment to Reply" });
      }

      return res.status(200).json({
        message: "Replied to the Comment Successfully",
        replyId: replyId,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong....." });
    }
  },
  deleteCommentReply: async (req, res) => {
    const userId = req.body.authTokenData.id;
    const postId = req.params.postid;
    const commentId = req.params.commentid;
    const replyId = req.params.replyid;

    if (
      !Types.ObjectId.isValid(postId) ||
      !Types.ObjectId.isValid(commentId) ||
      !Types.ObjectId.isValid(replyId)
    ) {
      return res
        .status(404)
        .json({ message: "Please provide a valid Reply to be deleted...." });
    }

    try {
      let response = null;
      if (req.body.authTokenData.isAdmin) {
        response = await commentServices.deleteReply(
          postId,
          commentId,
          replyId
        );
      } else {
        response = await commentServices.deleteReplyUsingAuthorId(
          postId,
          commentId,
          replyId,
          userId
        );
      }

      if (!response.acknowledged) {
        return res.status(500).json({ message: "something went wrong....." });
      }

      if (!response.modifiedCount) {
        return res.status(404).json({ message: "no such reply found" });
      }

      return res.status(200).json({ message: "Reply deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong..." });
    }
  },
};

export default commentController;
