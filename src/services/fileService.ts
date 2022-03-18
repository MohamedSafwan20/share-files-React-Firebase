import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { downloadFileFromUrl } from "../utils/Utils";

export default class FileService {
  public static async uploadFile({
    file,
    filename,
  }: {
    file: File;
    filename: string;
  }): Promise<boolean> {
    const storageRef = ref(storage, filename);

    const res = await uploadBytes(storageRef, file);

    if (res.metadata.name !== filename) {
      return false;
    }

    return true;
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
