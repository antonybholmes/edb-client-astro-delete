import { BaseRow } from '@components/base-row'

import { type IElementProps } from '@interfaces/element-props'
import { type IOpenChange } from '@interfaces/open-change'
import { cn } from '@lib/class-names'

import {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  type ForwardedRef,
  type ReactNode,
} from 'react'
import { FileMenu } from './file-menu-2'

import {
  BaseTabsList,
  BaseTabsTrigger,
  Tabs,
} from '@components/shadcn/ui/themed/tabs'
import { NO_MODULE_INFO, type IModuleInfo } from '@interfaces/module-info'

import type { IChildrenProps } from '@interfaces/children-props'
import type { TabsProps } from '@radix-ui/react-tabs'
import { ToolbarTabButton } from './toolbar-tab-button'

import { ChevronRightIcon } from '@components/icons/chevron-right-icon'
import { SplitIcon } from '@components/icons/split-icon'
import { Button } from '@components/shadcn/ui/themed/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/shadcn/ui/themed/dropdown-menu'
import { VCenterRow } from '@components/v-center-row'

import { BaseCol } from '@components/base-col'
import { type IButtonProps } from '@components/shadcn/ui/themed/button'
import type { IClassProps } from '@interfaces/class-props'
import { motion } from 'framer-motion'
import {
  getTabFromValue,
  getTabId,
  TabContext,
  TabProvider,
  type ITab,
  type ITabProvider,
} from '../tab-provider'

//const LINE_CLS = "tab-line absolute bottom-0 left-0 block h-0.5 bg-theme"

//const TAB_CLS = cn(V_CENTER_ROW_CLS, "grow rounded-lg bg-background")

export const TAB_LINE_CLS = 'stroke-theme'

export const LINE_CLS = 'stroke-theme'

export const ShowOptionsButton = forwardRef(function ShowOptionsButton(
  { ...props }: IButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <Button
      ref={ref}
      variant="muted"
      rounded="md"
      size="icon-sm"
      pad="sm"
      ripple={false}
      aria-label="Show options"
      name="Show options"
      {...props}
    >
      <SplitIcon />
    </Button>
  )
})

export const ShowOptionsMenu = forwardRef(function ShowOptionsMenu(
  { onClick }: IElementProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  //const [menuOpen, setMenuOpen] = useState(false)
  return (
    <DropdownMenuItem ref={ref} onClick={onClick}>
      <SplitIcon w="w-4" fill="" />
      Expand sidebar
    </DropdownMenuItem>
  )
})

interface ITabLineProps extends IClassProps {
  w?: number
  lineClassName?: string
}

export const ToolbarTabLine = forwardRef(function ToolbarTabLine(
  { w = 2, lineClassName, className }: ITabLineProps,
  ref: ForwardedRef<SVGLineElement>
) {
  const y = w / 2
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 100 ${w}`}
      className={cn(
        `absolute h-[${w}px] w-full bottom-0 left-0 z-10`,
        className
      )}
      shapeRendering={w < 3 ? 'crispEdges' : 'auto'}
      preserveAspectRatio="none"
    >
      <line
        ref={ref}
        x1={0}
        y1={y}
        x2={0}
        y2={y}
        strokeWidth={w}
        strokeLinecap={w > 2 ? 'round' : 'square'}
        className={lineClassName}
      />
    </svg>
  )
})

export const VToolbarTabLine = forwardRef(function VToolbarTabLine(
  { w = 3, lineClassName, className }: ITabLineProps,
  ref: ForwardedRef<SVGLineElement>
) {
  const x = w / 2
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${w} 100`}
      className={cn(`absolute w-[${w}px] h-full top-0 left-0`, className)}
      shapeRendering={w < 3 ? 'crispEdges' : 'auto'}
      preserveAspectRatio="none"
    >
      <line
        ref={ref}
        x1={x}
        y1={0}
        x2={x}
        y2={0}
        strokeWidth={w}
        strokeLinecap={w > 2 ? 'round' : 'square'}
        className={lineClassName}
      />
    </svg>
  )
})

{
  /* */
}

export interface ITabDimProps {
  w: number
  x: number
  //lineW?: number
}

interface IToolbarMenuProps extends IOpenChange, TabsProps {
  fileMenuTabs?: ITab[]
  info?: IModuleInfo
  leftShortcuts?: ReactNode
  rightShortcuts?: ReactNode
  //tabShortcutMenu?: ReactNode
}

export function ToolbarMenu({
  open = false,
  onOpenChange = () => {},

  fileMenuTabs = [],

  info = NO_MODULE_INFO,
  leftShortcuts,
  rightShortcuts,
  //tabShortcutMenu,

  className,
}: IToolbarMenuProps) {
  // change default if it does match a tab id

  const [scale, setScale] = useState(0)
  //const [focus, setFocus] = useState(false)
  //const [hover, setHover] = useState(false)
  //const initial = useRef(true)

  const { selectedTab, onTabChange, tabs } = useContext(TabContext)!

  //const lineRef1 = useRef<SVGLineElement>(null)

  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([])
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([])
  const tabListRef = useRef<HTMLDivElement>(null)

  const [tabPos, setTabPos] = useState<{
    x: number
    width: number
    //transform?: string
  }>({
    x: 0,
    width: 0,
    //transform: `scaleX(1)`,
  })

  function _onValueChange(value: string) {
    const selectedTab = getTabFromValue(value, tabs)
    //const [name, index] = parseTabId(value)

    //onValueChange?.(name)
    if (selectedTab) {
      onTabChange?.(selectedTab)
    }
  }

  useEffect(() => {
    const selectedTabIndex = selectedTab.index

    const button = buttonsRef.current[selectedTabIndex]!
    const tabElem = itemsRef.current[selectedTabIndex]!

    const buttonRect = button.getBoundingClientRect()
    const containerRect = tabListRef.current!.getBoundingClientRect()
    const tabRect = tabElem.getBoundingClientRect()

    const clientRect = scale > 1 ? buttonRect : tabRect

    //const trueScale = buttonRect.width / tabRect.width

    //const x = (clientRect.left - containerRect.left) / containerRect.width
    //const width = clientRect.width / containerRect.width

    setTabPos({
      x: clientRect.left - containerRect.left,
      width: clientRect.width,
      //transform: `scaleX(${ 1})`, //`scaleX(${scale > 1 ? trueScale : 1})`,
    })
  }, [selectedTab, scale])

  const selectedTabId = getTabId(selectedTab.tab)

  return (
    <Tabs
      id="toolbar-menu-container"
      value={getTabId(selectedTab.tab)}
      //defaultValue={_value === "" ? `${tabs[0].name}:0`:undefined}
      onValueChange={_onValueChange}
      className={cn(
        'flex shrink-0 flex-row items-center text-xs grow px-2 gap-x-1 my-0.5 h-8',
        className
      )}
    >
      {leftShortcuts && (
        <VCenterRow id="toolbar-left-shortcuts">{leftShortcuts}</VCenterRow>
      )}

      <VCenterRow className="shrink-0 grow h-full" id="file-toolbar-menu">
        <FileMenu
          open={open}
          onOpenChange={onOpenChange}
          tabs={fileMenuTabs}
          info={info}
        />
        <BaseTabsList
          id="toolbar-menu"
          className="relative flex flex-row items-center group h-full"
          ref={tabListRef}
          // onMouseEnter={_ => {
          //   setHover(true)
          // }}
          // onMouseLeave={_ => {
          //   setHover(false)
          // }}
          //onFocus={() => setFocus(true)}
          //onBlur={() => setFocus(false)}
        >
          {tabs.map((tab, ti) => {
            //const id = makeTabId(tab, ti)
            const tabId = getTabId(tab)
            const selected = tabId === selectedTabId
            return (
              <BaseTabsTrigger value={tabId} key={`tab-button-${ti}`} asChild>
                <ToolbarTabButton
                  size="sm"
                  //padding="none"
                  //data-selected={id === _value}
                  className={cn('justify-center', [
                    selected,
                    'text-theme font-semibold',
                  ])}
                  // style={{
                  //   width: `${tabUnderlineProps[id].w}rem`,
                  // }}

                  aria-label={`Show ${tab.name} menu`}
                  // @ts-ignore
                  ref={el => (buttonsRef.current[ti] = el!)}
                  onMouseEnter={() => {
                    if (selected) {
                      setScale(2)
                    }
                  }}
                  onMouseLeave={() => {
                    if (selected) {
                      setScale(1)
                    }
                  }}
                  onMouseDown={() => {
                    setScale(2)
                  }}
                >
                  <span
                    // @ts-ignore
                    ref={el => (itemsRef.current[ti] = el)}
                    aria-label={tab.name}
                    className="boldable-text-tab inline-flex flex-col"
                  >
                    {tab.name}
                  </span>
                </ToolbarTabButton>
              </BaseTabsTrigger>
            )
          })}

          {/* <ToolbarTabLine ref={lineRef1} lineClassName={TAB_LINE_CLS} /> */}

          <motion.span
            className="absolute bottom-0 h-[2px] z-0 bg-theme rounded-md"
            animate={{ ...tabPos }}
            transition={{ ease: 'easeInOut' }}
            initial={false}
            //transition={{ type: "spring" }}
          />
        </BaseTabsList>
      </VCenterRow>

      {rightShortcuts && (
        <VCenterRow
          className="hidden sm:flex gap-y-0.5"
          id="toolbar-right-shortcuts"
        >
          {rightShortcuts}
        </VCenterRow>
      )}
    </Tabs>
  )
}

interface IToolbarPanelProps {
  tabShortcutMenu?: ReactNode
}

export function ToolbarPanel({ tabShortcutMenu }: IToolbarPanelProps) {
  // change default if it does match a tab id

  const { selectedTab } = useContext(TabContext)!

  if (!selectedTab) {
    return null
  }

  return (
    <BaseRow className="items-end gap-x-1 px-2">
      <VCenterRow className="text-xs bg-muted rounded-lg px-1.5 py-1 grow gap-x-2">
        {selectedTab && selectedTab.tab.content}
      </VCenterRow>
      {tabShortcutMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="accent"
              size="icon-xs"
              pad="none"
              ripple={false}
              title="Sidebar options"
            >
              <ChevronRightIcon className="rotate-90" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {tabShortcutMenu}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </BaseRow>
  )
}

// interface IToolbarContentProps extends IChildrenProps {
//   gap?:string
// }

// export function ToolbarContent({
//   gap = "gap-y-1",
//   className,
//   children,
// }: IToolbarContentProps) {
//   return <BaseCol className={cn("shrink-0", gap, className)}>{children}</BaseCol>
// }

export interface IToolbarProps extends ITabProvider, IChildrenProps {}

export function Toolbar({
  value = '',
  onTabChange = () => {},
  tabs,
  children,
  className,
}: IToolbarProps) {
  return (
    <TabProvider value={value} onTabChange={onTabChange} tabs={tabs}>
      <BaseCol className={cn('shrink-0', className)}>{children}</BaseCol>
    </TabProvider>
  )
}
