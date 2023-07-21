const CmtRepository = require('../repositories/cmts.repository');

class CmtService {
  cmtRepository = new CmtRepository();
  // # 댓글 생성
  createComment = async (userId, postId, comment) => {
    await this.cmtRepository.createComment(userId, postId, comment);
  };
  // # 댓글 조회
  getComment = async (postId) => {
    const isExistPost = await this.cmtRepository.findPost(postId);
    if (!isExistPost) {
      return res.status(400).json({errorMessage : "게시글이 존재하지 않습니다."})
    }
    return await this.cmtRepository.getComment(postId);
  };
  // # 댓글 수정
  updateComment = async (userId, postId, commentId,commnet) => {
    const updatedComment = await this.cmtRepository.findComment(commentId);
    if (!updatedComment) {
        return res.status(400).json({errorMessage : "댓글이 존재하지 않습니다."})
    }
    if (userId !== updatedComment.userId) {
        return res.status(400).json({errorMessage : "댓글 수정 권한이 없습니다."})
    }

    await this.cmtRepository.updateComment(userId, postId, commentId, commnet);
  };
  // # 댓글 삭제
  deleteComment = async(userId, postId, commentId) => {
    const deletedComment = await this.cmtRepository.findComment(commentId);
    if (!deletedComment) {
        return res.status(400).json({errorMessage : "댓글이 존재하지 않습니다."})
    }
    if (userId !== deletedComment.userId) {
        return res.status(400).json({errorMessage : "댓글 삭제 권한이 없습니다."})
    }

    await this.cmtRepository.deleteComment(userId, postId, commentId);
  }
}

module.exports = CmtService;
