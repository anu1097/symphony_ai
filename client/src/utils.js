import {ALLOWED_MIME_TYPES, MAX_FILE_SIZE} from "./Constants";
import {toast} from "react-toastify";
import {useDebugValue, useState} from "react";

export const checkMimeType = (file) => {
    if (file && !ALLOWED_MIME_TYPES.includes(file.type)) {
        const err = `${file.type} is not a supported format`;
        toast.error(err);
        return false;
    };
    return true;
}

export const checkFileSize = (file) => {
    if (file && file.size > MAX_FILE_SIZE) {
        const err = `${file.type} is too large, please pick a smaller file`;
        toast.error(err);
        return false;
    };
    return true;
}

export const useStateWithLabel = (initialValue, name) => {
    const [value, setValue] = useState(initialValue);
    useDebugValue(`${name}: ${value}`);
    return [value, setValue];
}