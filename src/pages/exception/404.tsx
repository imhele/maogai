import React from 'react';
import { Button } from 'antd';
import router from 'umi/router';
import styles from './styles.less';
import { ExceptionProps, EXCEPTION_TEXT } from './index';

export default ({ type = 'goback' }: ExceptionProps) => {
  const handleRouter = () => {
    if (type === 'gohome') router.push('/');
    else router.goBack();
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <div className={styles.title}>404</div>
        <div className={styles.describe}>
          <span>抱歉，你访问的页面不存在</span>
        </div>
        <Button type="primary" onClick={handleRouter}>
          {EXCEPTION_TEXT[`exception.${type}`]}
        </Button>
      </div>
      <div className={styles.rightContent} />
    </div>
  );
};
