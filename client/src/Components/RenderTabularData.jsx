import React from 'react';
import {Table} from "reactstrap";
import {useStateWithLabel} from "../utils";
import {DEFAULT_DELIMITER, DEFAULT_ROWS, MAX_COLUMNS} from "../Constants";

export const RenderTabularData = (props) => {
    const {fileContent} = props;
    const [rows, setRows] = useStateWithLabel(DEFAULT_ROWS, 'rows');
    const [delimiter, setDelimiter] = useStateWithLabel(DEFAULT_DELIMITER, 'delimiter');

    const getTabularDataFromFile = () => {
        let tabularFileContent = [];
        let rows = fileContent.split("\n");
        rows.forEach(row => {
            tabularFileContent.push(row.split(delimiter, MAX_COLUMNS));
        });
        return tabularFileContent;
    }

    const renderTableData = () => {
        const tabularFileContent = getTabularDataFromFile();
        const tabularDataToRender = tabularFileContent.slice(0, rows);
        return tabularDataToRender.map((rowData, index) => {
            return (
                <tr key={index}>
                    {
                        rowData.map((columnItem, index2) => <td key={index2}>{columnItem}</td>)
                    }
                </tr>
            )
        })
    }

    return (
        <div>
            <div className ="tableFilterInput">
                <p>Delimiter :</p>
                <input type="text" value={delimiter}
                       onChange={(e) => {
                           setDelimiter(e.target.value)
                       }}
                />
                <p>Rows :</p>
                <input type="text" value={rows}
                       onChange={(e) => setRows(e.target.value)}
                />
            </div>
            {
                <Table id='students' className="form-group" bordered>
                    <tbody>
                    {renderTableData()}
                    </tbody>
                </Table>
            }
        </div>
    )
}