### Prerequisites

Ensure you have the following software installed on your machine:

- **[npm (v8.0.0 or later)](https://docs.npmjs.com/cli/v9/configuring-npm)**: Package manager for JavaScript, used to install and manage software packages.
  - To verify your current version, use the command `npm -v`.
  - If npm isn't installed, follow the [npm installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- **[Node.js (v16.0.0 or later)](https://nodejs.org/en/download)**: JavaScript runtime built on Chrome's V8 JavaScript engine, allowing the execution of JavaScript server-side.
  - To verify your current version, use the command `node -v`.
  - if Node.js isn't installed, download and install it from the title link provided.
- **[Git](https://git-scm.com/downloads)**: Distributed version control system used to track changes in source code during software development.
  - To check if Git is installed, run the command `git --version`.
  - If Git isn't installed, download and install it from the [official Git website](https://git-scm.com/downloads).
- **VSCode Plugins**:
  - **[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**: A tool for consistent code formatting. Install it directly from the title link provided.
  - **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)**: A tool for identifying and fixing linting issues. Install it directly from the title link provided.
- **VSCode Settings**: To ensure consistency with the prettier format settings, apply the following configurations in your VSCode settings (use Cmd + , to access settings):
  - **Quote Style**: Set `typescript.preferences.quoteStyle` to `single` for consistent quote usage across your code.
  - **Format On Save**: Enable `Format On Save Mode` and set it to `file`. This ensures your code is automatically formatted every time you save, enhancing readability and consistency.

### Installation

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

5. (Optional) Git User setup for the first time. If you are a code/test contributor, set up your user in GIT using the commands:

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

3. If there are dependency errors while installing packages, you can remove the node_modules folder and install the packages again. This step can help resolve potential conflicts or issues with dependencies.

```bash
rm -rf node_modules
npm install
```

4. Update Playwright browsers as needed

```bash
npx playwright install
```
