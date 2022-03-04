import { useGlobalFilter, useSortBy, useTable } from 'react-table'
import {
  CButtonGroup,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cibAddthis, cilPlus } from '@coreui/icons'
import React from 'react'

// eslint-disable-next-line react/prop-types
function GlobalFilter({ filter, setFilter }) {
  return (
    <div className="col-sm-5">
      <CFormInput
        type="text"
        id="inputSearch"
        placeholder={'Поиск'}
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  )
}

// eslint-disable-next-line react/prop-types
function TableEquipment({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    allColumns,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
  )
  const { globalFilter } = state
  return (
    <>
      <CRow className={'mb-3'}>
        <CCol sm={8}>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </CCol>
        <CCol sm={4} className="d-none d-md-block">
          <CButtonGroup className="float-end">
            <CDropdown className="float-end mx-1">
              <CDropdownToggle variant={'outline'} color="dark">
                Поля
              </CDropdownToggle>
              <CDropdownMenu>
                {allColumns.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <CDropdownItem>
                    <div key={column.id}>
                      <label>
                        <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                        {column.render('Header')}
                      </label>
                    </div>
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
            <div className="float-end mx-1">
              <Link className="btn btn-outline-dark px-4 float-end" to={'store-equipment'}>
                <CIcon icon={cibAddthis} />
              </Link>
            </div>
          </CButtonGroup>
        </CCol>
      </CRow>
      <CTable bordered {...getTableProps()}>
        <CTableHead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <CTableHeaderCell
                  scope="col"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
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
                    <CTableDataCell {...cell.getCellProps()}>{cell.render('Cell')}</CTableDataCell>
                  )
                })}
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default TableEquipment
