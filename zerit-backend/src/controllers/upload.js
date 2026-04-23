import { groupAndMergePdfs } from "../services/pdfMerge.js";
import {uploadFile} from "../azureBlob.js"
import Orders from "../models/Orders.js";
import Files from "../models/Files.js";
import { createOrder, pairFilesAndMetaData } from "../services/dataServices.js";
import crypto from "crypto";
import { sendEmail } from "../services/emailServices.js";


const uploadController = async (req, res) => {
    try{
        const files = req.files;
        const body = req.body;

        if(files == null || files.length === 0){
            return res.status(400).json({
                success: false,
                error: "No files detected"
            })
        }
        
        const {name, email} = body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                error: "Name and Email not provided"
            });
        }

        const fileItems = pairFilesAndMetaData(files, body)

        const mergedPdfs = await groupAndMergePdfs(fileItems)

        const order = await createOrder(Orders, {
            name: name,
            email: email,
        })

        await Promise.all(
            mergedPdfs.map(async (fileItem) => {
                const fileName = `${crypto.randomUUID()}.pdf`;

                const url = await uploadFile(
                    fileName,
                    Buffer.from(fileItem.buffer),
                    "application/pdf"
                );

                return Files.create({
                    filename: fileName,
                    url,
                    orderId: order.id,
                    printType: fileItem.printType,
                    colorType: fileItem.colorType
                });
            })
        );

        sendEmail(email, order.token);

        return res.json({
            success: true,
            token: order.token,
            message: "Your order is placed successfully"
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export {
    uploadController
}