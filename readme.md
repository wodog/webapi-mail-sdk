## webapi-mail-sdk

与(webapi-mail)[https://github.com/wodog/webapi-mail]配套的sdk,
相关参数信息请参考它.

### Usage

* 需要webapi-mail服务
* 返回Promise对象

```
npm install --save webapi-mail-sdk
const mail = require('webapi-mail-sdk')(${webapi-mail服务主机地址})

mail.add({
	user: ${user},
	pass: ${pass},
	host: ${host},
	port: ${port}
}).then(function(data) {
	console.log(data);
}, function(err) {
	console.log(err);;
})

mail.update({
	...
})

mail.view({
	...
})

mail.remove({
	...
})

mail.send({
	...
})
```