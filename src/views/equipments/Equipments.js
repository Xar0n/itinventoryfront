import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useTable, useGlobalFilter, useSortBy } from 'react-table'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
function GlobalFilter({ filter, setFilter }) {
  return (
    <CRow className="mb-3">
      <CFormLabel htmlFor="inputSearch" className="col-sm-2 col-form-label">
        Поиск
      </CFormLabel>
      <div className="col-sm-10">
        <CFormInput
          type="text"
          id="inputSearch"
          value={filter || ''}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </CRow>
  )
}

// eslint-disable-next-line react/prop-types
function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
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
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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

const Equipments = () => {
  const [loading, setLoading] = useState(true)
  const [equpipmentsList, setEqupipmentsList] = useState([])
  useEffect(() => {
    axios.get('/api/equipments').then((response) => {
      if (response.status === 200) {
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        setEqupipmentsList(response.data.equipments)
      }
      //console.log(equpipmentsList)
      setLoading(false)
    })
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Основное',
        columns: [
          {
            Header: '№',
            accessor: 'id',
          },
          {
            Header: 'Название',
            accessor: 'equipment.config_item.name',
          },
          {
            Header: 'Инвентарный номер',
            accessor: 'equipment.inventory_number.number',
          },
          {
            Header: 'Штрих-код',
            accessor: 'barcode.code',
          },
        ],
      },
      {
        Header: 'Местоположение',
        columns: [
          {
            Header: 'Организация',
            accessor: 'equipment.organization.name',
          },
          {
            Header: 'Адрес',
            accessor: 'equipment.room.address.name',
          },
          {
            Header: 'Хранилище',
            accessor: 'equipment.room.storage',
          },
          {
            Header: 'Доп.инф.',
            accessor: 'location',
          },
          {
            Header: 'Сотрудник',
            accessor: 'employee.full_name',
          },
        ],
      },
      {
        Header: 'Дополнительное',
        columns: [
          {
            Header: 'Вид',
            accessor: 'equipment.view.name',
          },
          {
            Header: 'Сорт',
            accessor: 'equipment.grade.name',
          },
          {
            Header: 'Группа',
            accessor: 'equipment.group.name',
          },
        ],
      },
    ],
    [],
  )
  return (
    <>
      <CCard className="mb-5">
        <CCardHeader>Оборудование</CCardHeader>
        <CCardBody>
          <Table columns={columns} data={equpipmentsList} />
        </CCardBody>
      </CCard>
    </>
  )
}
export default React.memo(Equipments)
