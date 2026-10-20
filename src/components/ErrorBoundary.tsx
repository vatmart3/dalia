import { Component, type ReactNode } from 'react'

/** Si la 3D plante (pilote GPU, contexte perdu…), on affiche l'image de secours. */
export class ErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err: unknown) {
    console.warn('[Dalia] 3D désactivée :', err)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
