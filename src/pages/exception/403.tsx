import React from 'react';
import { Button } from 'antd';
import router from 'umi/router';
import styles from './styles.less';
import { ExceptionProps, EXCEPTION_TEXT } from './index';

export default ({ type = 'goback' }: ExceptionProps) => {
  const handleRouter: () => void = () => {
    if (type === 'gohome') router.push('/');
    else router.goBack();
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <div className={styles.title}>403</div>
        <div className={styles.describe}>
          <span>抱歉，你无权访问此页面</span>
        </div>
        <Button type="primary" onClick={handleRouter}>
          {EXCEPTION_TEXT[`exception.${type}`]}
        </Button>
      </div>
      <div className={styles.rightContent} />
    </div>
  );
};
