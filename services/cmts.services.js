const CmtRepository = require('../repositories/cmts.repository');

class CmtService {
  cmtRepository = new CmtRepository();
}

module.exports = CmtService;
