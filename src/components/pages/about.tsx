// 'use client'

import { BaseCol } from '@components/base-col'
import { ThemeLink } from '@components/link/theme-link'

import {
  BaseCard,
  Card,
  CardContainer,
} from '@components/shadcn/ui/themed/card'
import { MenuSeparator } from '@components/shadcn/ui/themed/dropdown-menu'
import { VCenterRow } from '@components/v-center-row'
import { APP_NAME, SITE_NAME, UPDATED, VERSION } from '@consts'
import { HeaderLayout } from '@layouts/header-layout'
import { getCopyright } from '@lib/copyright'
import { API_ABOUT_URL } from '@modules/edb'
import { CoreProviders } from '@providers/core-providers'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const LINKS = [
  ['Astro', 'https://astro.build/'],
  ['React', 'https://reactjs.org'],
  ['Tailwind', 'https://tailwindcss.com/'],
  ['Font Awesome', 'https://fontawesome.com/'],
  ['Node.js', 'https://nodejs.org/'],
  ['Go', 'https://go.dev/'],
  ['GitHub', 'https://github.com'],
  ['Visual Studio Code', 'https://code.visualstudio.com'],
]

function AboutPage() {
  const { data } = useQuery({
    queryKey: ['about'],
    queryFn: () => axios.get(API_ABOUT_URL),
  })

  //if (isPending) return "Loading..."

  let serverVersion = ''
  let serverUpdated = ''

  if (data) {
    serverVersion = data?.data.version
    serverUpdated = data?.data.updated
  }

  return (
    <HeaderLayout title="Help">
      <CardContainer className="text-xs">
        <BaseCard className="shadow-box m-2">
          <VCenterRow className="gap-x-4 py-4 px-8">
            {/* <LogoIcon w="w-12" /> */}

            <img
              src="/favicon.svg"
              width={512}
              height={512}
              alt={SITE_NAME}
              className="w-12"
            />

            <span className="text-xl font-medium">{APP_NAME}</span>
          </VCenterRow>

          <MenuSeparator />

          <BaseCol className="gap-y-1 px-8 py-5">
            <p>{`Client version ${VERSION}`}</p>
            <p>{`Updated ${UPDATED}`}</p>
          </BaseCol>
          {serverVersion && (
            <>
              <MenuSeparator />

              <BaseCol className="gap-y-1 px-8 py-5">
                <p>{`Server version ${serverVersion}`}</p>
                <p>{`Updated ${serverUpdated}`}</p>
              </BaseCol>
            </>
          )}
        </BaseCard>
        <Card className="shadow-box m-2">
          <BaseCol className="gap-y-1">
            <p>{APP_NAME}</p>
            <p>
              {getCopyright()}{' '}
              <ThemeLink
                href="https://www.antonyholmes.dev"
                aria-label="Email Antony Holmes"
                data-underline={true}
              >
                Antony Holmes
              </ThemeLink>
              . All rights reserved.
            </p>
          </BaseCol>

          <BaseCol className="gap-y-1">
            <p>
              This application is made possible by open source software and
              other services:
            </p>

            <ul className="flex flex-col gap-y-0.5">
              {LINKS.map((link, li) => {
                return (
                  <li key={li}>
                    <ThemeLink
                      href={link[1]!}
                      aria-label="View tool"
                      data-underline={true}
                    >
                      {link[0]}
                    </ThemeLink>
                  </li>
                )
              })}
            </ul>
          </BaseCol>
        </Card>
      </CardContainer>
    </HeaderLayout>
  )
}

export function AboutQueryPage() {
  return (
    <CoreProviders>
      <AboutPage />
    </CoreProviders>
  )
}
