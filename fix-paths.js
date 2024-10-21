import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const popupPath = resolve("dist/popup.html");
const offscreenPath = resolve("dist/offscreen.html");

const fixPopupHtml = async () => {
  try {
    const data = await readFile(popupPath, "utf-8");
    const updatedHtml = data.replace("../src/main.jsx", "./src/main.js");
    await writeFile(popupPath, updatedHtml, "utf-8");
    console.log("Successfully updated paths in popup.html");
  } catch (err) {
    console.error("Error processing popup.html:", err);
  }
};

const fixOffscreenHtml = async () => {
  try {
    const data = await readFile(offscreenPath, "utf-8");
    const updatedHtml = data.replace("offscreen.js", "./src/offscreen.js");
    await writeFile(offscreenPath, updatedHtml, "utf-8");
    console.log("Successfully updated paths in offscreen.html");
  } catch (err) {
    console.error("Error processing offscreen.html:", err);
  }
};

fixPopupHtml();
fixOffscreenHtml();
