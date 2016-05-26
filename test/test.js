'use strict';

const assert = require('assert');
const co = require('co');

describe('测试构造函数', function() {

    it('需要传入host参数', function() {
        assert.throws(function() {
            require('../')();
        });
    });

    it('host参数是String', function() {
        assert.throws(function() {
            require('../')(123);
        });

        assert.throws(function() {
            require('../')({});
        });

        assert.throws(function() {
            require('../')(undefined);
        });
    });
});


describe('测试功能', function() {
    var mail_sdk;
    var api_key;

    before(function(done) {
        mail_sdk = require('../')('http://localhost:3000');
        done();
    });

    it('add', function() {
        return co(function*() {
            const res = yield mail_sdk.add({
                user: 'qqq536505032@163.com',
                pass: 'qq536505032',
                host: 'smtp.163.com',
                port: 465
            });

            assert.deepEqual(res.code, 0, res.data);
            assert.deepEqual(res.msg, 'success');
            assert(res.data.api_key);
            api_key = res.data.api_key;
        });
    });

    it('update', function() {
        return co(function*() {
            const res = yield mail_sdk.update({
                api_key: api_key,
                name: 'wodog'
            });

            assert.deepEqual(res.code, 0, res.data);
            assert.deepEqual(res.msg, 'success');
            assert.deepEqual(res.data, {
                user: 'qqq536505032@163.com',
                host: 'smtp.163.com',
                port: 465,
                name: 'wodog',
                pool: false,
                secure: true
            });
        });
    });

    it('view', function() {
        return co(function*() {
            const res = yield mail_sdk.view({
                api_key: api_key
            });

            assert.deepEqual(res.code, 0, res.data);
            assert.deepEqual(res.msg, 'success');
            assert.deepEqual(res.data.user, 'qqq536505032@163.com');
            assert.deepEqual(res.data.host, 'smtp.163.com');
            assert.deepEqual(res.data.port, 465);
            assert.deepEqual(res.data.name, 'wodog');
            assert.deepEqual(res.data.pool, false);
            assert.deepEqual(res.data.secure, true);
            assert.ok(res.data.create_at);
            assert.ok(res.data.update_at);
        });
    });

    it('send', function() {
        return co(function*() {
            const res = yield mail_sdk.send({
                api_key: api_key,
                to: ['qqq536505032@163.com', 'zhoucy@trendwood.cn'],
                subject: '测试主题',
                html: '<p>测试内容</p>'
            });

            assert.deepEqual(res.code, 0, res.data);
            assert.deepEqual(res.msg, 'success');
            assert.deepEqual(res.data, '邮件发送成功');
        });
    });

    it('remove', function() {
        return co(function*() {
            const res = yield mail_sdk.remove({
                api_key: api_key
            });
            
            assert.deepEqual(res.code, 0, res.data);
            assert.deepEqual(res.msg, 'success');
            assert.deepEqual(res.data, '删除成功');
        });
    });
});
