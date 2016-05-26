'use strict';

const fetch = require('node-fetch');
const co = require('co');
const assert = require('assert');
const querystring = require('querystring');

const Mail_sdk = module.exports = function(host) {
    assert(host, '参数host必须存在');
    assert(typeof host === 'string', '参数host必须是字符串');

    if (!(this instanceof Mail_sdk)) {
        return new Mail_sdk(host);
    }

    this.host = host;
};

Mail_sdk.prototype.add = function(obj) {
	const _url = this.host + '/add';
	return execution(_url, obj);
};

Mail_sdk.prototype.update = function(obj) {
	const _url = this.host + '/update';
	return execution(_url, obj);
};

Mail_sdk.prototype.view = function(obj) {
	const _url = this.host + '/view';
	return execution(_url, obj);
};

Mail_sdk.prototype.remove = function(obj) {
	const _url = this.host + '/remove';
	return execution(_url, obj);
};

Mail_sdk.prototype.send = function(obj) {
	const _url = this.host + '/send';
	return execution(_url, obj);
};


function execution (_url, obj) {
	const _body = querystring.stringify(obj);
    return co(function*() {
    	const res = yield fetch(_url, {method: 'POST', body: _body, headers: {'content-type': 'application/x-www-form-urlencoded'}});
    	const json = yield res.json();
    	return json;
    });
}