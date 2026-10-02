import { useEffect } from 'react'

const SUFFIX = 'Alpha Judiciary Parliament — Institutional Demonstration'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SUFFIX}` : SUFFIX
  }, [title])
}
