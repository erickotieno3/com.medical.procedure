/**
 * 🚀 Unified Medical UI/UX Starter
 * Automatically launches app and logs status
 */

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Log file
const logPath = path.join(__dirname, "app_start.log");
const log = (msg) => {
  const entry = `[${new Date().toLocaleString()}] ${msg}\n`;
  fs.appendFileSync(logPath, entry);
  console.log(msg);
};

// Clear console
console.clear();
log("🚀 Starting Unified Medical App...");

// Check for node_modules
if (!fs.existsSync(path.join(__dirname, "node_modules"))) {
  log("🧩 node_modules not found. Installing...");
  exec("npm install", (err, stdout, stderr) => {
    if (err) {
      log("❌ npm install failed: " + stderr);
      return;
    }
    log("✅ npm install complete. Launching Expo...");
    exec("npx expo start --tunnel", (err2, stdout2, stderr2) => {
      if (err2) log("❌ Launch failed: " + stderr2);
      else log("✅ Expo Server started successfully.\n" + stdout2);
    });
  });
} else {
  log("✅ Dependencies found, launching Expo Dev Server...");
  exec("npx expo start --tunnel", (err, stdout, stderr) => {
    if (err) log("❌ Launch failed: " + stderr);
    else log("✅ Expo Server started successfully.\n" + stdout);
  });
}
