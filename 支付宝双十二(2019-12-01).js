auto.waitFor();
var height = device.height;
var width = device.width;
toast("\n设备宽" + width + "\n" + "设备高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release);
setScreenMetrics(width, height);

var click_num = dialogs.rawInput("请输入点击红包的次数(留空为取消)", "");
if (isNaN(click_num)) {
    toast("输入有误，不执行点击红包!");
    click_num = "";
}
click(300, 300);

if (textContains("赚翻倍豆").exists()) {
    toast('开始赚翻倍豆');
    textContains("赚翻倍豆").click();
    var task_num = 0;
    textContains("做任务赚翻倍豆").waitFor();
    var wait_num = 1;
    while (true) {
        if (textContains("+1000").exists()) {
            task_click();
            continue;
        }
        wait_num++;
        if (wait_num > 5) {
            break;
        } else {
            swipe(width / 2, height - 50, width / 2, 0, 500);
        }
    }
    back_try();
    toast("做任务赚翻倍豆结束");
    toast("此次共赚" + task_num * 1000 + "个翻倍豆");
    click(1000, 725);

    if (click_num != null && click_num != "" && click_num != 0) {
        if (textContains("赚翻倍豆").exists()) {
            red_packet(click_num);
        } else {
            toast("位置异常，未能点击红包!");
        }
    }
} else {
    toast("请回到活动首页再折行脚本!");
}

toast("脚本结束");

function task_click() {
    if (text("再玩玩").exists()) {
        text("再玩玩").findOne().click();
    }
    textContains("+1000").findOne().click();
    toast("第" + (task_num++) + "个");
    var time = random(3000, 5000);
    sleep(time);
    back_try();
}

function red_packet(click_num) {
    toast('开始点击红包');
    var i = 0;
    while (true) {
        if (i >= click_num) {
            break;
        }
        press(556, 922, random(3000, 5000));
        sleep(1000);
        textContains("继续玩").waitFor();
        sleep(1000);
        textContains("继续玩").click();
        i++;
        toast("第" + i + "次");
    }
    toast('结束点击红包');
}

function back_try() {
    var wait_num = 0;
    while (!textContains("做任务赚翻倍豆").exists() && !textContains("赚翻倍豆").exists()) {
        if (wait_num > 10) {
            break;
        }
        if (text("再玩玩").exists()) {
            text("再玩玩").findOne().click();
        }
        if (text("拒绝").exists()) {
            text("拒绝").findOne().click();
        }
        if (text("取消").exists()) {
            text("取消").findOne().click();
        }
        back();
        sleep(1000);
        wait_num++;
    }
}