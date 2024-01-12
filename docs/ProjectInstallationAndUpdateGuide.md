### Project Installation

1. Clone the repository:

```bash
git clone https://github.com/vasu31dev/playwright-ts-template.git
```

2. Navigate to the project directory:

```bash
cd playwright-ts-template
```

3. Install the dependencies:

```bash
npm install
```

4. Install the Playwright browsers

```bash
npx playwright install
```

5. (Optional) Git User setup for the first time. If you are a code/test contributor, set up your user in GIT using the below commands:

   ```bash
   git config user.email "<your-email>"
   git config user.name "<your-name>"
   git remote set-url origin https://USERNAME:SECRETTOKEN@github.com/vasu31dev/playwright-ts-template.git
   ```

   Replace `<USERNAME>` with your GitHub username and `<SECRETTOKEN>` with your GitHub personal access token. If you don't have a personal access token, you can create one in your GitHub account settings following this [GitHub guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

### Project Update Guide

To pull the latest changes and install the latest packages, follow these steps:

1. Pull the latest changes

```bash
git pull origin <branchName>
```

Replace `<branchName>` with the name of the branch that you want to update.

2. Install the latest packages

```bash
npm install
```

3. If there are dependency errors while installing packages, you can remove the `node_modules` folder and install the packages again. This step can help resolve potential conflicts or issues with dependencies.

```bash
rm -rf node_modules
npm install
```

4. Update Playwright browsers as needed

```bash
npx playwright install
```
