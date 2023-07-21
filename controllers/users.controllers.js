const UserService = require('../services/users.services');

class UserController {
  userService = new UserService();

  // # 회원가입 API
  signupUser = async (req, res) => {
    try {
      const { email, password, confirm, nickname } = req.body;

      if (!email || !password || !nickname) {
        return res
          .status(412)
          .json({ message: '입력되지 않은 정보가 있습니다.' });
      }
      if (password !== confirm) {
        return res
          .status(412)
          .json({ message: '패스워드가 일치하지 않습니다.' });
      }

      await this.userService.signupUser(email, password, nickname);

      return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: '회원 가입에 실패하였습니다.' });
    }
  };
  // # 로그인 API
  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      const { loginToken } = await this.userService.loginUser(email, password);

      res.cookie('Authorization', `Bearer ${loginToken}`);
      return res
        .status(200)
        .json({ message: '로그인에 성공하였습니다.', loginToken });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ errorMessage: '로그인에 실패하였습니다.' });
    }
  };
}

module.exports = UserController;
