'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({app});
  router.get('/', controller.home.index);
  // 验证码
  router.get('/captcha', controller.util.captcha);
  router.get('/sendcode', controller.util.sendcode)
  router.post('/uploadfile', controller.util.uploadfile)
  router.post('/mergefile', controller.util.mergefile)
  router.post('/checkfile', controller.util.checkfile)
  // 路由启好
  router.group({ name: 'user', prefix: '/user' }, router => {
    const {
      info, register, login, verify,updateInfo,isfollow,follow,cancelFollow,
      following,followers,articleStatus,likeArticle,
      cancelLikeArticle,
    } = controller.user
    router.post('/register', register)
    router.post('/login', login)
    // router.get('/info', jwt, info)
    router.get('/info', jwt, updateInfo)
    router.get('/detail', jwt, info)
    router.get('/verify', verify)
    router.get('/follow/:id', jwt, isfollow)
    router.put('/follow/:id', jwt, follow)
    router.delete('/follow/:id', jwt, cancelFollow)
    router.get('/:id/following', following)
    router.get('/:id/followers', followers)
    router.get('/article/:id', jwt, articleStatus)
    // // .put点赞，。delete取消点赞
    // router.put('/likeArticle/:id', jwt, likeArticle)
    router.put('/likeArticle/:id', jwt, likeArticle)
    router.delete('/likeArticle/:id', jwt, cancelLikeArticle)
  })
  router.group({ name: 'article', prefix: '/article' }, router => {
    const { create, detail, index } = controller.article
    router.post('/create', jwt, create)
    router.get('/:id', detail)
    router.get('/', index)
  })
};
/*
/user/login
/user/register
/user/followa
npm install egg-router-group egg-mongoose egg-validate md5 jsonwebtoken --save
{
  code:0,
  data:{}, 0 在data里
  message: 1 信息
  errors:具体的报错信息
}
code 0 是成功 其他都是失败
-1 是错误
-666 登录状态过期
权限
*/ 