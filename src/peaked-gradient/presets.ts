import type { ShapeConfig, GradientConfig, ColorPalette } from '../peak-shape'
import type { ColorTuple } from './types'

/**
 * Base shape configurations - locked internal values
 * peakHeight and pointiness will be scaled by master controls
 */
export const BASE_SHAPES: Omit<ShapeConfig, 'gradientId'>[] = [
  // Layer 1 - Outermost, lightest, largest
  {
    width: 140,
    height: 90,
    peakHeight: 85,
    pointiness: 55,
    baseline: 0,
    blur: 7,
  },
  // Layer 2
  {
    width: 140,
    height: 80,
    peakHeight: 89,
    pointiness: 55,
    baseline: 0,
    blur: 6,
  },
  // Layer 3
  {
    width: 125,
    height: 70,
    peakHeight: 75,
    pointiness: 80,
    baseline: 0,
    blur: 5,
  },
  // Layer 4 - Innermost, darkest, smallest
  {
    width: 120,
    height: 50,
    peakHeight: 65,
    pointiness: 45,
    baseline: 0,
    blur: 3,
  },
]

/**
 * Base gradient configurations - locked structure with color refs and opacities
 * Colors a-e will be mapped from the user's 5-color input
 */
export const BASE_GRADIENTS: GradientConfig[] = [
  {
    id: 'gpb-gradient-1',
    type: 'linear',
    angle: 0,
    stops: [
      { offset: 70, colorRef: { color: 'e', opacity: 20 } },
      { offset: 87, colorRef: { color: 'e', opacity: 100 } },
    ],
  },
  {
    id: 'gpb-gradient-2',
    type: 'linear',
    angle: 0,
    stops: [
      { offset: 47, colorRef: { color: 'c', opacity: 0 } },
      { offset: 70, colorRef: { color: 'd', opacity: 70 } },
    ],
  },
  {
    id: 'gpb-gradient-3',
    type: 'linear',
    angle: 0,
    stops: [
      { offset: 30, colorRef: { color: 'c', opacity: 2 } },
      { offset: 40, colorRef: { color: 'c', opacity: 30 } },
      { offset: 70, colorRef: { color: 'a', opacity: 0 } },
    ],
  },
  {
    id: 'gpb-gradient-4',
    type: 'linear',
    angle: 0,
    stops: [
      { offset: 20, colorRef: { color: 'c', opacity: 0 } },
      { offset: 50, colorRef: { color: 'c', opacity: 20 } },
      { offset: 100, colorRef: { color: 'b', opacity: 40 } },
    ],
  },
]

/** Gradient IDs mapped to shape layers (index 0 = layer 1, etc.) */
export const SHAPE_GRADIENT_MAP = [
  'gpb-gradient-4', // Layer 1 (outermost)
  'gpb-gradient-3', // Layer 2
  'gpb-gradient-2', // Layer 3
  'gpb-gradient-1', // Layer 4 (innermost)
]

/**
 * Convert 5-color tuple to ColorPalette object
 */
export function colorTupleToPalette(colors: ColorTuple): ColorPalette {
  return {
    a: colors[0],
    b: colors[1],
    c: colors[2],
    d: colors[3],
    e: colors[4],
  }
}

/**
 * Generate scaled shapes based on master peakHeight and pointiness controls
 * - peakHeight: 0-100 where 100 = full base values
 * - pointiness: 0-100 where 50 = base values, can go up to 100 for sharper
 */
export function generateScaledShapes(
  masterPeakHeight: number,
  masterPointiness: number
): ShapeConfig[] {
  // peakHeight: 0-100 where 100 = 100% of base values
  const peakScale = Math.min(masterPeakHeight, 100) / 100
  // pointiness: 50 = 100% of base, scales proportionally (can exceed base)
  const pointinessScale = masterPointiness / 50

  return BASE_SHAPES.map((baseShape, index) => ({
    ...baseShape,
    peakHeight: Math.min(100, Math.max(0, baseShape.peakHeight * peakScale)),
    pointiness: Math.min(100, Math.max(0, baseShape.pointiness * pointinessScale)),
    gradientId: SHAPE_GRADIENT_MAP[index],
  }))
}
