import fs from "fs"
import path from "path"
import https from "https"
import { app } from "electron"

export function downloadFile(url: string, filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const filePath = path.join(app.getPath("temp"), filename);
        const file = fs.createWriteStream(filePath)

        https.get(url, (response) => {
            response.pipe(file)

            file.on('finish', () => {
                file.close();
                resolve(filePath)
            });
        }).on("error", reject)
    })
}