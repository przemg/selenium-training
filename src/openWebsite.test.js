const { Builder } = require("selenium-webdriver");
const driver = new Builder().forBrowser("chrome").build();

(async function openWebsite() {
  try {
    await driver.get("https://codeally.io/");

    const websiteTitle = await driver.getTitle();

    console.log(
      `Open https://codeally.io - ${
        websiteTitle.toLowerCase().includes("codeally")
          ? "Success"
          : `Failed (received title - ${websiteTitle})`
      }`
    );
  } finally {
    await driver.quit();
  }
})();
