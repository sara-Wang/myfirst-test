// async function waitPageChangeWithClick(browser, page, clickSelector) {
//     return new Promise((resolve) => {
//         browser.on("targetcreated", async (target) => {
//             if (target.type() === "page") {
//                 page = await target.page();
//                 resolve(page);
//             }
//         });
//         page.click(clickSelector);
//     });
// }
