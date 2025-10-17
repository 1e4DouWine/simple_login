import { feishuConfig } from '@/constants/feishu';
import { feishuAuthCallback } from '@/services/auth';
import { clearLoginStatus, setLoginStatus } from '@/utils/auth';
import { useNavigate, useSearchParams } from '@umijs/max';
import { message, Spin } from 'antd';
import { useEffect } from 'react';
import styles from './index.less';

const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      // 获取之前存储的state
      const storedState = sessionStorage.getItem('feishu_auth_state');

      // 如果有错误，清除登录状态并重定向到登录页
      if (error) {
        message.error(`授权失败: ${error}`);
        clearLoginStatus();
        navigate('/login');
        return;
      }

      // 验证state参数，防止CSRF攻击
      if (!state || state !== storedState) {
        message.error('授权验证失败，请重新登录');
        clearLoginStatus();
        navigate('/login');
        return;
      }

      if (code) {
        try {
          // 调用后端API处理授权回调
          const response = await feishuAuthCallback(
            code,
            state,
            feishuConfig.redirectUri,
          );

          // 检查响应状态
          if (response.code === 0) {
            const { access_token, admin_user } = response.data;

            // 设置登录状态，存储token和用户信息
            setLoginStatus(true, access_token, admin_user);
            message.success('登录成功');

            // 跳转到首页
            navigate('/home');
          } else {
            // API返回错误
            message.error(`登录失败: ${response.msg || '未知错误'}`);
            navigate('/login');
          }
        } catch (error) {
          console.error('处理授权回调失败:', error);
          message.error('登录过程中发生错误，请重试');
          navigate('/login');
        }
      } else {
        message.error('授权失败，未获取到授权码');
        navigate('/login');
      }

      // 清除临时存储的state
      sessionStorage.removeItem('feishu_auth_state');
    };

    handleAuthCallback();
  }, [searchParams, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.loadingContainer}>
        <Spin size="large" />
        <p className={styles.loadingText}>正在处理授权回调...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
