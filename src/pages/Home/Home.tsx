import { useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { Alert, Input, Spinner } from "theme-ui";
import Color from "../../config/colors";
import Constant from "../../config/constants";
import FileService from "../../services/fileService";

const Home = () => {
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFileUploadedAlert, setShowFileUploadedAlert] = useState(false);
  const [hasError, setHasError] = useState("");

  const handleFileDrop = async (e: any) => {
    e.preventDefault();

    setHasError("");

    if (isLoading) return;

    if (filename === "") {
      setHasError("Please enter valid link name");
      return;
    }
    setIsLoading(true);

    const file = e.dataTransfer.files;

    if (file.length > 1) {
      setHasError("Please Upload single file!");
      return;
    }

    const res = await FileService.uploadFile({ file: file[0], filename });

    if (res) {
      setShowFileUploadedAlert(true);

      setTimeout(function () {
        setShowFileUploadedAlert(false);
      }, Constant.MAX_ALERT_TIME);
    } else {
      setHasError("Something went wrong!");
    }

    setIsLoading(false);
  };

  const handleInputFile = async (e: any) => {
    setHasError("");

    if (filename === "") {
      setHasError("Please enter valid link name");
      return;
    }

    setIsLoading(true);

    const res = await FileService.uploadFile({
      file: e.target.files[0],
      filename,
    });

    if (res) {
      setShowFileUploadedAlert(true);

      setTimeout(function () {
        setShowFileUploadedAlert(false);
      }, Constant.MAX_ALERT_TIME);
    } else {
      setHasError("Something went wrong!");
    }

    setIsLoading(false);
  };

  return (
    <div className="md:w-[60vw] flex justify-center items-center flex-col h-[90vh] mx-auto">
      {hasError && (
        <Alert
          bg={Color.error}
          className="absolute top-[14vh] right-8 w-[300px] animate__animated animate__bounce animate__fast"
        >
          {hasError}
        </Alert>
      )}

      {showFileUploadedAlert && (
        <Alert
          bg={Color.success}
          className="absolute top-[14vh] right-8 w-[300px] animate__animated animate__bounce animate__fast"
        >
          File Uploaded
        </Alert>
      )}

      <div className="text-center space-y-4">
        <h1 className="text-3xl text-white font-medium">Upload Files</h1>
        <p className="text-primaryVariant">
          Upload documents you want to share
          <br /> with your team
        </p>
      </div>
      <div className="w-[85%] mt-4">
        <p className="text-primaryVariant mb-2">Link name</p>
        <Input
          onChange={(e) => setFilename(e.target.value)}
          className="bg-white"
          backgroundColor="white"
          style={{
            border: "0px",
          }}
        />
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
        className="w-[85%] mt-7 p-8 space-y-3 bg-disabledVariant flex justify-around items-center flex-col border-dashed border-primaryVariant border-[3px] rounded-lg min-h-[250px] text-center"
        style={{
          background:
            "linear-gradient(344deg, rgba(214,218,236,1) 26%, rgba(255,255,255,1) 100%)",
        }}
      >
        <IoCloudUpload size={45} color={Color.primaryVariant} />
        <p className="text-primary">Drag & Drop your file here</p>
        <p className="text-primary">OR</p>
        {isLoading ? (
          <>
            <Spinner size={28} />
            <p
              className="text-primary text-sm font-medium"
              style={{
                marginTop: "2px",
              }}
            >
              Uploading...
            </p>
          </>
        ) : (
          <>
            <label
              htmlFor="upload"
              className="shadow-lg hover:bg-primaryVariant hover:text-black transition-all duration-200 py-2 px-6 bg-primary text-white rounded-md"
            >
              Browse File
            </label>
            <input id="upload" type="file" hidden onChange={handleInputFile} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
