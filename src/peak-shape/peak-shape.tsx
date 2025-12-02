import * as React from 'react'
import type { PeakShapeProps } from './types'
import { GradientDefs } from './gradient'
import { generatePeakPath } from './utils'

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

/**
 * PeakShape - A component for rendering layered peaked/arch shapes with gradient support.
 *
 * Each shape is defined by:
 * - width/height: percentage of parent (can exceed 100% for clipping effects)
 * - peakHeight: how high the peak rises (0-100% of shape height)
 * - pointiness: sharpness of the peak (0 = round, 100 = sharp)
 * - baseline: position from bottom (% of parent height)
 * - gradientId: reference to a gradient definition
 * - blur: optional blur amount in pixels
 *
 * Colors are defined in a palette (a, b, c, d, e) and referenced in gradients
 * with opacity values (0-100).
 */
export function PeakShape({
  colors,
  shapes,
  gradients,
  className,
  style,
}: PeakShapeProps) {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="none"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        ...style,
      }}
    >
      <defs>
        <GradientDefs
          gradients={gradients}
          colors={colors}
          viewBoxWidth={VIEWBOX_WIDTH}
          viewBoxHeight={VIEWBOX_HEIGHT}
        />
        {shapes.map((shape, index) =>
          shape.blur ? (
            <filter
              key={`blur-${index}`}
              id={`blur-${index}`}
              x="-50%"
              y="-100%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation={shape.blur} />
            </filter>
          ) : null
        )}
      </defs>

      {shapes.map((shape, index) => (
        <path
          key={index}
          d={generatePeakPath(shape, VIEWBOX_WIDTH, VIEWBOX_HEIGHT)}
          fill={`url(#${shape.gradientId})`}
          filter={shape.blur ? `url(#blur-${index})` : undefined}
        />
      ))}
    </svg>
  )
}
