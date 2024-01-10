/*
 * @Author: rockclock noclrock@gmail.com
 * @Date: 2023-10-23 18:58:35
 * @LastEditors: rockclock noclrock@gmail.com
 * @LastEditTime: 2023-10-23 19:27:22
 * @FilePath: /test/example.test.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
const puppeteer = require("puppeteer");
// const { describe, beforeAll, it } = require("@jest/globals");
let page;
describe("网页登录后测试", () => {
    let browser;

    // 在每个测试用例前启动浏览器并打开页面
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            executablePath:
                "C:/Program Files/Google/Chrome/Application/chrome.exe",
            defaultViewport: {
                height: 1080,
                width: 1920,
                deviceScaleFactor: 1,
            },
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                // "--start-fullscreen",
            ],
        });

        page = await browser.newPage();
        // await page.setViewport({
        //     width: 1920,
        //     height: 1080,
        //     deviceScaleFactor: 0.8,
        // });

        await page.goto("https://dycharts.com/appv2/#/pages/home/index", {
            timeout: 0,
        });
        await page.click(".login-btns"); //点击登录按钮
        await page.click(".tip"); //点击验证码登录
        await page.click(".change-type"); //点击切换密码登录
        // 输入账号和密码并登录
        await page.type('input[name="username"]', "13000000008", {
            delay: 100,
        });
        await page.type('input[name="password"]', "000008", { delay: 100 });

        await page.click(".submit-btn"); //点击登录按钮
        await new Promise((resolve) => setTimeout(resolve, 4000));
        //await page.waitForNetworkIdle;
        await page.reload(); //点击刷新页面
        await new Promise((resolve) => setTimeout(resolve, 4000));
        const tuWenButton = "li.text div.img"; //定义项目管理中图文按钮
        await (await page.waitForSelector(tuWenButton)).click(); //点击图文项目按钮
        await new Promise((resolve) => setTimeout(resolve, 4000));
        await page.click("lx-tab-wrapper .tab-wrapper-item:first-child"); //点击新建项目
        await new Promise((resolve) => setTimeout(resolve, 4000));
        await page.click("ul.waterfall li.empty-style"); //点击空白模版
        browser.on("targetcreated", async (target) => {
            if (target.type() === "page") {
                // 在这里你可以操作新打开的页面（newPage）
                page = await target.page();
            }
        });
        await new Promise((resolve) => setTimeout(resolve, 7000));

        //const element = await page.$("span.d-flex-name");

        //await page.click('//*[@id="setName"]/span');
    }, 100 * 1000);

    // // 在每个测试用例后关闭浏览器
    // afterAll(async () => {
    //     await browser.close();
    // });

    it(
        "应正确显示网站名称",
        async () => {
            console.log(page.url());
            // 等待页面加载完全
            await page.waitForSelector(".d-flex-name"); // 用正确的 CSS 选择器替换

            // 获取网站名称文本
            const websiteName = await page.$eval(
                ".d-flex-name",
                (element) => element.innerText
            ); // 用正确的 CSS 选择器替换

            console.log(websiteName);
            // 断言网站名称是否正确
            expect(websiteName).toBe("未命名"); // 用您的网站名称替换

            // 可以添加其他断言来测试页面其他元素或功能
        },
        100 * 1000
    );
});
