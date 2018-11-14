/**
 * Created by 丕汝 on 2018/11/13.
 */

function sendMessageToContentScript(message, callback) {
    //这里的url填写要操作的页面,我是要操作的微信文章页
    chrome.tabs.query({url:"*://*.baidu.com/*"}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
};

function sendMsg(data) {
    sendMessageToContentScript(data, function (resp) {
        console.log('来自content的回复：' + resp);
    })
}
