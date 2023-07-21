const { Post } = require('../models');

class PostRepository {
  // 게시글 작성 API
  createPost = async (userId, title, content) => {
    await Post.create({ userId, title, content });
  };
  // # 게시글 조회 API
  getPost = async () => {
    return await Post.findAll({});
  };
  // # 게시글 id로 조회
  getPostById = async (postId) => {
    return await Post.findByPk(postId);
  };
  // # 게시글 수정 API
  updatePost = async (userId ,postId, title, content) => {
    const updateValues = {};
    if (title) updateValues.title = title;
    if (content) updateValues.content = content;
    await Post.update(updateValues, { where: { userId ,postId } });
  };
  // # 게시글 삭제 API
  deletePost = async (postId) => {
    await Post.destroy({ where: { postId } });
  };
}

module.exports = PostRepository;
