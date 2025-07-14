export function formatTime(time: number = 0) {
  let t = time;
  const second = t < 60 ? t : t % 60;
  t = Math.floor(t / 60);
  const minute = t < 60 ? t : t % 60;
  t = Math.floor(t / 60);
  const hour = t < 24 ? t : t % 24;
  t = Math.floor(t / 24);
  const day = t;

  return `${day} 天 ${hour} 小时 ${minute} 分钟 ${second} 秒`;
}
