auto.waitFor();
var height = device.height;
var width = device.width;
toast("\n设备宽" + width + "\n" + "设备高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release)
setScreenMetrics(width, height);

function lingqu() {
    click(547, 1264);//点猫  领金币

// //浏览15秒领金币
    sleep(1500);
    click(911, 1716);

    sleep(1500);
    if (text("签到").exists()) {
        text("签到").findOne().click();
        sleep(1600);
        toast("签到成功")
    }
    sleep(1500);
    while (text("去进店").exists()) {
        //要支持的动作
        toast("存在去进店");
        text("去进店").findOne().click();
        sleep(2500);
        swipe(width / 2, height - 600, width / 2, 0, 500);
        sleep(3500);
        swipe(width / 2, height - 600, width / 2, 0, 500);
        sleep(10000);
        swipe(width / 2, height - 600, width / 2, 0, 500);
        sleep(9000);
        back();
        sleep(1000);
    }
    while (text("去浏览").exists()) {
        //要支持的动作
        toast("存在去浏览");
        text("去浏览").findOne().click();
        sleep(1500);
        swipe(width / 2, height - 500, width / 2, 0, 500);
        sleep(2500);
        swipe(width / 2, height - 500, width / 2, 0, 500);
        sleep(10000);
        swipe(width / 2, height - 500, width / 2, 0, 500);
        sleep(8000);
        back();
        sleep(1600);
    }

    toast("结束");
}
