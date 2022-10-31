import GlobalStyle from '../components/GlobalStyle'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {
  const { asPath, isReady } = useRouter()
  const [location, setLocation] = useState('')

  useEffect(() => {
    if (isReady) {
      setLocation(new URL(asPath, window?.location?.href).pathname)
    }
  }, [asPath, isReady])

  return (
    <>
      <GlobalStyle />
      <Layout location={location}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
