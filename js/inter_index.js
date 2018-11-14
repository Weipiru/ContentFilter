/**
 * Created by 丕汝 on 2018/11/13.
 */
$(function () {
    //监听消息
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log(request);
        //chrome.storage.sync.set({"key": keyWords}, function () {
        alert('保存成功');
// });

        sendResponse('接收成功');
    });


    let keyWords = ['千图网', '千库网'];
    chrome.storage.sync.get(['key'], function (data) {
        if (data['key']) {
            keyWords = data['key'];
        }
        console.log("加载关键字数量：" + keyWords.length);

    });
    console.log("关键字拦截服务启动成功!");
    let func = function () {
        console.log('interceptStation 扫描网页中...');
        initServer();
    };

    //监听全局ajax完成事件
    $('input[type=submit]').click(function () {
        let a = false;
        clearInterval(func);
        setInterval(func, 1000);
    });

    //页面加载完成时过滤一次信息
    initServer();

    function initServer() {
        let ls = $('.t');
        for (let i of ls) {
            let title = i.innerText;

            //匹配关键字
            for (let k of keyWords) {
                if (title.search(k) >= 0) {
                    let obj = i.parentNode;
                    obj = $(obj);
                    if (obj) {
                        obj.empty();
                        obj.addClass("wpr-blacklist");
                        obj.append(`<h3>一条结果已被折叠，拦截原因: 包含关键字:${k}</h3>`);
                    }
                }
            }
        }

    }

});