import { VCenterRow } from '@components/v-center-row'
import { cn } from '@lib/class-names'
import { type ReactNode } from 'react'

import { APP_NAME } from '@consts'

import type { IElementProps } from '@interfaces/element-props'
import { EDBSignedIn } from '@modules/edb-signedin'
import { HeaderMenu } from './header-menu'

export interface IHeaderChildrenProps {
  headerLeftChildren?: ReactNode
  headerCenterChildren?: ReactNode
  headerRightChildren?: ReactNode
}

export interface IHeaderProps extends IHeaderChildrenProps, IElementProps {}

export function Header({
  className = 'bg-gradient-to-r from-blue-500 to-indigo-500',
  headerLeftChildren,
  headerRightChildren,
  children,
}: IHeaderProps) {
  className = className
    ? className
    : 'bg-gradient-to-r from-blue-500 to-indigo-500'
  console.log(className, 'Asdasdasd ssssss')

  return (
    <header className={cn('text-white grid grid-cols-3 h-12', className)}>
      <VCenterRow className="gap-x-2">
        {/* <HeaderMenuPopover /> */}
        <HeaderMenu />
        {/* <HeaderMenuSheet />   */}
        {/* <Logo /> */}

        <VCenterRow className="hidden md:flex gap-x-4 shrink-0">
          <a className="font-semibold" href="/">
            {APP_NAME}
          </a>
          {headerLeftChildren && (
            <span className="shrink-0 h-6 border-l-2 border-white/50"></span>
          )}
        </VCenterRow>
        {headerLeftChildren}
      </VCenterRow>

      <VCenterRow className="justify-center">{children}</VCenterRow>

      <VCenterRow className="gap-x-2 justify-end pr-2">
        {headerRightChildren}

        <EDBSignedIn />
        {/* <ThemeMenu /> */}
      </VCenterRow>
    </header>
  )
}
