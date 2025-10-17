// 飞书登录配置
export const feishuConfig = {
  clientId: 'xxxxxxxxxxxxxxxxx',
  responseType: 'code',
  redirectUri: 'http://localhost:8000/auth/callback',
  scope: 'contact:contact.base:readonly offline_access',
  authUrl: 'https://accounts.feishu.cn/open-apis/authen/v1/authorize',
  callbackApiUrl: 'http://localhost:9088/api/v1/lova/auth/feishu/callback',
};

// 本地存储键名
export const storageKeys = {
  token: 'feishu_token',
  userInfo: 'feishu_user_info',
  isLoggedIn: 'is_logged_in',
};
