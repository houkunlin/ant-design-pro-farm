import { createStyles } from "antd-style";
import loginBackgroundImage from '@/assets/images/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr.png';

export const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '16px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '36px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
      '&:first-child': {
        marginLeft: 0,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: `url(${loginBackgroundImage})`,
      backgroundSize: '100% 100%',
    },
  };
});
