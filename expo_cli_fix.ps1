import { axios } from "@pipedream/platform"

export default defineComponent({
  name: "Generate Expo CLI Error Fix Commands",
  description: "Generate PowerShell commands to fix Expo CLI 'Body is unusable: Body has already been read' error",
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
    
    const commands = {
      step1_cache_clearing: {
        title: "Step 1: Clear Expo CLI and npm Cache",
        description: "Clear all cached data that might be causing the issue",
        commands: [
          `cd "${projectPath}"`,
          "npx expo r -c",
          "npm cache clean --force",
          "npx expo install --fix"
        ]
      },
      step2_dependencies: {
        title: "Step 2: Remove node_modules and Reinstall Dependencies",
        description: "Clean reinstall of all project dependencies",
        commands: [
          `cd "${projectPath}"`,
          "Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue",
          "Remove-Item package-lock.json -ErrorAction SilentlyContinue",
          "npm install"
        ]
      },
      step3_metro_cache: {
        title: "Step 3: Reset Metro Bundler Cache",
        description: "Clear Metro bundler cache that might contain corrupted data",
        commands: [
          `cd "${projectPath}"`,
          "npx expo start --clear",
          "# If above doesn't work, try:",
          "npx react-native start --reset-cache"
        ]
      }
    };

    if (this.includeAlternatives) {
      commands.step4_alternatives = {
        title: "Step 4: Alternative Startup Commands (if issue persists)",
        description: "Try these alternative commands to start your Expo project",
        commands: [
          `cd "${projectPath}"`,
          "# Try starting with tunnel mode:",
          "npx expo start --tunnel --clear",
          "",
          "# Or try with localhost:",
          "npx expo start --localhost --clear",
          "",
          "# Reset everything and start fresh:",
          "npx expo r -c && npx expo start",
          "",
          "# If using older Expo CLI:",
          "expo start -c",
          "",
          "# For React Native projects:",
          "npm start -- --reset-cache"
        ]
      };
    }

    const fullScript = {
      powershell_script: {
        title: "Complete PowerShell Script",
        description: "Run all commands in sequence",
        script: [
          "# Expo CLI Error Fix Script",
          "# Fix for 'Body is unusable: Body has already been read' error",
          "",
          "Write-Host 'Starting Expo CLI error fix...' -ForegroundColor Green",
          "",
          "# Step 1: Clear caches",
          `cd "${projectPath}"`,
          "Write-Host 'Clearing Expo and npm caches...' -ForegroundColor Yellow",
          "npx expo r -c",
          "npm cache clean --force",
          "npx expo install --fix",
          "",
          "# Step 2: Clean dependencies",
          "Write-Host 'Removing node_modules and reinstalling...' -ForegroundColor Yellow",
          "Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue",
          "Remove-Item package-lock.json -ErrorAction SilentlyContinue",
          "npm install",
          "",
          "# Step 3: Reset Metro cache and start",
          "Write-Host 'Starting Expo with cleared cache...' -ForegroundColor Yellow",
          "npx expo start --clear",
          "",
          "Write-Host 'Fix complete! If issues persist, try the alternative commands provided.' -ForegroundColor Green"
        ]
      }
    };

    const totalCommands = Object.values(commands).reduce((count, step) => {
      return count + step.commands.filter(cmd => !cmd.startsWith('#') && cmd.trim() !== '').length;
    }, 0);

    $.export("$summary", `Generated ${totalCommands} PowerShell commands to fix Expo CLI error for project at ${projectPath}`);

    return {
      project_directory: projectPath,
      fix_steps: commands,
      ...fullScript,
      usage_instructions: {
        title: "How to Use These Commands",
        steps: [
          "1. Open PowerShell as Administrator",
          "2. Run each step's commands in order, or",
          "3. Copy and run the complete PowerShell script",
          "4. If issues persist, try the alternative commands",
          "5. Restart your development server after running the fixes"
        ]
      }
    };
  }
})