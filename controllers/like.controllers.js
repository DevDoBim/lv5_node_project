const LikeService = require('../services/likes.services');

class LikeController {
  likeService = new LikeService();

  // # 게시글 좋아요 API
  updateLike = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const { code, message } = await this.likeService.updateLike(userId, postId);
    res.status(code).json({ message });
  };
  // # 게시글 좋아요 조회 API
  getLikes = async (req, res) => {
    const { userId } = res.locals.user;

    const { code, message, likedPosts } = await this.likeService.getLikes(userId);

    res.status(code).json({ message, likedPosts });
  };
}

module.exports = LikeController;
