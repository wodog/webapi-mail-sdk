## webapi-mail-sdk

与[webapi-mail](https://github.com/wodog/webapi-mail)配套的sdk,
相关参数信息请参考它.

### Usage

* 需要webapi-mail服务
* 返回Promise对象

```
// 安装
npm install --save webapi-mail-sdk

// 引入模块
const mail = require('webapi-mail-sdk')(${webapi-mail服务主机地址})

mail.addUser({
	user: ${user},
	pass: ${pass},
	host: ${host},
	port: ${port}
}).then(function(data) {
	console.log(data);
}, function(err) {
	console.log(err);;
})

mail.sendWithHtml({
	...
})

```

** API 

* addUser(data)
  创建用户
* updateUser(data)
  更新用户
* findUser(data)
  查找用户
* removeUser(data)
  删除用户

* addTemplate(data)
  增加模版
* updateTemplate(data)
  更新模版
* findTemplate(data)
  查找单个模版
* findTemplates(data)
  查找所有模版
* removeTemplate(data)
  删除模版

* sendWithHtml(data)
  发送html邮件
* sendWithText(data)
  发送text邮件
* sendWithTemplate(data)
  发送模版邮件