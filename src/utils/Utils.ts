export function downloadFileFromUrl({
  blob,
  filename,
}: {
  blob: Blob;
  filename: string;
}) {
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  a.remove();
}

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
