'use strict';

const fetch = require('node-fetch');
const co = require('co');
const assert = require('assert');
const qs = require('qs');

const Mail_sdk = module.exports = function(host) {
    assert(host, '参数host必须存在');
    assert(typeof host === 'string', '参数host必须是字符串');
    if (!(this instanceof Mail_sdk)) {
        return new Mail_sdk(host);
    }
    this.host = host;
};

/**
 * POST /users?action=create
 * 创建用户
 * 
 * @param {Object} 参数
 * @return {Promise} [description]
 */
Mail_sdk.prototype.addUser = function(obj) {
    const _url = this.host + '/users?action=create';
    return executionRequest(_url, obj);
};

/**
 * POST /users?action=update
 * 更新用户
 * 
 * @param  {Object} 参数
 * @return {Promise}
 */
Mail_sdk.prototype.updateUser = function(obj) {
    const _url = this.host + '/users?action=update';
    return executionRequest(_url, obj);
};

/**
 * POST /users/:api_key
 * 查找单个用户
 * 
 * @param  {Object} 参数
 * @return {Promise}
 */
Mail_sdk.prototype.findUser = function(obj) {
    const _url = this.host + '/users/' + obj.api_key;
    delete obj.api_key;
    return executionRequest(_url, obj);
};

/**
 * POST /users?action=remove
 * 删除用户
 * 
 * @param  {Object} 参数
 * @return {Promise} 
 */
Mail_sdk.prototype.removeUser = function(obj) {
    const _url = this.host + '/users?action=remove';
    return executionRequest(_url, obj);
};

/**
 * POST /templates/:name
 * 查找单个模版
 * 
 * @param  {Object} 参数
 * @return {Promise}
 */
Mail_sdk.prototype.findTemplate = function(obj) {
	const _url = this.host + '/templates/' + obj.name;
	delete obj.name;
	return executionRequest(_url, obj);
};

/**
 * POST /templates
 * 查找多个模版
 * 
 * @param  {Object} 参数
 * @return {Promise}
 */
Mail_sdk.prototype.findTemplates = function(obj) {
	const _url = this.host + '/templates';
	return executionRequest(_url, obj);
};

/**
 * POST /templates?action=create
 * 创建模版
 * 
 * @param {Object} 参数
 * @return {Promise}
 */
Mail_sdk.prototype.addTemplate = function(obj) {
	const _url = this.host + '/templates?action=create';
	return executionRequest(_url, obj);
};

/**
 * POST /templates?action=update
 * 更新模版
 * 
 * @param  {Object} 参数
 * @return {Promise}
 */
Mail_sdk.prototype.updateTemplate = function(obj) {
	const _url = this.host + '/templates?action=update';
	return executionRequest(_url, obj);
};

/**
 * POST /templates?action=remove
 * 删除模版
 * 
 * @param  {Object} 参数
 * @return {Promise}
 */
Mail_sdk.prototype.removeTemplate = function(obj) {
	const _url = this.host + '/templates?action=remove';
	return executionRequest(_url, obj);
};

/**
 * POST /mail?action=send_with_html
 * 发送html邮件
 * 
 * @param  {Object} 参数
 * @return {Promise}
 */
Mail_sdk.prototype.sendWithHtml = function(obj) {
	const _url = this.host + '/mail?action=send_with_html';
	return executionRequest(_url, obj);
};

/**
 * POST /mail?action=send_with_text
 * 发送text邮件
 * 
 * @param  {Object} 参数
 * @return {Promise}
 */
Mail_sdk.prototype.sendWithText = function(obj) {
	const _url = this.host + '/mail?action=send_with_text';
	return executionRequest(_url, obj);
};

/**
 * POST /mail?action=send_with_template
 * 发送模版邮件
 * 
 * @param  {Object} 参数
 * @return {Promise}
 */
Mail_sdk.prototype.sendWithTemplate = function(obj) {
	const _url = this.host + '/mail?action=send_with_template';
	return executionRequest(_url, obj);
};

function executionRequest(_url, obj) {
    const _body = qs.stringify(obj);
    return co(function*() {
        const res = yield fetch(_url, { method: 'POST', body: _body, headers: { 'content-type': 'application/x-www-form-urlencoded' } });
        const json = yield res.json();
        return json;
    });
}
