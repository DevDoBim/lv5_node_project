const { Comments, Post } = require('../models');

class CmtRepository {
  // # 댓글 생성
  createComment = async (userId, postId, comment) => {
    await Comments.create({ userId, postId, comment });
  };
  // # 게시글 id로 조회
  findPost = async (postId) => {
    return await Post.findByPk(postId);
  };
  // # 댓글 조회
  getComment = async (postId) => {
    return await Comments.findAll({
      where: { postId },
      order: [['createdAt', 'DESC']],
    });
  };
  // # 댓글 id로 조회
  findComment = async (commentId) => {
    return await Comments.findByPk(commentId);
  };
  // # 댓글 수정
  updateComment = async (userId, postId, commentId, comment) => {
    const updateValues = {};
    if (comment) updateValues.comment = comment;
    await Comments.update(updateValues, {
      where: { userId, postId, commentId },
    });
  };
  // # 댓글 삭제
  deleteComment = async (userId, postId, commentId) => {
    await Comments.destroy({ where: { userId, postId, commentId } });
  };
}

module.exports = CmtRepository;
