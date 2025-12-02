/** Color palette with 5 named colors */
export type ColorPalette = {
  a: string
  b: string
  c: string
  d: string
  e: string
}

/** Color key from the palette */
export type ColorKey = keyof ColorPalette

/** Color reference: palette key + opacity (0-100) */
export interface ColorRef {
  color: ColorKey
  opacity: number
}

/** Gradient stop using color references */
export interface GradientStop {
  offset: number // 0-100
  colorRef: ColorRef
}

export interface GradientConfig {
  id: string
  type: 'linear' | 'radial'
  stops: GradientStop[]
  /** Linear gradient direction in degrees (0 = top to bottom, 90 = left to right) */
  angle?: number
  /** Radial gradient center X (0-100) */
  cx?: number
  /** Radial gradient center Y (0-100) */
  cy?: number
}

export interface ShapeConfig {
  /** Width as percentage of parent (can exceed 100 for clipping) */
  width: number
  /** Height as percentage of parent (can exceed 100 for clipping) */
  height: number
  /** How high the peak rises, as percentage of shape height (0-100) */
  peakHeight: number
  /** Controls the pointiness/sharpness of the peak (0 = very round, 100 = very sharp) */
  pointiness: number
  /** Baseline position from bottom as percentage of parent height */
  baseline: number
  /** Gradient ID reference */
  gradientId: string
  /** Blur amount in pixels (0 = no blur) */
  blur?: number
}

export interface PeakShapeProps {
  /** Color palette with 5 colors (a, b, c, d, e) */
  colors: ColorPalette
  /** Shape configurations */
  shapes: ShapeConfig[]
  /** Gradient configurations */
  gradients: GradientConfig[]
  className?: string
  style?: React.CSSProperties
}
