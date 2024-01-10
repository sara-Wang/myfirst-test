const puppeteer = require("puppeteer");

//读取保存在cookiesjson 文件中的Cookies文件
const fs = require("fs");
const cookies = JSON.parse(fs.readFileSync("cookies.json", "utf-8"));
//const { waitPageChangeWithClick } = require("./utils");

let page;
describe("镝数图表通过模版页新建图文模版后点击保存", () => {
    let browser;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            executablePath:
                "C:/Program Files/Google/Chrome/Application/chrome.exe",
            defaultViewport: {
                height: 1080,
                width: 1920,
            },
        }); // 可视化浏览器
        page = await browser.newPage();
        await page.goto("https://dycharts.com/appv2/#/pages/home/index", {
            timeout: 0,
        });
        //将cookies.json文件中的cookies获取到此页面无需登录了
        for (const cookie of cookies) {
            await page.setCookie(cookie);
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));

        await page.reload(); //点击刷新页面
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const dataTuwenButton = "li.info-template div.img"; //定义数据图文列表按钮 class定位

        await (await page.waitForSelector(dataTuwenButton)).click(); //点击数据图文按钮，打开模版
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const templateList8 = "ul.waterfall li:nth-child(8)"; //定义图文模版列表的第5个
        //await page.waitForSelector(templateList5);
        //await page.click(templateList5);
        //点击图文模版后跳转到详情页，捕获详情页地址并切换到模版详情页
        await waitPageChangeWithClick(browser, page, templateList8);

        //到新页面后等待立即编辑元素出现并点击按钮
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const onceEditButton = "item-share span:nth-child(1)";
        console.log("wait template item"); //调试打印当前页地址为编辑器页面
        await page.waitForSelector(onceEditButton, { timeout: 30000 }); //等待立即编辑按钮

        await page.click(onceEditButton);

        // await waitPageChangeWithClick(browser, page, onceEditButton);
        // await new Promise((resolve) => setTimeout(resolve, 8000));
        // const workspaceSaveButton = "div.saving-state span"; //定义保存按钮元素
        // await (await page.waitForSelector(workspaceSaveButton)).click(); //点击保存按钮

        //await page.$(templateList5).click(); //点击第5个模版到详情页
        //const editNow = ".item-share";
        //await (await page.waitForSelector(editNow)).click();
        //console.log(page.url());
    }, 100 * 1000);

    afterAll(async () => {
        console.log("window close");
        await browser.close();
    });

    // it("点击保存按钮后提示保存成功", async () => {
    //     // 检查图表文本
    //     await page.click(workspaceSaveButton);
    //     const saveSuccess = "div.saving-state div.loaded";
    //     await page.waitForSelector(saveSuccess, { timeout: 10000 });
    //     const saveSuccessText = await page.$eval(
    //         returnTemplateList,
    //         (element) => element.textContent
    //     );

    //     console.log(saveSuccessText);
    //     expect(returnTemplateButton).toContain("保存成功"); //
    // }, 300000);
    it("进入模版详情页成功存在文案返回模版首页", async () => {
        // 检查图表文本
        console.log("wait title text");
        const returnTemplateList = "div.back";
        await page.waitForSelector(returnTemplateList, { timeout: 10000 });
        const returnTemplateButton = await page.$eval(
            returnTemplateList,
            (element) => element.textContent
        );

        console.log(returnTemplateButton);
        expect(returnTemplateButton).toContain("返回模版首页"); //
    }, 300000);
});

//封装：点击后跳转新页面，捕获新页面地址
function waitPageChangeWithClick(browser, page, clickSelector) {
    return new Promise((reslove) => {
        browser.on("targetcreated", async (target) => {
            if (target.type() === "page") {
                // 在这里你可以操作新打开的页面（newPage）
                page = await target.page();
                console.log("page changed", page.url());
                reslove(page);
            }
        });
        page.click(clickSelector); //鼠标点击编辑按钮
    });
}
