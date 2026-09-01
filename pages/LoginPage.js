class LoginPage{

    constructor(page) {

        this.page = page;
        this.username = page.locator('input[id="user-name"]');
        this.password = page.locator('input[id="password"]');
        this.loginButton = page.locator('input[id="login-button"]');
    }

    async login(user , pass) {
        await this.username.fill(user);

        await this.password.fill(pass);
    
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };
