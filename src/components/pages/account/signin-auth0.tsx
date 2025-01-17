// 'use client'

import { SignInLayout } from '@layouts/signin-layout'
import {
  bearerHeaders,
  type IUser,
  MYACCOUNT_ROUTE,
  SESSION_AUTH0_SIGNIN_URL,
  SIGNEDIN_ROUTE,
  TEXT_SIGN_IN,
} from '@modules/edb'

import { useAuth0 } from '@auth0/auth0-react'
import { AuthProvider } from '@providers/auth-provider'

import { Button } from '@components/shadcn/ui/themed/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CenteredCardContainer,
} from '@components/shadcn/ui/themed/card'

import { useEdbAuth } from '@providers/edb-auth-provider'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { redirect } from '@lib/urls'
import { CoreProviders } from '@providers/core-providers'
import { useEffect, useState } from 'react'

// async function signIn(jwt: string): Promise<AxiosResponse> {
//   console.log("signin")

//   return await queryClient.fetchQuery("signin", async () => {
//     //const callbackUrl = `${SITE_URL}/login`

//     return axios.post(
//       SESSION_PASSWORDLESS_SIGNIN_URL,
//       {},

//       {
//         headers: bearerHeaders(jwt),
//         withCredentials: true,
//       },
//     )
//   })
// }

function SignInPage() {
  const queryClient = useQueryClient()

  //const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { getCachedUser: refreshEdbUser } = useEdbAuth()

  const [edbUser, setUser] = useState<IUser | null>(null)

  const {
    isAuthenticated,
    error,
    user,
    getIdTokenClaims,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0()

  useEffect(() => {
    async function load() {
      const x = await getIdTokenClaims()

      console.log(x)

      const auth0Token = await getAccessTokenSilently()

      console.log('sliden', auth0Token)

      try {
        const res = await queryClient.fetchQuery({
          queryKey: ['update'],
          queryFn: () =>
            axios.post(
              SESSION_AUTH0_SIGNIN_URL, //SESSION_UPDATE_USER_URL,
              {},
              {
                headers: bearerHeaders(auth0Token),
                withCredentials: true,
              }
            ),
        })

        // what is returned is the updated user
        console.log(res.data.data)

        // force user to be refreshed
        setUser(await refreshEdbUser())
      } catch (error) {
        console.error(error)
      }
    }

    if (isAuthenticated) {
      load()
    }
  }, [isAuthenticated])

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if user has been loaded, redirect to account page
  if (edbUser && edbUser.publicId !== '') {
    redirect(`${SIGNEDIN_ROUTE}?callbackUrl=${MYACCOUNT_ROUTE}`)
  }

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (isAuthenticated && user) {
    console.log(user)
    return (
      <SignInLayout signInEnabled={false}>
        <div>
          Hello {user.name}{' '}
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.href } })
            }
          >
            Log out
          </button>
        </div>
      </SignInLayout>
    )
  }

  // Allow users to signin
  return (
    <SignInLayout signInEnabled={false}>
      <CenteredCardContainer>
        <Card>
          <CardHeader>
            <CardTitle>{TEXT_SIGN_IN}</CardTitle>
            <CardDescription>
              To sign in to your account, click the button below. You can use
              your email address, Google or GitHub accounts.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-row items-start gap-2">
            <Button
              variant="theme"
              //className="w-full"
              size="lg"
              onClick={() => loginWithRedirect()}
              aria-label={TEXT_SIGN_IN}
            >
              {TEXT_SIGN_IN}
            </Button>
          </CardFooter>
        </Card>

        {/* <CreateAccountLink /> */}
      </CenteredCardContainer>
    </SignInLayout>
  )
}

export function SignInQueryPage() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  if (!url) {
    return null
  }

  return (
    <CoreProviders>
      <AuthProvider callbackUrl={url}>
        <SignInPage />
      </AuthProvider>
    </CoreProviders>
  )
}
