/** Auvent rayé tomate / crème à festons, qui ondule doucement (CSS, figé si mouvement réduit). */
export function Awning({ className = '' }: { className?: string }) {
  return (
    <div className={`awning ${className}`} aria-hidden="true">
      <div className="awning__stripes" />
      <div className="awning__scallops" />
    </div>
  )
}
