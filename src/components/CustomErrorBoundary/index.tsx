import { Component, type ErrorInfo } from 'react';
import { Button, Result } from 'antd';
import image from './shibaizhuangtaizuo.png';

type ErrorInfoType = {
  hasError: boolean;
  error: Error;
};

class CustomErrorBoundary extends Component<Record<string, any>, ErrorInfoType> {
  state = {
    hasError: false,
    error: undefined as unknown as Error,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    // console.log('CustomErrorBoundary componentDidCatch', error, errorInfo);
  }

  render() {
    // console.log('CustomErrorBoundary', this.props, this.state);
    if (this.state.hasError) {
      return (
        <Result
          status={'error'}
          icon={<img width={256} src={image} alt={'icon'} draggable={false} />}
          style={{
            height: '100%',
            background: '#fff',
          }}
          title={'页面发生了错误'}
          extra={
            <>
              <div
                style={{
                  maxWidth: 1024,
                  textAlign: 'start',
                  backgroundColor: 'rgba(255,229,100,0.3)',
                  // borderInlineStartColor: '#ffe564',
                  // borderInlineStartWidth: '9px',
                  // borderInlineStartStyle: 'solid',
                  padding: '20px 26px 20px 26px',
                  margin: 'auto',
                  marginBlockEnd: '30px',
                  marginBlockStart: '20px',
                }}
              >
                <pre
                  style={{
                    textAlign: 'left',
                    fontSize: '1em',
                    overflow: 'auto',
                    margin: 0,
                  }}
                >
                  <code>{this.state.error.stack}</code>
                </pre>
              </div>
              <Button danger type={'primary'} onClick={() => window.location.reload()}>
                刷新页面
              </Button>
            </>
          }
        />
      );
    }
    return this.props.children;
  }
}

export default CustomErrorBoundary;
