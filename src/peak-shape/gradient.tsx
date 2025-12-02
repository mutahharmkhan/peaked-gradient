import * as React from 'react'
import type { GradientConfig, ColorPalette } from './types'
import { angleToGradientCoords } from './utils'

interface GradientDefsProps {
  gradients: GradientConfig[]
  colors: ColorPalette
  viewBoxWidth: number
  viewBoxHeight: number
}

/**
 * Renders SVG gradient definitions.
 * Uses userSpaceOnUse to map gradients to the viewBox, not the shape bounding box.
 */
export function GradientDefs({ gradients, colors, viewBoxWidth, viewBoxHeight }: GradientDefsProps) {
  return (
    <>
      {gradients.map((gradient) => {
        if (gradient.type === 'linear') {
          const coords = angleToGradientCoords(gradient.angle ?? 0, viewBoxWidth, viewBoxHeight)
          return (
            <linearGradient
              key={gradient.id}
              id={gradient.id}
              gradientUnits="userSpaceOnUse"
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
            >
              {gradient.stops.map((stop, index) => (
                <stop
                  key={index}
                  offset={`${stop.offset}%`}
                  stopColor={colors[stop.colorRef.color]}
                  stopOpacity={stop.colorRef.opacity / 100}
                />
              ))}
            </linearGradient>
          )
        }

        if (gradient.type === 'radial') {
          return (
            <radialGradient
              key={gradient.id}
              id={gradient.id}
              gradientUnits="userSpaceOnUse"
              cx={(gradient.cx ?? 50) * viewBoxWidth / 100}
              cy={(gradient.cy ?? 50) * viewBoxHeight / 100}
              r={Math.max(viewBoxWidth, viewBoxHeight) / 2}
            >
              {gradient.stops.map((stop, index) => (
                <stop
                  key={index}
                  offset={`${stop.offset}%`}
                  stopColor={colors[stop.colorRef.color]}
                  stopOpacity={stop.colorRef.opacity / 100}
                />
              ))}
            </radialGradient>
          )
        }

        return null
      })}
    </>
  )
}
