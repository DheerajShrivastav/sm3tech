import AgencyDetails from '@/components/forms/agency-details'
import { getUser, initUser } from '@/lib/queries'

type Props = {}

const Home = async(props: Props) => {
  let userdata = JSON.stringify(await initUser({}))
  const user = JSON.stringify(await getUser())
  return (
    <div>
      {user}
      {userdata}
      <AgencyDetails/>
    </div>
  )
}

export default Home