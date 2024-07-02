import DocumentIcon from "@/icons/document-icon.svg"

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'


interface FileUploaderProps {
    onFileUpload: (file: string) => void
    uploadText?: string | React.ReactNode
}

const FileUploader = ({ onFileUpload, uploadText }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onFileUpload(url);
        }
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    return (
        <div  {...getRootProps()} id="FileUpload" className="relative w-full cursor-pointer appearance-none rounded border border-dashed border-grey-300 bg-white py-14 px-16
        hover:border-primary-500 focus:shadow-focus-primary focus:border-solid 
        dark:border-image-uploader-border-dark
        dark:bg-image-uploader-dark">
            <input {...getInputProps()} type="file" accept="image/*" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" />
            <div className="flex flex-col items-center justify-center space-y-3">
                <span className="flex p-2 items-center justify-center rounded-lg  bg-grey-200 dark:bg-card-dark dark:text-white">
                    <DocumentIcon />
                </span>
                <p className="dark:text-white">{uploadText}</p>
            </div>
        </div>
    )
}

export default FileUploader