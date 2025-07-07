import { redirect } from 'next/navigation'

export default async function Page() {
  redirect('/test/redirects/success') // Returns a 307 Temporary Redirect
}
