const { Likes, Post, Users } = require('../models');

class LikeRepository {
  // Likes 테이블에서 좋아요 여부 확인
  findLikeById = async (userId, postId) => {
    const liked = await Likes.findOne({ where: { userId, postId } });

    return liked;
  };
  // # 게시글 좋아요 API
  // 게시글 좋아요
  incrementLike = async (userId, postId) => {
    await Post.increment({ likeCount: 1 }, { where: { postId } });
    await Likes.create({ userId, postId });

    return;
  };
  // 게시글 좋아요 취소
  decrementLike = async (userId, postId) => {
    await Post.decrement({ likeCount: 1 }, { where: { postId } });
    await Likes.destroy({ where: { userId, postId } });

    return;
  };
  // # 게시글 좋아요 조회 API
  getLikes = async (userId) => {
    const likedPosts = await Likes.findAll({
      raw: true,
      include: [
        {
          model: Post,
          attributes: ['title', 'likeCount', 'createdAt'],
          include: [
            {
              model: Users,
              attributes: ['nickname'],
            },
          ],
        },
      ],
      where: { userId },
      order: [[{ model: Post }, 'likeCount', 'DESC']],
    });

    return likedPosts;
  };
}

module.exports = LikeRepository;
