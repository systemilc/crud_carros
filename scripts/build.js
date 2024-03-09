const { execSync } = require("child_process");
const os = require("os");

const isWindows = os.platform() === "win32";
const isMac = os.platform() === "darwin";

if (isWindows) {
  try {
    execSync("rmdir /s /q dist", { stdio: "inherit" });
  } catch (error) {
    // Ignorar erro se o diretório não existir
  }
  execSync("tsc", { stdio: "inherit" });
} else if (isMac) {
  execSync("rm -rf ./dist && tsc", { stdio: "inherit" });
} else {
  console.error("Unsupported OS");
  process.exit(1);
}
