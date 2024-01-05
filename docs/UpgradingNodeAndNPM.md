## Update Node and NPM to the latest version

To upgrade Node.js and npm to their most recent versions, here are some methods listed below:

1. **Download Updated Node Binaries**:

- The most recent versions of Node.js, including the latest and long-term support (LTS) releases suitable for your device, can be downloaded from the [Node.js](https://nodejs.org/en/) website. When you download the newest version of Node.js, it also includes the latest version of npm.

- Finally, verify that your update is complete by checking the node version

  ```bash
  node -v
  ```

2.  **Using nvm (Node Version Manager) for Linux and macOS**:  
    NVM is a tool that allows you to manage multiple versions of Node on your system. You can use nvm to install, update, and switch between different versions of Node.

        To update your version of Node using nvm, do the following:

- Check if you already have nvm installed on your system

  ```bash
  nvm --version
  ```

- If nvm is not installed, install the latest version of nvm using the below command

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/$(curl -s https://api.github.com/repos/nvm-sh/nvm/releases/latest | grep 'tag_name' | cut -d\" -f4)/install.sh | bash
  ```

  If you need to install a specific version of nvm like 0.35.3, use the below command

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
  ```

- Once nvm is installed, check the current version of Node by running the below command

  ```bash
  node -v
  ```

- Update the version of Node using the following command(this will also install the latest npm version)

  ```bash
  nvm install node --reinstall-packages-from=node
  ```

- And finally, verify the update is complete by rechecking your Node version

  ```bash
  node -v
  ```

- If you have many node versions installed and want to specify the version to use at a particular time, we can do it by setting a default alias like this

  ```bash
  nvm alias default [version]
  ```

- To switch between the installed versions

  ```bash
   nvm use [version]
  ```

3. **Using Package Managers**:

- **_Homebrew on macOS_**:
  If you initially installed Node.js with Homebrew, you can upgrade with
  ```bash
  brew update
  brew upgrade node
  ```
- **_Linux Package Managers (like apt for Ubuntu, yum or dnf for Fedora)_**:
- First, update your package repository
  ```bash
  Ubuntu: sudo apt-get update
  Fedora: sudo dnf upgrade or sudo yum update
  ```
- Then, upgrade Node.js
  ```bash
    Ubuntu: sudo apt-get upgrade nodejs
    Fedora: sudo dnf upgrade nodejs or sudo yum upgrade nodejs
  ```
