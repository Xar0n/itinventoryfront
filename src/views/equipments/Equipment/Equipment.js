import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import TableEquipment from './TableEquipment'
import Swal from 'sweetalert2'

const Equipment = () => {
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
            disableFilters: true,
          },
          {
            Header: 'Название',
            accessor: 'equipment.config_item.name',
            disableFilters: true,
          },
          {
            Header: 'Инвентарный номер',
            accessor: 'equipment.inventory_number.number',
            disableFilters: true,
          },
          {
            Header: 'Штрих-код',
            accessor: 'barcode.code',
            disableFilters: true,
          },
        ],
      },
      {
        Header: 'Местоположение',
        columns: [
          {
            Header: 'Организация',
            accessor: 'equipment.organization.name',
            disableFilters: false,
          },
          {
            Header: 'Адрес',
            accessor: 'equipment.room.address.name',
            disableFilters: false,
          },
          {
            Header: 'Хранилище',
            accessor: 'equipment.room.storage',
            disableFilters: false,
          },
          {
            Header: 'Доп.инф.',
            accessor: 'location',
            disableFilters: true,
          },
          {
            Header: 'Сотрудник',
            accessor: 'employee.full_name',
            disableFilters: false,
          },
        ],
      },
      {
        Header: 'Дополнительное',
        columns: [
          {
            Header: 'Вид',
            accessor: 'equipment.view.name',
            disableFilters: true,
          },
          {
            Header: 'Сорт',
            accessor: 'equipment.grade.name',
            disableFilters: true,
          },
          {
            Header: 'Группа',
            accessor: 'equipment.group.name',
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
                Оборудование
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end">
                <CButton variant={'outline'} color="dark" className="mx-1 btn-select">
                  Инвентаризация
                </CButton>
                <CButton
                  onClick={credentialsButtonClick}
                  variant={'outline'}
                  color="dark"
                  className="mx-1 btn-select"
                >
                  Учетные данные
                </CButton>
                <CButton variant={'outline'} color="dark" className="mx-1 btn-select">
                  Импортировать
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <TableEquipment columns={columns} data={equipmentList} />
        </CCardBody>
      </CCard>
    </>
  )
}
export default Equipment
