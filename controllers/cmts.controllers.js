const CmtService = require('../services/cmts.services');

class CmtController {
  cmtService = new CmtService();

}

module.exports = CmtController;