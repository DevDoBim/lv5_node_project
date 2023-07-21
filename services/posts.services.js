const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  //# 게시글 작성 API
  createPost = async (userId, title, content) => {
    await this.postRepository.createPost(userId, title, content);
  };
  // # 게시글 조회 API
  getPost = async () => {
    return await this.postRepository.getPost();
  };

  // # 게시글 수정 API
  updatePost = async (userId, postId, title, content) => {
    const updatedPost = await this.postRepository.getPostById(postId);
    if (!updatedPost) {
      return res
        .status(412)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }
    if (userId !== updatedPost.userId) {
      return res.status(412).json({ errorMessage: '권한이 없습니다.' });
    }
    await this.postRepository.updatePost(userId, postId, title, content);
  };
  // # 게시글 삭제 API
  deletePost = async (userId, postId) => {
    const deletedPost = await this.postRepository.getPostById(postId);
    if (!deletedPost) {
      return res
        .status(412)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }
    if (userId !== deletedPost.userId) {
      return res.status(412).json({ errorMessage: '권한이 없습니다.' });
    }

    await this.postRepository.deletePost(postId);
  };
}

module.exports = PostService;
