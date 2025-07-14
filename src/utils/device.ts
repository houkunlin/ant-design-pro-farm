import { isAlipay, isDingTalk, isWeChat, isWeCom } from 'check-platform';
import { isAndroid, isIOS, isMobileOnly } from 'react-device-detect';

/**
 * 移动设备：安卓浏览器环境
 */
export const isMobileAndroid = isMobileOnly && isAndroid;
/**
 * 移动设备：苹果浏览器环境
 */
export const isMobileIOS = isMobileOnly && isIOS;
/**
 * 移动设备：微信浏览器环境
 */
export const isMobileWeChat = isMobileOnly && isWeChat;
/**
 * 移动设备：企业微信浏览器环境
 */
export const isMobileWeCom = isMobileOnly && isWeCom;
/**
 * 移动设备：支付宝浏览器环境
 */
export const isMobileAlipay = isMobileOnly && isAlipay;
/**
 * 移动设备：钉钉浏览器环境
 */
export const isMobileDingTalk = isMobileOnly && isDingTalk;

export default {
  isAlipay, isDingTalk, isWeChat, isWeCom,
  isAndroid, isIOS, isMobileOnly
}
