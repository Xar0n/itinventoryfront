import React from 'react'

const Object = React.lazy(() => import('./views/objects/Object/ObjectE'))
const List = React.lazy(() => import('./views/lists/List/List'))
const Equipment = React.lazy(() => import('./views/equipments/Equipment/Equipment'))
const ViewEquipment = React.lazy(() => import('./views/equipments/ViewEquipment/ViewEquipment'))
const EditEquipment = React.lazy(() => import('./views/equipments/EditEquipment/EditEquipment'))
const CreateObject = React.lazy(() => import('./views/objects/CreateObject/CreateObject'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const CreateList = React.lazy(() => import('./views/lists/CreateList/CreateList'))
const ViewList = React.lazy(() => import('./views/lists/ViewList/ViewList'))

const routes = [
  { path: '/', exact: true, name: 'Главная' },
  { path: '/dashboard', name: 'Статистика', component: Dashboard },
  { path: '/object', name: 'Объекты', component: Object, exact: true },
  { path: '/object/create', name: 'Создание', component: CreateObject },
  { path: '/equipment', name: 'Оборудование', component: Equipment, exact: true },
  { path: '/equipment/edit/:id', name: 'Редактирование', component: EditEquipment },
  { path: '/equipment/:id', exact: true, name: 'Просмотр', component: ViewEquipment },

  { path: '/list', name: 'Ведомости', component: List, exact: true },
  { path: '/list/create', name: 'Создание', component: CreateList, exact: true },
  { path: '/list/:id', exact: true, name: 'Просмотр', component: ViewList },
]

export default routes
