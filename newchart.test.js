const puppeteer = require("puppeteer");
//读取保存在cookiesjson 文件中的Cookies文件
const fs = require("fs");
const cookies = JSON.parse(fs.readFileSync("cookies.json", "utf-8"));

let page;
describe("镝数图表登录和退出测试", () => {
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
        }); // 镝数图表网址
        //将cookies.json文件中的cookies获取到此页
        for (const cookie of cookies) {
            await page.setCookie(cookie);
        }
        await new Promise((resolve) => setTimeout(resolve, 8000));

        await page.reload(); //点击刷新页面
        //将cookies.json文件中的cookies获取到此页
        // for (const cookie of cookies) {
        //     await page.setCookie(cookie);
        // }
        await (await page.waitForSelector(".chart")).click(); //点击项目管理器中的标题图表

        await new Promise((resolve) => setTimeout(resolve, 8000)); //等待元素加载

        await page.waitForSelector("div.file", { timeout: 300000 });
        await page.hover("div.file"); //鼠标悬浮在项目文件上
        const chartEditButton = ".edit:first-child "; //定义项目管理器中图表上的编辑按钮
        page = await waitPageChangeWithClick(browser, page, chartEditButton); //鼠标点击编辑按钮后浏览器跳转进入新页面，新页面赋值给page

        const FirstAChart = ".template-item"; //id 定义首个动态图表元素
        console.log("wait first template item", page.url()); //调试打印当前页地址为编辑器页面
        await page.waitForSelector(FirstAChart);
        await page.hover(FirstAChart);
        await page.click(FirstAChart); //悬浮并点击当前图表 即可插入首个动态图表

        const sureReplaceChart = ".bottom-box .right"; //定义是否“插入图表”弹窗中的确认按钮
        await (await page.waitForSelector(sureReplaceChart)).click(); //等待元素加载并点击
    }, 300000);

    afterAll(async () => {
        console.log("window close");
        await browser.close();
    });

    // it("断言插入首个动图成功", async () => {
    //     // 检查 等待页面上的首个动态图表元素出现后并获取其文本标题
    //     const firstChartText = await page
    //         .waitForSelector("div.chart-type", { timeout: 10000 })
    //         .then((element) => element.textContent);

    //     console.log(firstChartText);
    //     expect(firstChartText).toContain("动态排名变化图"); //
    // }, 300000);
    it("断言插入首个动图成功", async () => {
        // 检查图表文本
        console.log("wait title text");
        await page.waitForSelector(".title-text", { timeout: 10000 });
        const firstChartText = await page.$eval(
            ".title-text",
            (element) => element.textContent
        );

        console.log(firstChartText);
        expect(firstChartText).toContain("2018年中国高温省会城市排名"); //
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
