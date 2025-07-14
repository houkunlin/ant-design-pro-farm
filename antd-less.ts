// https://ant.design/docs/react/migration-v5-cn#less-%E8%BF%81%E7%A7%BB
import { theme } from 'antd';
import { convertLegacyToken, defaultTheme } from '@ant-design/compatible';

const { defaultAlgorithm, defaultSeed } = theme;

const mapV5Token = defaultAlgorithm(defaultSeed);
const v5Vars = convertLegacyToken(mapV5Token);
const mapV4Token = theme.getDesignToken(defaultTheme);
const v4Vars = convertLegacyToken(mapV4Token);

export default {
  v4Vars, v5Vars
}
