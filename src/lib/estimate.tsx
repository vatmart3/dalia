import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { CALCULATOR } from './config'

/** Estimation saisie dans le calculateur, réutilisée par l'offre et le formulaire. */
type Estimate = { weekly: number; touched: boolean; setWeekly: (v: number) => void }

const EstimateContext = createContext<Estimate>({ weekly: CALCULATOR.initial, touched: false, setWeekly: () => {} })

export function EstimateProvider({ children }: { children: ReactNode }) {
  const [weekly, set] = useState(CALCULATOR.initial)
  const [touched, setTouched] = useState(false)
  const value = useMemo(
    () => ({
      weekly,
      touched,
      setWeekly: (v: number) => {
        set(v)
        setTouched(true)
      },
    }),
    [weekly, touched],
  )
  return <EstimateContext.Provider value={value}>{children}</EstimateContext.Provider>
}

export const useEstimate = () => useContext(EstimateContext)
