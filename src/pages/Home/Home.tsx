import { useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { Alert } from "theme-ui";
import Color from "../../config/colors";
import FileService from "../../services/fileService";

const Home = () => {
  const [hasError, setHasError] = useState(false);

  const handleFileDrop = (e: any) => {
    e.preventDefault();

    setHasError(false);

    const file = e.dataTransfer.files;

    if (file.length > 1) {
      setHasError(true);
      return;
    }

    FileService.uploadFile(file[0]);
  };

  const handleInputFile = (e: any) => {
    setHasError(false);
    FileService.uploadFile(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center flex-col h-[90vh] w-[60vw] mx-auto">
      {hasError && (
        <Alert
          bg={Color.error}
          className="absolute top-[14vh] right-8 w-[300px] animate__animated animate__bounce animate__fast"
        >
          Please Upload single file!
        </Alert>
      )}

      <div className="text-center space-y-4">
        <h1 className="text-3xl text-white font-medium">Upload Files</h1>
        <p className="text-primaryVariant">
          Upload documents you want to share
          <br /> with your team
        </p>
      </div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => {
          e.preventDefault();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
        }}
        onDrop={handleFileDrop}
        className="mt-10 p-8 space-y-3 bg-disabledVariant w-[60%] flex justify-around items-center flex-col border-dashed border-primaryVariant border-[3px] rounded-lg min-h-[250px]"
        style={{
          background:
            "linear-gradient(344deg, rgba(214,218,236,1) 26%, rgba(255,255,255,1) 100%)",
        }}
      >
        <IoCloudUpload size={45} color={Color.primaryVariant} />
        <p className="text-primary">Drag & Drop your file here</p>
        <p className="text-primary">OR</p>
        <label
          htmlFor="upload"
          className="shadow-lg hover:bg-primaryVariant hover:text-black transition-all duration-200 py-2 px-6 bg-primary text-white rounded-md"
        >
          Browse File
        </label>
        <input id="upload" type="file" hidden onChange={handleInputFile} />
      </div>
    </div>
  );
};

export default Home;
