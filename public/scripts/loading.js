/**
 * loading 占位
 * 解决首次加载时白屏的问题
 */
(function () {
  /**
   * 清空加载状态。
   * 在打包成 tauri 的时候，偶尔会遇到这个 Loading 节点没有清空问题，因此需要加一些代码来自动清空这个 Loading 节点
   * @param doc
   */
  function removeLoading(doc) {
    if (!doc || doc.children.length === 0 || doc.innerHTML === '') {
      return;
    }
    const timer = setInterval(function () {
      const loadingElm = doc.querySelector('#load_resources_loading');
      if (loadingElm && doc.children.length > 1) {
        clearInterval(timer);
        doc.removeChild(loadingElm);
      } else if (!loadingElm) {
        clearInterval(timer);
      }
    }, 20);
  }

  /**
   * 初始化加载
   * @param doc
   */
  function setInitLoading(doc) {
    if (!doc) {
      return;
    }
    if (doc.childNodes.length === 0 || doc.children.length === 0 || doc.innerHTML === '') {
      doc.innerHTML = `
        <div id="load_resources_loading">
          <style>
            html,
            body,
            #root,
            #load_resources_loading {
              height: 100%;
              margin: 0;
              padding: 0;
              line-height: 1.15;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
                'Noto Sans', 'Noto Sans SC', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
                'Noto Color Emoji';
            }
            #root {
              background-repeat: no-repeat;
              background-size: 100% auto;
            }

            .loading-title {
              font-size: 1.1rem;
            }

            .loading-sub-title {
              margin-top: 20px;
              font-size: 1rem;
              color: #888;
            }

            .page-loading-warp {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 26px;
            }
            .ant-spin {
              position: absolute;
              display: none;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              color: #1677ff;
              font-size: 0;
              line-height: 1.5714285714285714;
              list-style: none;
              text-align: center;
              vertical-align: middle;
              opacity: 0;
              -webkit-transition: -webkit-transform 0.3s
                cubic-bezier(0.78, 0.14, 0.15, 0.86);
              transition: -webkit-transform 0.3s
                cubic-bezier(0.78, 0.14, 0.15, 0.86);
              transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
              transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
                -webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
            }

            .ant-spin-spinning {
              position: relative;
              display: inline-block;
              opacity: 1;
            }

            .ant-spin-dot-holder {
              width: 1em;
              height: 1em;
              display: inline-block;
              transition: transform 0.3s ease,opacity 0.3s ease;
              transform-origin: 50% 50%;
              line-height: 1;
              color: #1677ff;
              font-size: 32px;
            }

            .ant-spin-dot {
              position: relative;
              display: inline-block;
              width: 20px;
              height: 20px;
              font-size: 20px;
            }

            .ant-spin-dot-item {
              position: absolute;
              display: block;
              width: 9px;
              height: 9px;
              background-color: #1890ff;
              border-radius: 100%;
              -webkit-transform: scale(0.75);
              -ms-transform: scale(0.75);
              transform: scale(0.75);
              -webkit-transform-origin: 50% 50%;
              -ms-transform-origin: 50% 50%;
              transform-origin: 50% 50%;
              opacity: 0.3;
              -webkit-animation: antspinmove 1s infinite linear alternate;
              animation: antSpinMove 1s infinite linear alternate;
            }

            .ant-spin-dot-item:nth-child(1) {
              top: 0;
              left: 0;
            }

            .ant-spin-dot-item:nth-child(2) {
              top: 0;
              right: 0;
              -webkit-animation-delay: 0.4s;
              animation-delay: 0.4s;
            }

            .ant-spin-dot-item:nth-child(3) {
              right: 0;
              bottom: 0;
              -webkit-animation-delay: 0.8s;
              animation-delay: 0.8s;
            }

            .ant-spin-dot-item:nth-child(4) {
              bottom: 0;
              left: 0;
              -webkit-animation-delay: 1.2s;
              animation-delay: 1.2s;
            }

            .ant-spin-dot-spin {
              -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              transform: rotate(45deg);
              -webkit-animation: antrotate 1.2s infinite linear;
              animation: antRotate 1.2s infinite linear;
            }

            .ant-spin-lg .ant-spin-dot {
              width: 32px;
              height: 32px;
              font-size: 32px;
            }

            .ant-spin-lg .ant-spin-dot i {
              width: 14px;
              height: 14px;
            }

            @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
              .ant-spin-blur {
                background: #fff;
                opacity: 0.5;
              }
            }

            @-webkit-keyframes antSpinMove {
              to {
                opacity: 1;
              }
            }

            @keyframes antSpinMove {
              to {
                opacity: 1;
              }
            }

            @-webkit-keyframes antRotate {
              to {
                -webkit-transform: rotate(405deg);
                transform: rotate(405deg);
              }
            }

            @keyframes antRotate {
              to {
                -webkit-transform: rotate(405deg);
                transform: rotate(405deg);
              }
            }
          </style>

          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            min-height: 362px;
          ">
            <div class="page-loading-warp">
              <div class="ant-spin ant-spin-lg ant-spin-spinning">
                <span class="ant-spin-dot-holder">
                  <span class="ant-spin-dot ant-spin-dot-spin">
                    <i class="ant-spin-dot-item"></i>
                    <i class="ant-spin-dot-item"></i>
                    <i class="ant-spin-dot-item"></i>
                    <i class="ant-spin-dot-item"></i>
                  </span>
                </span>
              </div>
            </div>
            <div class="loading-title">
              正在加载资源
            </div>
            <div class="loading-sub-title">
              初次加载资源可能需要较多时间，请耐心等待
            </div>
          </div>
        </div>
    `;
    }
  }

  const _root = document.getElementById('root');
  if (_root) {
    setInitLoading(_root);
    removeLoading(_root);
  } else {
    const timer = setInterval(function () {
      const _root = document.getElementById('root');
      if (_root) {
        clearInterval(timer);
        setInitLoading(_root);
        removeLoading(_root);
      }
    }, 50);
  }
})();
