"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import {
  setMyWallpaper,
  setWallpaper,
} from "@/app/redux/slice/wallpaper.slice";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import useAppwrite from "@/app/hook/appwrite";
import { ID } from "appwrite";
import { BucketId, CollectionId, DatabaseId } from "@/libs/database";
import { useAlert } from "@/app/hook/AlertContext";

const CustomWallpaper = () => {
  const { toastAlert, closeAlert }: any = useAlert();
  const dispatch = useAppDispatch();
  const { storage, databases } = useAppwrite();
  const [file, setFile] = useState<any>(null);
  const [fileData, setFileData] = useState<File | null>(null);
  const { myWallpaper } = useAppSelector((state) => state.wallpaper);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      //check file type is image
      if (!acceptedFiles[0].type.includes("image")) {
        toastAlert("File type is not image");
        setTimeout(() => {
          closeAlert();
        }, 2000);
        return;
      }

      //check file size
      if (acceptedFiles[0].size > 1024 * 1024 * 5) {
        toastAlert("File size is too large");
        setTimeout(() => {
          closeAlert();
        }, 2000);
        return;
      }

      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const blob = dataUrlToBlob(dataUrl);
        console.log(blob);
        //blob url
        const blobUrl = URL.createObjectURL(blob);
        dispatch(
          setWallpaper({
            type: "wallpaper",
            url: blobUrl,
          })
        );
        setFile(blobUrl);
        setFileData(acceptedFiles[0]);
      };
    },
    [closeAlert, dispatch, toastAlert]
  );

  const dataUrlToBlob = (dataUrl: string): Blob => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const onClose = () => {
    dispatch(
      setWallpaper({
        type: myWallpaper.type,
        url: myWallpaper.url,
      })
    );
    setFile(null);
    setFileData(null);
    setIsUploading(false);
  };

  const onSave = () => {
    if (!fileData) return;
    if (!storage) return;
    setIsUploading(true);
    const result = storage.createFile(
      BucketId.background,
      ID.unique(),
      fileData
    );

    result.then(
      function (response) {
        let url = `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${BucketId.background}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT}&mode=admin`;
        handleSaveWallpaper(url);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const handleSaveWallpaper = (url: string) => {
    if (!databases) return;
    if (myWallpaper.id) {
      handleUpdateMyWallpaper(url);
    } else {
      handleInsertWallpaper(url);
    }
  };

  const handleInsertWallpaper = (url: string) => {
    if (!databases) return;
    //upsert
    const result = databases.createDocument(
      DatabaseId.focusifyApp,
      CollectionId.appWallpaper,
      ID.unique(),
      {
        url: url,
        type: "wallpaper",
      }
    );
    result
      .then(function (response: any) {
        console.log(response);
        dispatch(
          setMyWallpaper({
            id: response.$id,
            url: response.url,
            type: response.type,
          })
        );
        setFile(null);
        setFileData(null);
        toastAlert("Update wallpaper success");
        setTimeout(() => {
          closeAlert();
        }, 1000);
        setIsUploading(false);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  const handleUpdateMyWallpaper = (url: string) => {
    if (!databases) return;
    //upsert
    const result = databases.updateDocument(
      DatabaseId.focusifyApp,
      CollectionId.appWallpaper,
      myWallpaper.id,
      {
        url: url,
        type: "wallpaper",
      }
    );
    result
      .then(function (response: any) {
        console.log(response);
        setFile(null);
        setFileData(null);
        toastAlert("Update wallpaper success");
        setTimeout(() => {
          closeAlert();
        }, 1000);
        setIsUploading(false);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl">Upload Custom Wallpaper</h2>
      <p className="text-xs text-gray-500 mb-2">
        Upload your own wallpaper to use in the app
      </p>
      {file ? (
        <div className="w-full h-full">
          <div className="relative h-44 w-full">
            <Image
              src={file}
              sizes="100vw"
              alt="Custom wallpaper"
              fill
              className="rounded-md object-cover"
            />
            <div className="absolute top-3 right-3">
              <i
                onClick={onClose}
                className="fi fi-sr-circle-xmark cursor-pointer text-white"
              ></i>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button
              onClick={onSave}
              className={`${
                isUploading
                  ? "text-red-500 bg-red-200"
                  : "text-white bg-red-500"
              } px-3 py-2 rounded-md`}
              disabled={isUploading}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md h-44 flex cursor-pointer ${
            isDragActive && "border-red-500 bg-red-100"
          }`}
          {...getRootProps()}
        >
          <div className="m-auto">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag drop some files here, or click to select files</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomWallpaper;
