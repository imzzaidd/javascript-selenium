const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'http://example.com/login';
    this.usernameInput = By.name('username');
    this.passwordInput = By.name('password');
    this.loginButton = By.id('login-button');
    this.welcomeMessage = By.id('welcome-message');
  }

  async open() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.usernameInput));
  }

  async login(username, password) {
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }

  async getWelcomeMessage() {
    await this.driver.wait(until.elementLocated(this.welcomeMessage));
    const welcomeElement = await this.driver.findElement(this.welcomeMessage);
    return welcomeElement.getText();
  }
}

module.exports = LoginPage;
