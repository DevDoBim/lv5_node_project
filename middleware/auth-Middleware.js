// JWT
const jwt = require("jsonwebtoken");
// Model
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.cookies;
    const [tokenType, token] = (authorization ?? "").split(" ");

    // # 게시글 생성 API _Cookie가 비정상적이거나 만료된 경우
    if (tokenType !== "Bearer") { 
      return res.status(403).json({
        message: "전달된 Cookie에서 오류가 발생하였습니다."
      });
    }
    // # 게시글 생성 API _Cookie가 존재하지 않을 경우
    if (!token) {
      return res.status(403).json({ 
        message: "로그인이 필요한 기능입니다."
      });
    }

    // Decoding ==================================================
    const decodedToken = jwt.verify(token, "customized_secret_key");
    const userId = decodedToken.userId;
    // Decoding ==================================================

    const user = await Users.findOne({
      where: { userId }
    });
    if (!user) {
      // 사용자가 존재하지 않을 경우, "authorization" Cookie를 제거하여, 인증상태를 해제
      res.clearCookie("authorization");

      return res.status(403).json({
        message: "전달된 Cookie에서 오류가 발생하였습니다."
      });
    }
    res.locals.user = user; // <= 이 변수에 'userId'가 존재
    next();
    // try => catch
  } catch (error) {
    // 비정상적인 요청일 경우, "authorization" Cookie를 제거하여, 인증상태를 해제
    res.clearCookie("authorization");

    return res.status(403).json({
      message: "전달된 Cookie에서 오류가 발생하였습니다."
    });
  }
}
