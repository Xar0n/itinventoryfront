import React from 'react'

const Object = React.lazy(() => import('./views/objects/Object/ObjectE'))
const Equipment = React.lazy(() => import('./views/equipments/Equipment/Equipment'))
const CreateEquipment = React.lazy(() =>
  import('./views/equipments/CreateEquipment/CreateEquipment'),
)
const ViewEquipment = React.lazy(() => import('./views/equipments/ViewEquipment/ViewEquipment'))
const CreateObject = React.lazy(() => import('./views/objects/CreateObject/CreateObject'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Главная' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/object', name: 'Объекты', component: Object, exact: true },
  { path: '/object/store', name: 'Создать объект', component: CreateObject },
  { path: '/equipment', name: 'Оборудование', component: Equipment, exact: true },
  { path: '/equipment/store', name: 'Создать оборудование', component: CreateEquipment },
  { path: '/equipment/:id', name: 'Просмотр', component: ViewEquipment },
]

export default routes
