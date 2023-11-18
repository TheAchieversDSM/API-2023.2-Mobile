export interface File {
  buffer: Blob;
  originalname: string;
  mimetype: string;
  size: number;
}

export interface ISFile {
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
}
