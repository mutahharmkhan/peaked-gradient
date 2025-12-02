import { PeakShape } from '../peak-shape'
import type { PeakedGradientProps } from './types'
import {
  BASE_GRADIENTS,
  colorTupleToPalette,
  generateScaledShapes,
} from './presets'

/**
 * PeakedGradient - A component for rendering layered peaked shapes with gradient blur.
 *
 * Simple API:
 * - 5 colors (opacities are locked internally)
 * - peakHeight control (0-100, default 100)
 * - pointiness control (0-100, default 50)
 *
 * The component fills its parent container (100% width and height).
 */
export function PeakedGradient({
  colors,
  peakHeight = 100,
  pointiness = 50,
  className,
  style,
}: PeakedGradientProps) {
  return (
    <PeakShape
      colors={colorTupleToPalette(colors)}
      shapes={generateScaledShapes(peakHeight, pointiness)}
      gradients={BASE_GRADIENTS}
      className={className}
      style={style}
    />
  )
}
