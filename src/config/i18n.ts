import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import bnBD from '@/locales/bn-BD.ts';
import enUS from '@/locales/en-US.ts';
import faIR from '@/locales/fa-IR.ts';
import idID from '@/locales/id-ID.ts';
import jaJP from '@/locales/ja-JP.ts';
import ptBR from '@/locales/pt-BR.ts';
import zhCN from '@/locales/zh-CN.ts';
import zhTW from '@/locales/zh-TW.ts';

i18n
  // 检测用户当前使用的语言
  // 文档: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // 注入 react-i18next 实例
  .use(initReactI18next)
  // 初始化 i18next
  // 配置参数的文档: https://www.i18next.com/overview/configuration-options
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      'bn-BD': { translation: { ...bnBD } },
      'en-US': { translation: { ...enUS } },
      'fa-IR': { translation: { ...faIR } },
      'id-ID': { translation: { ...idID } },
      'ja-JP': { translation: { ...jaJP } },
      'pt-BR': { translation: { ...ptBR } },
      'zh-CN': { translation: { ...zhCN } },
      'zh-TW': { translation: { ...zhTW } },
    },
  });

export default i18n;

