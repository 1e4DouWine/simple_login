import Guide from '@/components/Guide';
import { clearLoginStatus, getStoredUserInfo, isLoggedIn } from '@/utils/auth';
import { trim } from '@/utils/format';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useModel, useNavigate } from '@umijs/max';
import { Avatar, Button, Card, Col, message, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // 检查是否已登录，如果未登录则重定向到登录页
    if (!isLoggedIn()) {
      message.warning('请先登录');
      navigate('/login');
      return;
    }

    // 获取用户信息
    const storedUserInfo = getStoredUserInfo();
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, [navigate]);

  // 处理退出登录
  const handleLogout = () => {
    clearLoginStatus();
    message.success('已退出登录');
    navigate('/login');
  };

  // 如果未登录，不渲染页面内容
  if (!isLoggedIn()) {
    return null;
  }

  return (
    <PageContainer
      ghost
      extra={[
        <Space key="user-info">
          <Avatar
            src={userInfo?.avatar_url}
            icon={<UserOutlined />}
            size="small"
          />
          <span>{userInfo?.name || '用户'}</span>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            size="small"
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </Space>,
      ]}
    >
      <div className={styles.container}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <div className={styles.userInfo}>
                <Avatar
                  src={userInfo?.avatar_url}
                  icon={<UserOutlined />}
                  size={64}
                />
                <div className={styles.userDetails}>
                  <h2>欢迎，{userInfo?.name || '用户'}！</h2>
                  <p>角色: {userInfo?.role || 'guest'}</p>
                </div>
                <Button
                  type="primary"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                >
                  退出登录
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={24}>
            <Guide name={trim(name)} />
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default HomePage;
