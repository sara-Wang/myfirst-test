const puppeteer = require("puppeteer");
// const { describe, beforeAll, it } = require("@jest/globals");
let page;
describe("主站手动微信登录测试", () => {
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

        await page.goto("https://dycharts.com/appv2/#/pages/home/index", {
            timeout: 0,
        });
        await new Promise((resolve) => setTimeout(resolve, 8000));
        await page.click(".login-btns"); //点击登录按钮
        //这一步需手机端自己扫码登录
        await new Promise((resolve) => setTimeout(resolve, 8000)); //强制等待
        await page.reload(); //点击刷新页面
        //保存登录状态
        const cookies = await page.cookies();
        console.log(cookies);
        const fs = require("fs");
        fs.writeFileSync("cookies.json", JSON.stringify(cookies, null, 2));
    }, 100 * 1000);

    // // 在每个测试用例后关闭浏览器
    afterAll(async () => {
        await browser.close();
    });

    it("登录成功后左下角出现个人空间", async () => {
        // 执行登录操作

        await page.waitForSelector(".enterprise-eip"); // 等待个人空间的元素加载 class定位“xx的个人空间”

        // 获取网站左下角控件
        const singerSpaceName = await page.$eval(
            ".enterprise-eip span",
            (element) => element.innerText
        );

        console.log(singerSpaceName);
        // 断言空间名称是否正确
        expect(singerSpaceName).toContain("个人空间");
    });
});
