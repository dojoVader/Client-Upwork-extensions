import React, {useEffect, useState} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {SkoolStorage} from "../../skool/SkoolStorage";
import {SkoolMemberEntity} from "../../skool/SkoolAutomation";
import {Button} from "@mui/material-next";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 130 },
];



const skoolStorage = new SkoolStorage();

export const SkoolLogs = () => {
    const [logs, setLogs] = useState<{id: number, name: string}[]>([]);

    useEffect(() => {
        (async () => {

            const logs = await skoolStorage.getProcessedRecords();
            setLogs(logs as any);
        })();
    }, []);

    return (
        <div style={{ height: 'auto', width: '94%', margin:"3%" }}>
            <h1>Export Processed Skool Logs</h1>

            <Button variant="filled"
                onClick={async() => {
                    const csv = logs.map((log) => {
                        return `${log.id},${log.name}\n`;
                    }).join("");
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'skool-logs.csv';
                    a.click();
                    // clear the storage after download
                   await skoolStorage.clearProcessedRecords();
                   setLogs([])

                }}
                style={{
                borderRadius: 5,
                marginBottom:20,
                marginTop:5

            }}>Export to CSV</Button>

            <DataGrid
                rows={logs}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}