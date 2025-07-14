module.exports = {
  plugins: {
    // 自动添加浏览器前缀，放在最前保证兼容性
    autoprefixer: {},
    // px → rem，用于字体大小、line-height 等文本相关的属性
    'postcss-pxtorem': {
      unitPrecision: 6, // 转换后的精度，即小数点位数，指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      propList: ['font-size', 'line-height', 'letter-spacing'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      selectorBlackList: ['.no-rem'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
    },
    // px → vw，用于布局、尺寸等与视口相关的属性，将px转换为vh和vw（推荐作为移动端的计量单位，而不是rem）
    'postcss-px-to-viewport-8-plugin': {
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 1920, // UI设计稿的宽度，视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      // viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 6, // 转换后的精度，即小数点位数，指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ['.no-vw'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
    },
    'postcss-viewport-units': {
      // 排除会产生警告的部份
      filterRule: (rule) => rule.nodes.findIndex((i) => i.prop === 'content') === -1,
    },
    // 压缩css代码
    // cssnano: {
    //   preset: 'advanced',
    //   autoprefixer: false, // 和autoprefixer同样具有autoprefixer，保留一个
    //   'postcss-zindex': false,
    // },
  },
};
