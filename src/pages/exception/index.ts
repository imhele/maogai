/**
 * redirect: /exception/404
 */

export const EXCEPTION_TEXT = {
  'exception.goback': '返回上一页',
  'exception.gohome': '返回首页',
};

export interface ExceptionProps {
  type?: 'goback' | 'gohome';
}
