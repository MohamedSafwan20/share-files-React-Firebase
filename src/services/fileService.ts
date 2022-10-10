import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ShortUniqueId from "short-unique-id";
import { storage } from "../config/firebase";
import { downloadFileFromUrl } from "../utils/Utils";

type UploadRes = {
  status: boolean;
  data?: string;
};

export default class FileService {
  public static async uploadFile({ file }: { file: File }): Promise<UploadRes> {
    const filename = new ShortUniqueId({
      dictionary: "number",
    })();
    const storageRef = ref(storage, filename);

    const res = await uploadBytes(storageRef, file);

    if (res.metadata.name !== filename) {
      return { status: false };
    }

    return { status: true, data: filename };
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
