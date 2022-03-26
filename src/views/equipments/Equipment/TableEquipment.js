import { useGlobalFilter, useFilters, useSortBy, useTable, usePagination } from 'react-table'
import {
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
import { cilPlus } from '@coreui/icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { GlobalFilter, SelectColumnFilter } from './FiltersEquipment'
import store, { setOrganizationFilter, setSearchFilter } from '../../../store'
function objectByHeader(array, header) {
  let index = array.findIndex(function (item, i) {
    return item.Header === header
  })
  return array[index]
}

// eslint-disable-next-line react/prop-types
function TableEquipment({ columns, data }) {
  const history = useHistory()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const defaultColumn = React.useMemo(
    () => ({
      Filter: SelectColumnFilter,
    }),
    [],
  )
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
      defaultColumn,
      initialState: { pageIndex: 0, hiddenColumns: ['equipment.view.name'] },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
  )

  const { globalFilter, pageIndex, pageSize, filters } = state
  let objectEmployee = objectByHeader(allColumns, 'Сотрудник')
  let objectOrganization = objectByHeader(allColumns, 'Организация')
  let objectAddress = objectByHeader(allColumns, 'Адрес')
  let objectStorage = objectByHeader(allColumns, 'Хранилище')
  console.log(filters.find((e) => e.id === 'employee.full_name'))
  if (globalFilter) {
    dispath(setSearchFilter(globalFilter))
  }
  let org = filters.find((e) => e.id === 'equipment.organization.name')
  if (org) {
    dispath(setOrganizationFilter(org.value))
  }
  console.log(store.getState())
  return (
    <>
      <CRow className={'mb-3'}>
        <CCol sm={8}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
        </CCol>
        <CCol sm={4} className="d-none d-md-block">
          <CButtonGroup className="float-end">
            <CDropdown className="float-end mx-1">
              <CDropdownToggle variant={'outline'} color="dark" className={'btn-select'}>
                Местоположение
              </CDropdownToggle>
              <CDropdownMenu className={'ul'}>
                <CDropdownItemPlain>
                  <div>Выберите адрес:</div>
                </CDropdownItemPlain>
                <CDropdownItemPlain>
                  {objectAddress.canFilter ? objectAddress.render('Filter') : null}
                </CDropdownItemPlain>
                <CDropdownItemPlain>
                  <div>Выберите склад/кабинет:</div>
                </CDropdownItemPlain>
                <CDropdownItemPlain>
                  {objectStorage.canFilter ? objectStorage.render('Filter') : null}
                </CDropdownItemPlain>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="float-end mx-1">
              <CDropdownToggle variant={'outline'} color="dark" className={'btn-select'}>
                Использование
              </CDropdownToggle>
              <CDropdownMenu className={'ul'}>
                <CDropdownItemPlain>
                  <div>Выберите организацию:</div>
                </CDropdownItemPlain>
                <CDropdownItemPlain>
                  {objectOrganization.canFilter ? objectOrganization.render('Filter') : null}
                </CDropdownItemPlain>
                <CDropdownItemPlain>
                  <div>Выберите сотрудника:</div>
                </CDropdownItemPlain>
                <CDropdownItemPlain>
                  {objectEmployee.canFilter ? objectEmployee.render('Filter') : null}
                </CDropdownItemPlain>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="float-end mx-1">
              <CDropdownToggle variant={'outline'} color="dark" className={'btn-select'}>
                Поля
              </CDropdownToggle>
              <CDropdownMenu>
                {allColumns.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <CDropdownItem key={column.id}>
                    <div>
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
              <Link
                className="btn btn-outline-dark px-4 float-end btn-select"
                to={'equipment/store'}
              >
                <CIcon icon={cilPlus} />
              </Link>
            </div>
          </CButtonGroup>
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
                  {/*<div>{column.canFilter ? column.render('Filter') : null}</div>*/}
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

export default TableEquipment
