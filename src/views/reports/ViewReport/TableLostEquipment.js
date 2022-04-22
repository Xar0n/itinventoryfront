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
function TableLostEquipment({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } =
    useTable({
      columns,
      data,
    })
  let index = 0
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
                <CTableRow className={'link'} scope="row" {...row.getRowProps()}>
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
          {/*footerGroups.map((group) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <CTableDataCell {...column.getFooterProps()}>
                  {column.render('Footer') === '' ? column.render('Footer') : 'ничего'}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))*/}
        </CTableBody>
      </CTable>
    </>
  )
}

export default TableLostEquipment
