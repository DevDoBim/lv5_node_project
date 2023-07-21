const UserRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');

class UserService {
  userRepository = new UserRepository();
  // # 회원가입 API
  signupUser = async (email, password, nickname) => {
    const emailReg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    //이메일 형식검사
    const passwordReg = /^.{4,}$/; //password 형식 검사
    if (!emailReg.test(email)) {
      return res
        .status(412)
        .json({ errorMessage: '이메일 형식이 일치하지 않습니다.' });
    }
    if (!passwordReg.test(password)) {
      return res
        .status(412)
        .json({ errorMessage: '패스워드 형식이 일치하지 않습니다.' });
    }
    if (password.includes(email)) {
      return res
        .status(412)
        .json({ errorMessage: '패스워드 형식이 일치하지 않습니다.' });
    }

    const isExistUser = await this.userRepository.findUser(email);
    if (isExistUser) {
      return res.status(412).json({ errorMessage: '중복된 이메일입니다.' });
    }

    await this.userRepository.createUser(email, password, nickname);
  };

  // # 로그인 API
  loginUser = async (email, password) => {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      return res
        .status(412)
        .json({ errorMessage: '닉네임 또는 패스워드를 확인해주세요.' });
    }
    const match = user.password === password;
    if (!match) {
      return res
        .status(412)
        .json({ errorMessage: '닉네임 또는 패스워드를 확인해주세요.' });
    }

    const loginToken = jwt.sign(
      { userId: user.userId },
      'customized_secret_key'
    );
    return { loginToken };
  };
}

module.exports = UserService;
