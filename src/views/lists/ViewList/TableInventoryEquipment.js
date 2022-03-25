import {
  useGlobalFilter,
  useFilters,
  useSortBy,
  useTable,
  useAsyncDebounce,
  usePagination,
} from 'react-table'
import {
  CButton,
  CButtonGroup,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownItemPlain,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Link, useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cibAddthis, cilPlus } from '@coreui/icons'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import _, { isNull } from 'underscore'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import store, { setSearchFilter } from '../../../store'

function arrUnique(arr) {
  var cleaned = []
  arr.forEach(function (itm) {
    var unique = true
    cleaned.forEach(function (itm2) {
      if (_.isEqual(itm, itm2)) unique = false
    })
    if (unique) cleaned.push(itm)
  })
  return cleaned
}

function objectByHeader(array, header) {
  let index = array.findIndex(function (item, i) {
    return item.Header === header
  })
  return array[index]
}

// eslint-disable-next-line react/prop-types
function GlobalFilter({ preGlobalFilteredRows, filter, setFilter }) {
  // eslint-disable-next-line react/prop-types
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(filter)
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined)
  }, 200)
  return (
    <div className="col-sm-3 float-end">
      <CFormInput
        type="text"
        id="inputSearch"
        placeholder={`Поиск среди ${count} строк`}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
    </div>
  )
}

// eslint-disable-next-line react/prop-types
function TableInventoryEquipment({ columns, data }) {
  const history = useHistory()
  const dispath = useDispatch()
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    visibleColumns,
    setGlobalFilter,
    preGlobalFilteredRows,
    allColumns,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    setPageSize,
    pageCount,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
  )

  const { globalFilter, pageIndex, pageSize } = state
  dispath(setSearchFilter('4566'))
  return (
    <>
      <CRow className={'mb-3'}>
        <CCol sm={12}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
        </CCol>
      </CRow>
      <CTable bordered {...getTableProps()} className={'selectTable'}>
        <CTableHead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <CTableHeaderCell scope="col" {...column.getHeaderProps()}>
                  <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </div>
                </CTableHeaderCell>
              ))}
            </CTableRow>
          ))}
        </CTableHead>
        <CTableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              // eslint-disable-next-line react/jsx-key
              <CTableRow
                className={'link'}
                scope="row"
                {...row.getRowProps()}
                onClick={() => {
                  history.push(`equipment/${row.values['id']}`)
                }}
              >
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
      <CRow className="mb-auto">
        <CFormLabel htmlFor={'selectStorage'} className="col-sm-auto col-form-label">
          <span>
            Страница{' '}
            <strong>
              {pageIndex + 1} из {pageOptions.length}
            </strong>{' '}
            | Перейти на страницу:
          </span>
        </CFormLabel>
        <div className="col-sm-1">
          <CFormInput
            type="number"
            id="inputSearch"
            placeholder={`Поиск среди  строк`}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
          />
        </div>
        <div className="col-sm-auto">
          <CFormSelect value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            {[25, 50, 75, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Показать {pageSize}
              </option>
            ))}
          </CFormSelect>
        </div>
        <div className="col-sm-auto float-end">
          <CPagination align="end" aria-label="Навигация">
            <CPaginationItem onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </CPaginationItem>
            <CPaginationItem onClick={() => previousPage()} disabled={!canPreviousPage}>
              Прошлая
            </CPaginationItem>
            <CPaginationItem onClick={() => nextPage()} disabled={!canNextPage}>
              Следующая
            </CPaginationItem>
            <CPaginationItem onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </CPaginationItem>
          </CPagination>
        </div>
      </CRow>
    </>
  )
}

export default TableInventoryEquipment
