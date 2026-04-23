
function pairFilesAndMetaData(files, body) {

    let fileItems = [];

    files.forEach((file) => {
        const id = file.fieldname.replace("file_", "");

        const metaRaw = body[`meta_${id}`]

        let meta = {}

        try{
            meta = JSON.parse(metaRaw)

        }catch(e){
            return res.status(400).json({
                error: `Invalid JSON metadata for file id ${id}`,
            });
        }

        const item = {...meta, file: file}

        fileItems.push(item)
    })

    return fileItems;
}

function generate6DigitToken() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function createOrder(orderModel, orderData){
    for(let i = 0; i < 10; i++){
        const token = generate6DigitToken()

        try{
            const order = await orderModel.create({
                ...orderData,
                token: token
            });
            
            return order;
        }catch(e){
            if (e.name !== "SequelizeUniqueConstraintError") throw e;
            return null;
        }
    }
    throw new Error("Could not generate unique order token");
    return null;
}

export {
    pairFilesAndMetaData,
    createOrder
}