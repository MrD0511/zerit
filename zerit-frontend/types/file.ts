export type ColorType = "color" | "black-white";
export type PrintType = "single-sided" | "double-sided";

export interface FileItem {
    id: string,
    file: File,
    numPages: number,
    range: [number, number],
    colorType: ColorType,
    printType: PrintType,
    numOfCopies: number
}