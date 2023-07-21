const LikeService = require('../services/likes.services');

class LikeController {
  likeService = new LikeService();

}

module.exports = LikeController;