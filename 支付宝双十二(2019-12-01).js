auto.waitFor();
var height = device.height;
var width = device.width;
toast("\n设备宽" + width + "\n" + "设备高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release);
setScreenMetrics(width, height);

var is_task = confirm("是否要做任务赚豆豆?");
var click_num = dialogs.rawInput("请输入点击红包的次数(留空为取消)", "");
if (isNaN(click_num)) {
    toast("输入有误，不执行点击红包!");
    click_num = "";
}
click(300, 600);

var button = is_index();
if (button != null) {
    var red_package_temp = className("android.widget.Image").depth(14).findOne();
    var red_package = red_package_temp.parent().child(3).bounds();
    
    if (is_task) {
        button.click();

        var task_num = 0;
        textContains("做任务赚翻倍豆").waitFor();
        var b = textContains("做任务赚翻倍豆").findOne().bounds();

        var wait_num = 1;
        var find_num = 0;
        while (true) {
            let item = textEndsWith("+1000").findOnce(find_num);
            if (item != null) {
                if (item.parent().child(2).text() != "已完成") {
                    task_click("+1000", find_num);
                    task_num++;
                    toast("第" + task_num + "个");
                    find_num = 0;
                } else {
                    find_num++;
                }
                continue;
            }
            wait_num++;
            if (wait_num > 5) {
                break;
            } else {
                swipe(width / 2, height / 2 + 300, width / 2, height / 2, 500);
            }
        }

        var wait_num = 1;
        var find_num = 0;
        while (true) {
            let item = textEndsWith("+2000").findOnce(find_num);
            if (item != null) {
                if (item.parent().child(2).text() != "已完成") {
                    task_click("+2000", find_num);
                    task_num++;
                    toast("第" + task_num + "个");
                    find_num = 0;
                } else {
                    find_num++;
                }
                continue;
            }
            wait_num++;
            if (wait_num > 5) {
                break;
            } else {
                swipe(width / 2, height / 2 + 300, width / 2, height / 2, 500);
            }
        }
        
        back_try();
        toast("做任务赚翻倍豆结束");
        toast("此次共赚" + task_num * 2000 + "个翻倍豆");
        click(width - 70, b.centerY());
    }

    if (click_num != null && click_num != "" && click_num != 0) {
        var button_2 = is_index();
        if (button_2 != null) {
            red_packet(red_package, click_num);
        } else {
            toast("位置异常，未能点击红包!");
        }
    }
} else {
    toast("请回到活动首页再折行脚本!");
}

toast("脚本结束");

function is_index() {
    if (textContains("翻倍豆限时加量").exists()) {
        return textContains("翻倍豆限时加量");
    } else {
        if (textContains("我的翻倍豆").exists()) {
            let one = textContains("我的翻倍豆").findOne().parent().child(3);
            return one;
        } else {
            if (textContains("获得瓜分资格后").exists()) {
                let two = textContains("获得瓜分资格后").findOne().parent().child(3);
                return two;
            } else {
                return null;
            }
        }
    }
}

function task_click(quota, find_num) {
    if (text("再玩玩").exists()) {
        text("再玩玩").findOne().click();
    }
    let item = textEndsWith(quota).findOnce(find_num);
    item.parent().child(2).click();
    let time = random(3000, 5000);
    sleep(time);
    back_try();
}

function red_packet(red_package, click_num) {
    toast('开始点击红包');
    var i = 0;
    while (true) {
        if (i >= click_num) {
            break;
        }
        press(red_package.centerX(), red_package.centerY(), random(3000, 5000));
        sleep(1000);
        textContains("继续玩").waitFor();
        sleep(1000);
        textContains("继续玩").click();
        i++;
        toast("第" + i + "次");
        click(300, 300);
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
        if (text("取消").exists()) {
            text("取消").findOne().click();
        }
        if (textContains("授权").exists()) {
            textContains("授权").findOne().click();
        }
        back();
        sleep(1000);
        wait_num++;
    }
}
