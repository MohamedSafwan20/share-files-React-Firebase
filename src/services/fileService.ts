import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

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
}
