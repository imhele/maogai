import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';
import classNames from 'classnames';

export interface ResultProps {
  actions?: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  title: React.ReactNode;
  type: 'success' | 'error';
}

const iconMap = {
  error: <Icon className={styles.error} type="close-circle" theme="filled" />,
  success: <Icon className={styles.success} type="check-circle" theme="filled" />,
};

const Result: React.SFC<ResultProps> = ({
  actions,
  className,
  description,
  extra,
  style,
  title,
  type,
}) => {
  const clsString = classNames(styles.result, className);
  return (
    <div className={clsString} style={style}>
      <div className={styles.icon}>{iconMap[type]}</div>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {extra && <div className={styles.extra}>{extra}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

export default Result;
