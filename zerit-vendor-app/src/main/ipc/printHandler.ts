import { ipcMain } from "electron";
import { downloadFile } from "../services/downloadService";
import { printFile } from "../services/printService";
import path from "path";

export function registerPrintHandler() {
  ipcMain.handle("print-files", async (_, fileItems: {
    url: string,
    printType: "single-sided" | "double-sided",
    colorType: "black-white" | "color",
    filename: string
  }[]) => {
    const results = [];

    for (let i = 0; i < fileItems.length; i++) {
      const file = fileItems[i];

      try {
        const filePath = await downloadFile(
          file.url,
          `file-${file.filename.replace(".pdf","")}-${i}.pdf`
        );

        await printFile(filePath);

        results.push({
          name: file.filename,
          status: "printed",
        });
      } catch (error) {
        results.push({
          name: file.filename,
          status: "failed",
          error: String(error),
        });
      }
    }

    return results;
  });
}