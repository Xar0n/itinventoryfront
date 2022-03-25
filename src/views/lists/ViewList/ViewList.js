import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import TableInventoryEquipment from './TableInventoryEquipment'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const ViewList = () => {
  const history = useHistory()
  const credentialsButtonClick = (e) => {
    e.preventDefault()
    const data = {
      //name: loginInput.name,
    }
    axios({
      url: 'api/equipments/export',
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'blob' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'equipments.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }
  const [loading, setLoading] = useState(true)
  const [equipmentList, setEquipmentList] = useState([])
  useEffect(() => {
    axios.get('/api/equipments').then((response) => {
      if (response.status === 200) {
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        setEquipmentList(response.data.equipments)
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
                Проведение инвентаризации
              </h4>
            </CCol>
          </CRow>

          <CRow className={'mb-3'}>
            <CCol sm={5}>
              <h5 className="mb-3">Инвентаризируемое оборудование</h5>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end">
                <CButton variant={'outline'} color="dark" className="mx-1 btn-select">
                  Печать
                </CButton>
                <CButton variant={'outline'} color="dark" className="mx-1 btn-select">
                  Экспортировать
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <TableInventoryEquipment columns={columns} data={equipmentList} />
        </CCardBody>
      </CCard>
    </>
  )
}
export default ViewList
