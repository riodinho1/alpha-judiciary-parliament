/**
 * Soft highlight that travels around the border of a `.panel-animated`.
 *
 * Built from four 1px tracks whose highlights only ever animate `transform`,
 * so the effect runs on the compositor and never repaints the panel.
 */
export function BorderGlint() {
  return (
    <span aria-hidden className="border-glint">
      <span className="border-glint__top" />
      <span className="border-glint__right" />
      <span className="border-glint__bottom" />
      <span className="border-glint__left" />
    </span>
  )
}
