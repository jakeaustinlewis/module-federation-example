const path = require("path");
const shell = require("shelljs");

const typesDir = path.join(__dirname, ".wp_federation");
const outputDir = path.join(__dirname, "dist");

if (
  shell.exec(`tar -czvf ${outputDir}/types.tgz -C ${typesDir} .`).code !== 0
) {
  console.error("Error bundling type definitions.");
  process.exit(1);
} else {
  console.log("Type definitions bundled successfully.");
}
