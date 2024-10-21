import AgencyDetails from '@/components/forms/agency-details'
import { ModeToggle } from '@/components/global/mode-toggle'
import { getUser, initUser } from '@/lib/queries'
import { UserButton } from '@clerk/nextjs'

type Props = {}

const Home = async(props: Props) => {
  let userdata = JSON.stringify(await initUser({}))
  const user = JSON.stringify(await getUser())
  return (
    <div>
      {user}
      {userdata}
      <UserButton/>
      <AgencyDetails/>
    </div>
  )
}

export default Home