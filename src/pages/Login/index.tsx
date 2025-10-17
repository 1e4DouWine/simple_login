import { generateFeishuAuthUrl } from '@/utils/auth';
import { Button } from 'antd';
import styles from './index.less';

const LoginPage: React.FC = () => {
  const handleFeishuLogin = () => {
    const authUrl = generateFeishuAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>欢迎使用</h1>
        <p className={styles.subtitle}>请使用飞书账号登录</p>
        <Button
          type="primary"
          size="large"
          className={styles.loginButton}
          onClick={handleFeishuLogin}
        >
          飞书登录
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
