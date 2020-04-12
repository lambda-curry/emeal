import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './file-upload.scss';

export const FileUpload = ({
  fileLimit,
  dropText,
  droppingText,
  handleDrop,
  children,
}: {
  fileLimit?: number | false | undefined;
  dropText?: string;
  droppingText?: string;
  handleDrop: (files: File[]) => void;
  children?: (props: {
    isDragActive: boolean;
    files: File[];
  }) => React.ReactNode;
}) => {
  // TODO: figure out how to actually handle file limits
  const plural = fileLimit !== 1 ? 's' : '';
  droppingText = droppingText || `Drop your file${plural} here...`;
  dropText =
    dropText ||
    `Drag and drop your file${plural} here, or click to select the file${plural}`;

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      handleDrop(acceptedFiles);
    },
    [handleDrop]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dropzoneText = () => {
    if (isDragActive) return droppingText;
    if (files.length === 0) return dropText;
    return files.reduce((acc, file, index) => {
      if (index + 1 < files.length) acc = acc + file.name + ', ';
      else acc = acc + file.name;
      return acc;
    }, '');
  };

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} name='dropzone' />
      {children ? children({ isDragActive, files }) : dropzoneText()}
    </div>
  );
};
