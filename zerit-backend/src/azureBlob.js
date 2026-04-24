import {BlobServiceClient, ContainerClient} from "@azure/storage-blob"
import { configDotenv } from "dotenv";
import {
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  StorageSharedKeyCredential
} from "@azure/storage-blob";

configDotenv()

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;


const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);



const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

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

async function getSasUrl(filename, expiresInMinutes = 10){
    const blobClient = containerClient.getBlockBlobClient(filename);

    const now = new Date();

    const startsOn = new Date(now.valueOf() - 5 * 60 * 1000); // five mins earlier to avoid time mismatch issues
    const expiresOn = new Date(now.valueOf() + expiresInMinutes * 60 * 1000);

    const sasToken = generateBlobSASQueryParameters(
        {
            containerName,
            blobName: filename,
            permissions: BlobSASPermissions.parse("r"),
            startsOn,
            expiresOn
        },
        sharedKeyCredential
    ).toString();

    return `${blobClient.url}?${sasToken}`;
}

export {
    initContainer,
    uploadFile,
    getSasUrl
}