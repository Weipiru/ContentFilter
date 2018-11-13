/**
 * Created by 丕汝 on 2018/11/13.
 */
$(function () {

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
        let keyWords = ['千图网', '千库网'];
      //  keyWords=chrome.storage.sync.get({"intercept_keyword":['千图网', '千库网']});

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