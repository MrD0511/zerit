import {PDFDocument} from "pdf-lib"


async function groupAndMergePdfs(items){

    const groups = [
        { key: "color-single", items: items.filter(i => i.colorType === "color" && i.printType === "single-sided"), printType: 'single-sided', colorType: 'color' },
        { key: "color-double", items: items.filter(i => i.colorType === "color" && i.printType === "double-sided"), printType: 'double-sided', colorType: 'color' },
        { key: "BW-single", items: items.filter(i => i.colorType === "black-white" && i.printType === "single-sided"), printType: 'single-sided', colorType: 'black-white' },
        { key: "BW-double", items: items.filter(i => i.colorType === "black-white" && i.printType === "double-sided"), printType: 'single-sided', colorType: 'black-white' },
    ];

    const mergedPdfs = [];

    for (const group of groups) {
        if (group.items.length) {
            const mergedFiles = await mergePDFs(group.items);
            mergedPdfs.push({
                buffer: mergedFiles,
                printType: group.printType,
                colorType: group.colorType
            })
        }
    }

    return  mergedPdfs;
}


async function mergePDFs(items) {
    const mergedPdf = await PDFDocument.create();

    for (const item of items) {
        const pdf = await PDFDocument.load(item.file.buffer);

        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

        for (let i = 0; i < item.numOfCopies; i++) {
            pages.forEach((page) => mergedPdf.addPage(page));
        }
    }

    const mergedBytes = await mergedPdf.save();
    return mergedBytes;
} 

export {
    groupAndMergePdfs
}