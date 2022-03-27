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
            Header: 'Дата начала/окончания',
            accessor: 'date_start',
            Cell: (props) => (
              <div>
                {/* eslint-disable-next-line react/prop-types */}
                <span className="date_start">{props.value}</span>
                <br />
                <span className="email">2</span>
              </div>
            ),
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
            accessor: 'in_works',
            disableFilters: true,
          },
          {
            Header: 'Создатель',
            accessor: 'creator.name',
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
      {
        Header: 'Местоположение',
        columns: [
          {
            Header: 'Организация',
            accessor: 'organization.name',
            disableFilters: true,
          },
          {
            Header: 'Адрес',
            accessor: 'address.name',
            disableFilters: true,
          },
          {
            Header: 'Склад/кабинет',
            accessor: 'room.storage',
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
