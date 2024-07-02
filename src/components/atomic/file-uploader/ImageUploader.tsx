import DocumentIcon from "@/icons/document-icon.svg"
import Image from "next/image"

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'


interface ImageUploaderProps {
    onImageUpload: (image: string) => void
    image?: string
}

const ImageUploader = ({ onImageUpload, image }: ImageUploaderProps) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onImageUpload(url);
        }
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    return (
        <div  {...getRootProps()} id="ImageUpload" className="relative  cursor-pointer  rounded-[50%] border border-dashed border-grey-300 bg-white 
        hover:border-primary-500 focus:shadow-focus-primary focus:border-solid w-20 h-20 md:w-28 md:h-28 overflow-hidden
            dark:border-image-uploader-border-dark
            dark:bg-image-uploader-dark
            flex justify-center items-center
        ">
            {image && <Image alt="Image" src={image} width={100} height={100} className="w-full h-full  z-10  absolute  left-0 rounded-full" />}

            <input {...getInputProps()} type="file" accept="image/*" className="hidden z-10 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" />

            <div className="flex flex-col items-center justify-center ">
                <div className="z-20 text-black bg-white dark:text-white dark:bg-black rounded-full p-1">
                    <DocumentIcon />
                </div>
            </div>

        </div >
    )
}

export default ImageUploader;