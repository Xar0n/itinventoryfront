import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import TableList from './TableList'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import store, { resetFilters } from '../../../store'
import { useDispatch } from 'react-redux'
import * as _ from 'underscore'
function isEmpty(value) {
  return typeof value === 'string' && value.trim() === ''
}

const List = () => {
  const dispath = useDispatch()
  dispath(resetFilters())
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [listList, setListList] = useState([])
  useEffect(() => {
    axios.get('/api/lists').then((response) => {
      if (response.status === 200) {
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        setListList(response.data.lists)
      }
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
            disableFilters: true,
          },
          {
            Header: 'МОЛ',
            id: 'mols',
            accessor: (data) => {
              let output = []
              _.map(data.mols, (mol) => {
                output.push(mol.full_name)
              })
              return output.join(', ')
            },
            disableFilters: true,
          },
          {
            Header: 'Комиссия',
            accessor: (data) => {
              let output = []
              _.map(data.user, (com) => {
                output.push(com.name)
              })
              return output.join(', ')
            },
            disableFilters: true,
          },
          {
            Header: 'Основание',
            accessor: 'basis_full',
            disableFilters: true,
          },
          {
            Header: 'Причина',
            accessor: 'inventory_reason.name',
            disableFilters: true,
          },
          {
            Header: 'В работе',
            accessor: (d) => {
              if (d.in_works) return '+'
              return '-'
            },
            disableFilters: true,
          },
          {
            Header: 'Создатель',
            accessor: 'creator.name',
            disableFilters: false,
          },
        ],
      },
      {
        Header: 'Местоположение',
        columns: [
          {
            Header: 'Организация',
            accessor: 'organization.name',
            disableFilters: false,
          },
          {
            Header: 'Адрес',
            accessor: 'address.name',
            disableFilters: false,
          },
          {
            Header: 'Хранилище',
            accessor: 'room.storage',
            disableFilters: false,
          },
        ],
      },
      {
        Header: 'Время',
        columns: [
          {
            Header: 'Дата начала/окончания',
            accessor: (d) => {
              let start = new Date(d.date_start)
              let end = new Date(d.date_end)
              return (
                <div>
                  <span>{start.toLocaleDateString() + ' ' + start.toLocaleTimeString()}</span>
                  <br />
                  <span>{end.toLocaleDateString() + ' ' + end.toLocaleTimeString()}</span>
                </div>
              )
            },
            disableFilters: true,
          },
          {
            Header: 'Дата создания',
            id: 'created_at',
            accessor: (d) => {
              let dat = new Date(d.created_at)
              return dat.toLocaleDateString() + ' ' + dat.toLocaleTimeString()
            },
            disableFilters: true,
          },
        ],
      },
    ],
    [],
  )

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )
  }
  return (
    <>
      <CCard className="mb-5">
        <CCardBody>
          <CRow className={'mb-5'}>
            <CCol sm={5}>
              <h4 id="equipment-header" className="card-title mb-0">
                Ведомости
              </h4>
            </CCol>
          </CRow>
          <TableList columns={columns} data={listList} />
        </CCardBody>
      </CCard>
    </>
  )
}
export default List
