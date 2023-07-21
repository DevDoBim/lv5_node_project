const { Users } = require('../models');

class UserRepository {
  // 이메일로 회원 조회
  findUser = async (email) => {
    return await Users.findOne({ where: { email } });
  };
  // 회원가입 API
  createUser = async (email, password, nickname) => {
    await Users.create({ email, password, nickname });
  };
}

module.exports = UserRepository;
