import { useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { Alert, Button, Input, Spinner } from "theme-ui";
import Color from "../../config/colors";
import Constant from "../../config/constants";
import FileService from "../../services/fileService";

const Download = () => {
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFileUploadedAlert, setShowFileUploadedAlert] = useState(false);
  const [hasError, setHasError] = useState("");

  const downloadFile = async (e: any) => {
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
    <div className="flex justify-center items-center flex-col h-[90vh] w-[60vw] mx-auto">
      {hasError && (
        <Alert
          bg={Color.error}
          className="absolute top-[14vh] right-8 w-[300px] animate__animated animate__bounce animate__fast"
        >
          {hasError}
        </Alert>
      )}

      <div className="text-center space-y-4">
        <h1 className="text-3xl text-white font-medium">Download Files</h1>
        <p className="text-primaryVariant">
          Download documents your team shared
        </p>
      </div>
      <div className="mt-4 w-[60%]">
        <p className="text-primaryVariant mb-2">Enter Link name</p>
        <Input
          onChange={(e) => setFilename(e.target.value)}
          className="bg-white"
          backgroundColor="white"
          style={{
            border: "0px",
          }}
        />
        <div className="mx-auto mt-10 text-center">
          <Button
            onClick={downloadFile}
            bg={Color.primaryVariant}
            color="black"
            className="hover:bg-primary hover:text-white"
            style={{
              border: `1px solid ${Color.primaryVariant}`,
            }}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Download;
