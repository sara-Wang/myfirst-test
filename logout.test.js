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
        // 进行登录操作，例如填写用户名和密码，点击登录按钮
        // 请使用 page.type、page.click 或其他 Puppeteer 方法来模拟登录操作
        // await page.waitForNavigation();
        // await page.click(".login-btns"); //点击登录按钮
        // await page.click(".tip"); //点击验证码登录
        // await page.click(".change-type"); //点击切换密码登录
        // // 输入账号和密码并登录
        // await page.type('input[name="username"]', "13000000001", {
        //     delay: 100,
        // });
        // await page.type('input[name="password"]', "000001", { delay: 100 });

        // await page.click(".submit-btn"); //点击登录按钮
        await new Promise((resolve) => setTimeout(resolve, 4000));
        //await page.waitForNetworkIdle;

        //将cookies.json文件中的cookies获取到此页面
        for (const cookie of cookies) {
            await page.setCookie(cookie);
        }

        await page.reload(); //点击刷新页面
        await new Promise((resolve) => setTimeout(resolve, 5000));

        //滚动页面屏幕
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight * 2);
        });

        const loginLogo = ".rounded-circle";
        await (await page.waitForSelector(loginLogo)).click(); //点击右上角个人头像
        console.log("loginlogo");
        await new Promise((resolve) => setTimeout(resolve, 3000));

        //const logoutButton = document.querySelector("ul li:nth-child(7)");  '.user-dropdown .ng-star-inserted:last-child'
        //await page.hover("ul.user-dropdown li:last-child");
        //await page.$(".ul.user-dropdown");  //通过class属性定位
        const logoutButton = "ul.user-dropdown li:nth-child(7)"; //退出登录 元素
        await (await page.waitForSelector(logoutButton)).click();
        await new Promise((resolve) => setTimeout(resolve, 5000));
    });

    afterAll(async () => {
        await browser.close();
    });

    test(
        "退出后断言登录按钮是否存在",
        async () => {
            // 判断退出按钮是否存在
            const logoutButtonText = await page.$eval(
                ".login-btns",
                (button) => button.textContent
            );
            console.log(logoutButtonText);
            expect(logoutButtonText).toContain("登录/注册"); // 替换为实际退出按钮文本
        },
        100 * 1000
    );
});
