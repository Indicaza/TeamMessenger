import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

// Path to the popup.html in the dist folder
const popupPath = resolve("dist/popup.html");

// Read the popup.html file
try {
  const data = await readFile(popupPath, "utf-8");

  // Replace main.jsx with main.js in the script tag
  const updatedHtml = data.replace("../src/main.jsx", "./src/main.js");

  // Write the updated popup.html file back
  await writeFile(popupPath, updatedHtml, "utf-8");
  console.log("Successfully updated paths in popup.html");
} catch (err) {
  console.error("Error processing popup.html:", err);
}
