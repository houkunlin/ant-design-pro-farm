import { Spin } from 'antd';
import styles from './index.module.less';

/**
 * 页面加载等待
 * @constructor
 */
function PageLoadingWaiting() {
  return <div className={styles.pageLoadingWaiting}>
    <div className={styles.pageLoadingWarp}>
      <Spin spinning={true} size={'large'} />
    </div>
    <div className={styles.loadingTitle}>初始化中</div>
    <div className={styles.loadingSubTitle}>正在初始化页面，请稍等 . . .</div>
  </div>
}

export default PageLoadingWaiting;
