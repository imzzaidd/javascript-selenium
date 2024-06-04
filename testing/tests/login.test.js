import('chai').then(chai => {
    const { expect } = chai.default;
  
    describe('Login Test', function () {
      this.timeout(30000); 
  
      let driver;
  
      before(async function () {
        const client = new docker();
        await client.pull('selenium/hub:latest');
        await client.pull('selenium/node-chrome:latest');
        await new Promise(resolve => setTimeout(resolve, 5000)); 
        driver = await new Builder()
          .forBrowser('chrome')
          .usingServer('http://localhost:4444/wd/hub')
          .build();
      });
  
      after(async function () {
        if (driver) {
          await driver.quit();
        }
      });
  
      it('should login successfully', async function () {
        const LoginPage = require('../pages/LoginPage');
        const loginPage = new LoginPage(driver);
        await loginPage.open();
        await loginPage.login('username', 'password');
        const welcomeMessage = await loginPage.getWelcomeMessage();
        expect(welcomeMessage).to.equal('Welcome, username!');
      });
    });
  });
  


