import React from 'react'

//const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Object = React.lazy(() => import('./views/objects/Object/ObjectE'))
const CreateObject = React.lazy(() => import('./views/objects/CreateObject/CreateObject'))
const ViewObject = React.lazy(() => import('./views/objects/ViewObject/ViewObject'))

const Equipment = React.lazy(() => import('./views/equipments/Equipment/Equipment'))
const ViewEquipment = React.lazy(() => import('./views/equipments/ViewEquipment/ViewEquipment'))
const EditEquipment = React.lazy(() => import('./views/equipments/EditEquipment/EditEquipment'))
const HistoryEquipment = React.lazy(() =>
  import('./views/equipments/HistoryEquipment/HistoryEquipment'),
)

const List = React.lazy(() => import('./views/lists/List/List'))
const CreateList = React.lazy(() => import('./views/lists/CreateList/CreateList'))
const ViewList = React.lazy(() => import('./views/lists/ViewList/ViewList'))

const ViewEquipmentFind = React.lazy(() =>
  import('./views/equipments_find/ViewEquipmentFind/ViewEquipmentFind'),
)
const CreateEquipmentFind = React.lazy(() =>
  import('./views/equipments_find/CreateEquipmentFind/CreateEquipmentFind'),
)

const GenerateBarcode = React.lazy(() =>
  import('./views/generate_barcode/GenerateBarcode/GenerateBarcode'),
)

const PrintBarcode = React.lazy(() => import('./views/print_barcode/PrintBarcode/PrintBarcode'))
/*
const EditEquipmentFind = React.lazy(() => import('./views/equipments_find/EditEquipmentFind'))
*/

const Report = React.lazy(() => import('./views/reports/Report/Report'))
const ViewReport = React.lazy(() => import('./views/reports/ViewReport/ViewReport'))

const routes = [
  { path: '/', exact: true, name: 'Главная' },
  { path: '/object', name: 'Объекты', component: Object, exact: true },
  { path: '/object/create', name: 'Создание', component: CreateObject },
  { path: '/object/:id', name: 'Просмотр', component: ViewObject },
  { path: '/equipment', name: 'Оборудование', component: Equipment, exact: true },
  { path: '/equipment/:id', exact: true, name: 'Просмотр', component: ViewEquipment },
  { path: '/equipment/edit/:id', name: 'Редактирование', component: EditEquipment },
  { path: '/equipment/history/:id', name: 'История', component: HistoryEquipment },
  { path: '/list', name: 'Ведомости', component: List, exact: true },
  { path: '/list/create', name: 'Создание', component: CreateList, exact: true },
  { path: '/list/:id', exact: true, name: 'Просмотр', component: ViewList },
  {
    path: '/list/:id/create',
    name: 'Создание',
    component: CreateEquipmentFind,
    exact: true,
  },
  {
    path: '/list/:id/:id_eq',
    name: 'Просмотр найденного оборудования',
    component: ViewEquipmentFind,
    exact: true,
  },
  {
    path: '/list/:id/equipment-find/edit/:id_eq',
    name: 'Редактирование',
    component: CreateEquipmentFind,
    exact: true,
  },
  { path: '/report', name: 'Отчеты', component: Report, exact: true },
  { path: '/report/:id', exact: true, name: 'Просмотр', component: ViewReport },

  {
    path: '/generate-barcode',
    name: 'Формирование штрихкодов',
    component: GenerateBarcode,
  },

  {
    path: '/print-barcode',
    name: 'Печать штрихкодов',
    component: PrintBarcode,
  },
]

export default routes
