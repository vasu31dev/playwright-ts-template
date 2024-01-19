## Frequently Asked Questions

<!-- syntax for clickable links that reveal the answers when clicked
<!-- <details>
<summary>Q: How do we fix the import errors with alias paths?</summary>
<p>Delete the dist folder containing the js compiled files as Playwright handles the typescript compilation internally and this should eliminate the conflict.</p>
</details> -->

#### Q1: How do we fix the import errors with alias paths?

A: Delete the dist folder containing the js compiled files as Playwright handles the typescript compilation internally and this should eliminate the conflict.

#### Q2: How do we fix the dependency errors while installing packages?

A: Remove the `node_modules` folder and install the packages again. This step will help in resolving potential conflicts or issues with dependencies.

```bash
rm -rf node_modules
npm install
```
