import { print } from "pdf-to-printer";

export async function printFile(filePath: string, printType: "single-sided" | "double-sided",
  colorType: "black-white" | "color"){
    const options: any = {
        silent: true,
        
    };

    // Duplex (double-sided)
    if (printType === "double-sided") {
        options.duplex = "long-edge"; // or "short-edge"
    }

    // Color mode (Windows-specific behavior mostly)
    if (colorType === "black-white") {
        options.color = false;
    } else {
        options.color = true;
    }

    await print(filePath, {
        
    });
}