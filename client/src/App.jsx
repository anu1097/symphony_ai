import React from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {FileUploaderComponent} from "./Components/FileUploaderComponent";
import {checkFileSize, checkMimeType, useStateWithLabel} from "./utils";
import {RenderTabularData} from "./Components/RenderTabularData";

const App = () => {

    const [selectedFile, setSelectedFile] = useStateWithLabel(null, "selectedFile");
    const [loaded, setLoaded] = useStateWithLabel(0, "loaded");
    const [fileContent, setFileContent] = useStateWithLabel(null, "fileContent");
    let fileReader;

    const handleFileRead = () => {
        const fileContent = fileReader.result;
        console.log(fileContent);
        setFileContent(fileContent);
    }

    const onChangeHandler = (event) => {
        let file = event.target.files[0];
        if (file && checkMimeType(file) && checkFileSize(file)) {
            // if return true allow to setState
            setSelectedFile(file);
            setLoaded(0);
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file);
        } else {
            setSelectedFile(null);
            setLoaded(0);
            event.target.value = null;
        }
    }

    const onClickHandler = () => {
        const data = new FormData()
        data.append('file', selectedFile);
        axios.post("http://localhost:8080/upload", data, {
            onUploadProgress: ProgressEvent => {
                setLoaded((ProgressEvent.loaded / ProgressEvent.total * 100));
            },
        })
            .then(res => { // then print response status
                toast.success('upload success');
                setSelectedFile(null);
                document.getElementById("inputFileUpload").value = null;
            })
            .catch(err => { // then print response status
                toast.error('upload fail');
            })
    }

    return (
        <div className="container">
            <ToastContainer/>
            <FileUploaderComponent
                onChangeHandler={onChangeHandler}
                onClickHandler={onClickHandler}
                loaded={loaded}
                selectedFile={selectedFile}
            />
            {
                fileContent && loaded === 100 &&
                <RenderTabularData
                    fileContent={fileContent}
                />
            }
        </div>
    );
}

export default App;