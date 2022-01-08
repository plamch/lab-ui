import { AgGridColumn, AgGridReact } from 'ag-grid-react'

export const Grid = () => {
    const rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: '911', price: 72000 },
    ]
    return (
        <div className="ag-theme-alpine-dark" style={{ height: 200, width: 600 }}>
            <AgGridReact rowData={rowData}>
                <AgGridColumn field="make" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="model" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="price" sortable={true} filter={true}></AgGridColumn>
            </AgGridReact>
        </div>
    )
}
