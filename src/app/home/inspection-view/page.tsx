import React, { memo } from 'react'
import AdminView from '../../../components/forms/admin-view'
import UserView from '@/components/forms/user-view'
import { getUser } from '@/lib/queries'
import { IUser } from '@/models/user.model'

const page = memo(async () => {
  let id = '66ce17fb68cfe86ae916886b'
  let user = await getUser()
  let role = user?.role

  return <div>{role === 'Admin' ? <AdminView /> : <UserView id={id} />}</div>
})

export default page
