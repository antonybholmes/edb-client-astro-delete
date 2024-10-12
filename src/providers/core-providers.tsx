//'use client'

import type { IChildrenProps } from "@interfaces/children-props"
import { EdbAuthProvider } from "@providers/edb-auth-provider"
import { QCP } from "@query"
import { HistoryProvider } from "./history-provider"

export function CoreProviders({ children }: IChildrenProps) {
  // Add other providers nested here as needed
  return (
    <QCP>
      <EdbAuthProvider>
        <HistoryProvider>{children}</HistoryProvider>
      </EdbAuthProvider>
    </QCP>
  )
}
