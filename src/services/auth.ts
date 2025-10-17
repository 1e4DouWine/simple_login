import { feishuConfig } from '@/constants/feishu';
import axios from 'axios';

// 飞书授权回调API
export const feishuAuthCallback = async (
  code: string,
  state: string,
  redirectUri?: string,
) => {
  try {
    console.log('=== 发送飞书OAuth回调请求 ===');
    console.log('请求URL:', feishuConfig.callbackApiUrl);
    console.log('请求方法: POST');
    console.log('请求参数:', { code, state, redirectUri });

    const response = await axios.post(feishuConfig.callbackApiUrl, {
      code,
      state,
      redirect_uri: redirectUri || feishuConfig.redirectUri,
    });

    console.log('响应状态码:', response.status);
    console.log('响应状态文本:', response.statusText);
    console.log('响应头:', response.headers);
    console.log('响应数据:', response.data);
    console.log('=== 响应详情结束 ===');

    return response.data;
  } catch (error) {
    console.error('飞书授权回调API请求失败:', error);
    throw error;
  }
};
