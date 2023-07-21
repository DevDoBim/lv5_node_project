const PostService = require('../services/posts.services');

class PostController {
  postService = new PostService();

  // # 게시글 생성 API
  createPost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { title, content } = req.body;

      if (!title || !content) {
        return res
          .status(412)
          .json({ message: '입력되지 않은 정보가 있습니다.' });
      }
      await this.postService.createPost(userId, title, content);
      return res.status(201).json({ message: '게시글을 작성하였습니다.' });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: '게시글 작성에 실패하였습니다.' });
    }
  };
  // # 게시글 조회 API
  getPost = async (req, res) => {
    try {
      const posts = await this.postService.getPost();

      return res.status(200).json({ posts });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };
  // # 게시글 수정 API
  updatePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;

      await this.postService.updatePost(userId, postId, title, content);
      return res.status(200).json({ message: '게시글을 수정하였습니다.' });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: '게시글 수정에 실패하였습니다.' });
    }
  };
  // # 게시글 삭제 API
  deletePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      await this.postService.deletePost(userId, postId);

      return res.status(200).json({ message: '게시글을 삭제하였습니다.' });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
    }
  };
}

module.exports = PostController;
