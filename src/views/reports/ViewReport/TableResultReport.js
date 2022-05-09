import { useTable } from 'react-table'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'

// eslint-disable-next-line react/prop-types
function TableResultReport({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })
  return (
    <>
      <CTable bordered {...getTableProps()}>
        <CTableHead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <CTableHeaderCell scope="col" {...column.getHeaderProps()}>
                  <div {...column.getHeaderProps()}>{column.render('Header')}</div>
                </CTableHeaderCell>
              ))}
            </CTableRow>
          ))}
        </CTableHead>
        <CTableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <>
                <CTableRow scope="row" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <CTableDataCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </CTableDataCell>
                    )
                  })}
                </CTableRow>
              </>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default TableResultReport
