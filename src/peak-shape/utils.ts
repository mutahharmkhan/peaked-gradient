import type { ShapeConfig } from './types'

/**
 * Generates an SVG path for a peaked/pointed arch shape using quadratic bezier curves.
 *
 * The shape starts at bottom-left, curves up to a peak, then back down to bottom-right,
 * and closes along the bottom.
 *
 * @param config - Shape configuration
 * @param viewBoxWidth - SVG viewBox width
 * @param viewBoxHeight - SVG viewBox height
 * @returns SVG path d attribute string
 */
export function generatePeakPath(
  config: ShapeConfig,
  viewBoxWidth: number,
  viewBoxHeight: number
): string {
  const { width, height, peakHeight, pointiness, baseline } = config

  // Calculate actual dimensions in viewBox units
  const shapeWidth = (width / 100) * viewBoxWidth
  const shapeHeight = (height / 100) * viewBoxHeight
  const baselineY = viewBoxHeight - (baseline / 100) * viewBoxHeight

  // Center the shape horizontally
  const startX = (viewBoxWidth - shapeWidth) / 2
  const endX = startX + shapeWidth

  // Peak position
  const peakX = viewBoxWidth / 2
  const peakY = baselineY - (peakHeight / 100) * shapeHeight

  // Control points for the bezier curves
  // Pointiness affects how far the control points are from the peak
  // Higher pointiness = control points closer to peak X = sharper point
  // Lower pointiness = control points spread out = rounder curve
  const controlSpread = ((100 - pointiness) / 100) * (shapeWidth / 2)

  // Left control point
  const leftControlX = peakX - controlSpread
  const leftControlY = peakY

  // Right control point
  const rightControlX = peakX + controlSpread
  const rightControlY = peakY

  // Extend bottom beyond viewBox to prevent blur cutoff
  const bottomExtension = viewBoxHeight * 0.5

  // Build the path
  // M = move to start (bottom left)
  // Q = quadratic bezier (control point, end point)
  // L = line to (close bottom, extended beyond viewBox)
  // Z = close path
  const path = [
    `M ${startX} ${baselineY}`,
    `Q ${leftControlX} ${leftControlY}, ${peakX} ${peakY}`,
    `Q ${rightControlX} ${rightControlY}, ${endX} ${baselineY}`,
    `L ${endX} ${viewBoxHeight + bottomExtension}`,
    `L ${startX} ${viewBoxHeight + bottomExtension}`,
    'Z'
  ].join(' ')

  return path
}

/**
 * Converts an angle in degrees to SVG linear gradient coordinates.
 * Uses userSpaceOnUse coordinates based on viewBox (0-100).
 * 0 degrees = top to bottom
 * 90 degrees = left to right
 * 180 degrees = bottom to top
 */
export function angleToGradientCoords(
  angle: number,
  viewBoxWidth: number,
  viewBoxHeight: number
): {
  x1: number
  y1: number
  x2: number
  y2: number
} {
  const radians = (angle + 90) * (Math.PI / 180)
  const centerX = viewBoxWidth / 2
  const centerY = viewBoxHeight / 2

  const x1 = centerX + Math.cos(radians + Math.PI) * centerX
  const y1 = centerY + Math.sin(radians + Math.PI) * centerY
  const x2 = centerX + Math.cos(radians) * centerX
  const y2 = centerY + Math.sin(radians) * centerY

  return { x1, y1, x2, y2 }
}
