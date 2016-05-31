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
    let mail_sdk;
    let api_key;

    before(function(done) {
        mail_sdk = require('../')('http://localhost:3000');
        done();
    });

    it('addUser', function() {
        return co(function*() {
            const res = yield mail_sdk.addUser({
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

    it('updateUser', function() {
        return co(function*() {
            const res = yield mail_sdk.updateUser({
                api_key: api_key,
                name: 'wodog'
            });

            assert.deepEqual(res.code, 0, res.data);
            assert.deepEqual(res.msg, 'success');
        });
    });

    it('findUser', function() {
        return co(function*() {
            const res = yield mail_sdk.findUser({
                api_key: api_key
            });

            assert.deepEqual(res.code, 0, res.data);
        });
    });

    it('addTemplate', function() {
        return co(function*() {
            const name = 'test';
            const content = 'test_content';
            const res = yield mail_sdk.addTemplate({ api_key, name, content });
            assert.deepEqual(0, res.code, res.data);
        });
    });

    it('updateTemplate', function() {
        return co(function*() {
            const name = 'test';
            const content = '<h1>${hello}</h1>';
            const res = yield mail_sdk.updateTemplate({ api_key, name, content });
            assert.deepEqual(0, res.code, res.data);
        });
    });

    it('findTemplate', function() {
        return co(function*() {
            const name = 'test';
            const res = yield mail_sdk.findTemplate({ api_key, name });
            assert.deepEqual(0, res.code, res.data);
        });
    });

    it('findTemplates', function() {
        return co(function*() {
            const res = yield mail_sdk.findTemplates({ api_key });
            assert.deepEqual(0, res.code, res.data);
        });
    });

    it('sendWithHtml', function() {
        return co(function*() {
            const to = 'zhoucy@trendwood.cn';
            const subject = '测试sendWithHtml标题';
            const html = '<h1>测试sendWithHtml内容</h1>';
            const res = yield mail_sdk.sendWithHtml({ api_key, to, subject, html });
            assert.deepEqual(0, res.code, res.data);
        });
    });

    it('sendWithText', function() {
        return co(function*() {
            const to = 'zhoucy@trendwood.cn';
            const subject = '测试sendWithText标题';
            const text = '<h1>测试sendWithHtml内容</h1>';
            const res = yield mail_sdk.sendWithText({ api_key, to, subject, text });
            assert.deepEqual(0, res.code, res.data);
        });
    });

    it('sendWithTemplate', function() {
        return co(function*() {
            const to = 'zhoucy@trendwood.cn';
            const subject = '测试sendWithTemplate标题';
            const name = 'test';
            const data = { "hello": "hello world" };
            const res = yield mail_sdk.sendWithTemplate({ api_key, to, subject, name, data });
            assert.deepEqual(0, res.code, res.data);
        });
    });


    it('removeTemplate', function() {
        return co(function*() {
            const name = 'test';
            const res = yield mail_sdk.removeTemplate({ api_key, name });
            assert.deepEqual(0, res.code, res.data);
        });
    });

    it('removeUser', function() {
        return co(function*() {
            const res = yield mail_sdk.removeUser({
                api_key: api_key
            });

            assert.deepEqual(res.code, 0, res.data);
            assert.deepEqual(res.msg, 'success');
            assert.deepEqual(res.data, '删除成功');
        });
    });
});
