import { useState } from "react";
import { Alert, Button, Input, Spinner } from "theme-ui";
import Color from "../../config/colors";
import FileService from "../../services/fileService";

const Download = () => {
  const [linkname, setLinkname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");

  const downloadFile = async (e: any) => {
    setHasError("");

    if (linkname === "") {
      setHasError("Please enter valid link name");
      return;
    }

    setIsLoading(true);

    const res = await FileService.downloadFile({ filename: linkname });

    if (!res) {
      setHasError("File not found");
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

      <div className="text-center space-y-4">
        <h1 className="text-3xl text-white font-medium">Download Files</h1>
        <p className="text-primaryVariant">
          Download documents your team shared
        </p>
      </div>
      <div className="mt-4 w-[80%]">
        <p className="text-primaryVariant mb-2">Enter Link name</p>
        <Input
          onChange={(e) => setLinkname(e.target.value)}
          className="bg-white"
          backgroundColor="white"
          style={{
            border: "0px",
          }}
        />
        <div className="mx-auto mt-10 text-center">
          {isLoading ? (
            <Spinner
              color={Color.primaryVariant}
              size={35}
              style={{
                margin: "0 auto",
              }}
            />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Download;
