import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import Select from 'react-select'

const CreateEquipment = () => {
  const [location, setLocation] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedInventoryNumber, setSelectedInventoryNumber] = useState(null)
  const [selectedName, setSelectedName] = useState(null)
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]
  return (
    <>
      <CCard className="mb-5">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="equipment-header" className="card-title mb-0">
                Создать оборудование
              </h4>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor={'inputLocation'} className="col-sm-2 col-form-label">
              Инвентарный номер
            </CFormLabel>
            <div className="col-sm-10">
              <Select
                isClearable
                placeholder="Введите или выберите инвентаный номер"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor={'inputLocation'} className="col-sm-2 col-form-label">
              Доп. инф.
            </CFormLabel>
            <div className="col-sm-10">
              <CFormInput
                type={'text'}
                id={'inputLocation'}
                placeholder="Введите дополнительную информацию"
                aria-label="Дополнительная информация"
                aria-describedby="location"
                name={'location'}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default CreateEquipment