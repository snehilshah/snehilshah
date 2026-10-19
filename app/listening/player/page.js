import './player.css'
import { Shell } from '../_components/Shell'
import { Player } from './_ui/Player'
import { playerSongs } from '../_lib/player'

// Links and lyrics are looked up when the page is built; rebuilt hourly.
export const revalidate = 3600

export const metadata = { title: 'Player' }

export default async function PlayerPage() {
  const songs = await playerSongs()
  return (
    <Shell active='/player' ownBackdrop>
      <Player songs={songs} />
    </Shell>
  )
}
