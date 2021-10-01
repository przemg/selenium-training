const { Builder, By, until, withTagName, Key } = require("selenium-webdriver");
require("dotenv").config({ path: "../.env" });

const githubUser = {
  name: process.env.GITHUB_NAME,
  password: process.env.GITHUB_PASSWORD,
};

const driver = new Builder().forBrowser("chrome").build();

(async function loginViaGithub() {
  try {
    await driver.get("https://codeally.io/");

    console.log("Open https://codeally.io/: Success");

    const cookiesAcceptButton = await driver.wait(
      until.elementLocated(
        By.css(".cky-consent-bar .cky-button-wrapper .cky-btn-accept")
      )
    );
    await cookiesAcceptButton.click();

    console.log("Cookies accepted: Success");

    await driver.findElement(By.css("header a[href='/developers']")).click();

    console.log("Go to developers section: Success");

    const loginButton = await driver.wait(
      until.elementLocated(By.linkText("Login with Github"))
    );

    await loginButton.click();

    console.log("Click 'Login with Github' button: Success");

    const githubLoginField = await driver.wait(
      until.elementLocated(By.id("login_field"))
    );
    await githubLoginField.sendKeys(githubUser.name);

    const githubPasswordField = await driver.findElement(
      withTagName("input").below(githubLoginField)
    );
    githubPasswordField.sendKeys(githubUser.password, Key.ENTER);

    console.log("Log into Github account: Success");

    try {
      const githubConfirmButton = await driver.wait(
        until.elementLocated(By.css("button#js-oauth-authorize-btn:enabled")),
        10000
      );
      await githubConfirmButton.click();

      console.log("Authorize with Github: Success");
    } catch (e) {
      console.log("Authorize with Github: Skipped");
    } finally {
      const tasks = await driver.wait(
        until.elementsLocated(
          By.xpath("//div[starts-with(@class, 'CodeAllyTests')]/button")
        )
      );
      await tasks[0].click();

      console.log("Go to first task: Success");

      const acceptChallengeButton = await driver.wait(
        until.elementLocated(By.id("LinkButtonAccept challenge"))
      );
      await acceptChallengeButton.click();

      console.log("Accept challenge: Success");

      const startAssessmentButton = await driver.wait(
        until.elementLocated(By.css("button#StyledButton"))
      );
      await startAssessmentButton.click();

      console.log("Start assessment: Success");
    }
  } finally {
    await driver.quit();
  }
})();
