import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { downloadFileFromUrl } from "../utils/Utils";

type UploadRes = {
  status: boolean;
  message?: string;
};

export default class FileService {
  public static async uploadFile({
    file,
    filename,
  }: {
    file: File;
    filename: string;
  }): Promise<UploadRes> {
    const root = ref(storage);
    const allFiles = await listAll(root);

    const isFileNameAlreadyExists = !allFiles.items.every(
      (file) => file.name !== filename
    );

    if (!isFileNameAlreadyExists) {
      const storageRef = ref(storage, filename);

      const res = await uploadBytes(storageRef, file);

      if (res.metadata.name !== filename) {
        return { status: false };
      }

      return { status: true };
    }

    return { status: false, message: "Link name already exists." };
  }

  public static async downloadFile({
    filename,
  }: {
    filename: string;
  }): Promise<boolean> {
    try {
      const storageRef = ref(storage, filename);

      const downloadUrl = await getDownloadURL(storageRef);

      const res = await fetch(downloadUrl);
      const blob = await res.blob();

      downloadFileFromUrl({ blob, filename });

      return true;
    } catch (_err) {
      return false;
    }
  }
}
