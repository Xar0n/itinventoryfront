import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import TableObject from './TableObject'

const ObjectE = () => {
  const [objectsList, setObjectsList] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get('/api/objects').then((response) => {
      if (response.status === 200) {
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        setObjectsList(response.data.objects)
        setLoading(false)
      }
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
            Header: 'Название',
            accessor: 'config_item.name',
            disableFilters: true,
          },
          {
            Header: 'Инвентарный номер',
            accessor: 'inventory_number.number',
            disableFilters: true,
          },
          {
            Header: 'Количество',
            accessor: 'count',
            disableFilters: true,
          },
          {
            Header: 'Назначено',
            accessor: 'equipment_num_count',
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
            disableFilters: false,
          },
          {
            Header: 'Адрес',
            accessor: 'room.address.name',
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
        Header: 'Дополнительное',
        columns: [
          {
            Header: 'Вид',
            accessor: 'view.name',
            disableFilters: false,
          },
          {
            Header: 'Сорт',
            accessor: 'grade.name',
            disableFilters: false,
          },
          {
            Header: 'Группа',
            accessor: 'group.name',
            disableFilters: false,
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
              <h4 id="object-header" className="card-title mb-0">
                Объекты
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end">
                <CButton variant={'outline'} color="dark" className="mx-1 btn-select">
                  Импортировать
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <TableObject columns={columns} data={objectsList} />
        </CCardBody>
      </CCard>
    </>
  )
}
export default ObjectE
