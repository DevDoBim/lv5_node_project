const CmtService = require('../services/cmts.services');

class CmtController {
  cmtService = new CmtService();
  // # 댓글 생성
  createComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { comment } = req.body;

      if (!comment) {
        return res
          .status(412)
          .json({ message: '댓글이 입력되지 않았습니다..' });
      }
      await this.cmtService.createComment(userId, postId, comment);
      return res.status(201).json({ message: '댓글을 작성하였습니다.' });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: '댓글 작성에 실패하였습니다.' });
    }
  };
  // # 댓글 조회
  getComment = async (req, res) => {
    try {
      const { postId } = req.params;

      const cmts = await this.cmtService.getComment(postId);

      return res.status(200).json({ cmts });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: '댓글 조회에 실패하였습니다.' });
    }
  };
  // # 댓글 수정
  updateComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;
      const { comment } = req.body;

      await this.cmtService.updateComment(userId, postId, commentId, comment);
      return res.status(200).json({ message: '댓글을 수정하였습니다.' });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: '댓글 수정에 실패하였습니다.' });
    }
  };
  // # 댓글 삭제
  deleteComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;

      await this.cmtService.deleteComment(userId, postId, commentId);
      return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: '댓글 삭제에 실패하였습니다.' });
    }
  };
}

module.exports = CmtController;
