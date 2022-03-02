import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useTable } from 'react-table'
import makeData from './makeData'
const Equipments = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    [],
  )
  const data = React.useMemo(() => makeData(20), [])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Оборудование</CCardHeader>
        <CCardBody>
          <CTable bordered {...getTableProps()}>
            <CTableHead>
              {headerGroups.map((headerGroup) => (
                // eslint-disable-next-line react/jsx-key
                <CTableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    // eslint-disable-next-line react/jsx-key
                    <CTableHeaderCell scope="col" {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              ))}
            </CTableHead>
            <CTableBody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  // eslint-disable-next-line react/jsx-key
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
                )
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}
export default React.memo(Equipments)
