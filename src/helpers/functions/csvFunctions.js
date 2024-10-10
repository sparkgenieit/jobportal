
export function tableToCSV(table, output_file_name) {
    let csvContent = "";
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let rowData = [];

        // Iterate through each cell in the row
        for (let j = 0; j < row.cells.length; j++) {
            rowData.push(row.cells[j].textContent);
        }
        csvContent += rowData.join(",") + "\n";
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${output_file_name}.csv`;
    link.click();
    link.remove()
}