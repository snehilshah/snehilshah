import { EntityPage } from '../../_components/EntityPage'
import { entity } from '../../_lib/goonj'
import { routeKey } from '../../_lib/params'

export default async function Page({ params }) {
  return <EntityPage kind='albums' entityKey={routeKey((await params).key)} />
}

export async function generateMetadata({ params }) {
  const e = await entity('albums', routeKey((await params).key))
  return { title: e?.name ?? 'Not found' }
}
