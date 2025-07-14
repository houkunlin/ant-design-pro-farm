declare module '*.svg';
declare module '*.png';
declare module '*.css';
declare module '*.less';
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare module '*.svg?url' {
  const content: string;
  export default content;
}
