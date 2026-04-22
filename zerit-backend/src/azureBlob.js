import {BlobServiceClient, ContainerClient} from "@azure/storage-blob"
import { configDotenv } from "dotenv";

configDotenv()

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

async function initContainer(){
    await containerClient.createIfNotExists();
}

async function uploadFile(filename, buffer, contentType = "application/pdf"){
    const blobClient = containerClient.getBlockBlobClient(filename);

    await blobClient.uploadData(buffer, {
        blobHTTPHeaders: {
            blobContentType: contentType
        }
    });

    return blobClient.url;
}

export {
    initContainer,
    uploadFile
}