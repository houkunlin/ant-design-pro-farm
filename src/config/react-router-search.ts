import { parseSearchWith, stringifySearchWith } from "@tanstack/react-router";
import type { SearchParser, SearchSerializer } from "@tanstack/router-core";
// @ts-ignore
import BigNumber from 'bignumber.js';

export type JSON_PARAM = {
  parse(text: string, reviver?: (this: any, key: string, value: any) => any): any;
  stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
  stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
}
export type JSON_TYPE = {
  parseSearch: SearchParser;
  stringifySearch: SearchSerializer;
}

export function isBigNumber(value: any) {
  return value instanceof BigNumber || BigNumber.isBigNumber(value);
}

/**
 * 获得路由参数序列化对象
 * @param json
 * @param useBigNumber true 把长整型字符串转换成 BigNumber 对象，false 保持字符串格式
 */
export function genSearchConfig(json: JSON_PARAM, useBigNumber: boolean = false): JSON_TYPE {
  return {
    parseSearch: useBigNumber ? parseSearchWith(json.parse) : parseSearchWith(str => {
      const value = json.parse(str);
      if (isBigNumber(value)) {
        return str;
      }
      return value;
    }),
    stringifySearch: stringifySearchWith(json.stringify, str => {
      const value = json.parse(str);
      if (isBigNumber(value)) {
        // 把对象序列化到地址栏字符串时，遇到长整型字符串，防止出现多余的双引号，导致读取错误，不再进行 json.stringify 转换
        throw Error();
      }
    }),
  }
}
