import React from 'react';
import {Progress} from "reactstrap";

export const FileUploaderComponent = (props) => {
    const {onChangeHandler, onClickHandler, loaded, selectedFile} = props;
    return (
        <div>
            <div className="files">
                <label>Upload Your File </label>
                <input id="inputFileUpload" type="file"
                       onChange={onChangeHandler}/>
            </div>
            <div>
                <Progress max="100" color="success"
                          value={loaded}>{Math.round(loaded)}%</Progress>

            </div>

            <button disabled={!selectedFile}
                    type="button" className="btn btn-success btn-block"
                    onClick={onClickHandler}>
                Upload
            </button>
        </div>
    );
}