
# persagy-sdk

`微信、钉钉常用的api服务`

install

```bash
npm install persagy-sdk
```
## 钉钉

usage

```javascript
import {dingding} from "persagy-sdk"

实例化sdk类
const dd = new dingding(appKey, appSecret)
```

### 获取access_token

```javascript
getAccessToken(): Promise<IToken>
```
### 获取用户ID

```javascript
getUserId(code: string, token?: string)
```

### 获取用户信息

```javascript
getUser(code: string, token?: string)
```

#####  前端获取code代码示例

```javascript
import * as dd from 'dingtalk-jsapi';
const corpId = 'xx'; // 企业corpId
dd.ready(()=>{
    dd.runtime.permission.requestAuthCode({
        corpId: corpId,
        onSuccess:  (info)=> {
            const {code} = info;
        },
        onFail:  (err)=> {
            console.log(err)
        }
    });
});
```

## 微信

usage

```javascript
import {weixin} from "persagy-sdk"

实例化sdk类
const wx = new weixin(appId, appSecret)
```

### 获取access_token

```javascript
getAccessToken(): Promise<IToken>
```

### 获取用户信息

```javascript
getUser(code: string)
```
#####  前端获取code代码示例

```javascript
公众号里设置菜单地址为url, 微信会跳转到redirect_uri并在地址栏上拼接code参数
const appid='xx'; //微信的appid
const redirect_uri='xx'; //微信的回调页面
const url = https://open.weixin.qq.com/connect/oauth2/authorize?appid=appid&redirect_uri=redirect_uri&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
```
## 关于跨域

> 如果web端直接使用的话，会存在跨域的问题，可以在实例化类的时候多传入一个proxy的参数，proxy为 nginx代理配置。

```javascript
import {dingding} from "persagy-sdk"
实例化sdk类
const dd = new dingding(appKey,  appSecret, proxy)
```

nginx配置示例

```bash
    # 钉钉服务代理
    location /dingding/ {
      proxy_pass https://oapi.dingtalk.com/;
    }
     # 微信服务代理
    location /weixin/ {
      proxy_pass https://api.weixin.qq.com/;
    }
```

