import { exec } from "child_process";

export default defineComponent({
  name: "Auto Fix Expo CLI Error",
  description: "Automatically fixes Expo CLI 'Body is unusable: Body has already been read' error by running PowerShell commands",
  type: "action",
  props: {
    projectDirectory: {
      type: "string",
      label: "Project Directory",
      description: "Full path to your Expo project directory",
      default: "C:\\Users\\Administrator\\myApp"
    },
    includeAlternatives: {
      type: "boolean",
      label: "Include Alternative Commands",
      description: "Include alternative startup commands if main fixes don't work",
      default: true,
      optional: true
    }
  },
  async run({ $ }) {
    const projectPath = this.projectDirectory;

    // Core PowerShell commands to fix the issue
    let psCommands = `
cd "${projectPath}"
Write-Host "Clearing Expo and npm caches..." -ForegroundColor Yellow
npx expo r -c
npm cache clean --force
npx expo install --fix

Write-Host "Removing node_modules and reinstalling dependencies..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install

Write-Host "Resetting Metro Bundler cache and starting Expo..." -ForegroundColor Yellow
npx expo start --clear
`;

    if (this.includeAlternatives) {
      psCommands += `
Write-Host "Trying alternative startup commands..." -ForegroundColor Cyan
npx expo start --tunnel --clear
npx expo start --localhost --clear
npx expo r -c && npx expo start
expo start -c
npm start -- --reset-cache
`;
    }

    // Execute PowerShell commands
    return new Promise((resolve, reject) => {
      exec(`powershell -NoProfile -ExecutionPolicy Bypass -Command "${psCommands}"`, (error, stdout, stderr) => {
        if (error) {
          console.error("Error executing PowerShell commands:", error);
          return reject(error);
        }

        console.log(stdout);
        console.error(stderr);

        $.export("$summary", "Expo CLI fix script executed successfully!");
        resolve({
          message: "Expo CLI error fix completed. Check output above for details.",
          output: stdout,
          errors: stderr
        });
      });
    });
  }
});
