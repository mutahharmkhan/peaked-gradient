import type { CSSProperties } from 'react'

/** 5 colors as hex strings */
export type ColorTuple = [string, string, string, string, string]

export interface PeakedGradientProps {
  /** 5 colors for the gradient layers */
  colors: ColorTuple

  /**
   * Peak height (0-100, default 100)
   * Scales all layer peak heights proportionally
   */
  peakHeight?: number

  /**
   * Pointiness/sharpness (0-100, default 50)
   * 50 = base sharpness, 100 = maximum sharpness
   */
  pointiness?: number

  className?: string
  style?: CSSProperties
}
