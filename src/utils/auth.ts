import { feishuConfig, storageKeys } from '@/constants/feishu';

// 生成随机字符串用于state参数
export const generateRandomString = (length = 16): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// 生成飞书授权URL
export const generateFeishuAuthUrl = (): string => {
  const state = generateRandomString();
  // 临时存储state，用于后续验证
  sessionStorage.setItem('feishu_auth_state', state);

  const params = new URLSearchParams({
    client_id: feishuConfig.clientId,
    response_type: feishuConfig.responseType,
    redirect_uri: feishuConfig.redirectUri,
    scope: feishuConfig.scope,
    state: state,
  });

  return `${feishuConfig.authUrl}?${params.toString()}`;
};

// 检查是否已登录
export const isLoggedIn = (): boolean => {
  return localStorage.getItem(storageKeys.isLoggedIn) === 'true';
};

// 设置登录状态
export const setLoginStatus = (
  status: boolean,
  token?: string,
  userInfo?: any,
): void => {
  localStorage.setItem(storageKeys.isLoggedIn, status.toString());
  if (token) {
    localStorage.setItem(storageKeys.token, token);
  }
  if (userInfo) {
    localStorage.setItem(storageKeys.userInfo, JSON.stringify(userInfo));
  }
};

// 清除登录状态
export const clearLoginStatus = (): void => {
  localStorage.removeItem(storageKeys.isLoggedIn);
  localStorage.removeItem(storageKeys.token);
  localStorage.removeItem(storageKeys.userInfo);
  sessionStorage.removeItem('feishu_auth_state');
};

// 获取存储的token
export const getStoredToken = (): string | null => {
  return localStorage.getItem(storageKeys.token);
};

// 获取存储的用户信息
export const getStoredUserInfo = (): any | null => {
  const userInfo = localStorage.getItem(storageKeys.userInfo);
  return userInfo ? JSON.parse(userInfo) : null;
};
