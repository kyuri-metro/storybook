import type { InputType } from 'storybook/internal/types'
import { resolveShmetroColors } from './lineIdBlockControls'

export type NumericFloorStickerStoryArgs = {
  lineNumber: string
  height: number
  foreground: string
  background: string
  latinFontFamily: string
  cjkFontFamily: string
  useMetroPalette: boolean
}

export const defaultNumericFloorStickerArgs: NumericFloorStickerStoryArgs = {
  lineNumber: '16',
  height: 400,
  foreground: '#000000',
  background: '#98D1C0',
  latinFontFamily: 'Arial, Helvetica, sans-serif',
  cjkFontFamily: 'SimHei, "Microsoft YaHei", sans-serif',
  useMetroPalette: true,
}

export const numericFloorStickerArgTypes = {
  lineNumber: {
    control: 'text',
    description: '线路号，范围 0–99。',
  },
  height: {
    control: { type: 'number', min: 1, step: 1 },
    description: '输出 SVG 高度（像素）。宽度按 2:3 宽高比自动计算。',
  },
  foreground: {
    control: 'color',
    description: '文字颜色。勾选「使用官方色板」时由色板覆盖。',
  },
  background: {
    control: 'color',
    description: '箭头填充颜色。勾选「使用官方色板」时由色板覆盖。',
  },
  latinFontFamily: {
    control: 'text',
    description: '线路号与 Line 标签的 font-family。',
  },
  cjkFontFamily: {
    control: 'text',
    description: '「号线」标签的 font-family。',
  },
  useMetroPalette: {
    control: 'boolean',
    name: '使用官方色板',
    description: '按线路号自动填充上海地铁标准色号。',
  },
} satisfies Record<keyof NumericFloorStickerStoryArgs, InputType>

export function resolveNumericFloorStickerColors(args: NumericFloorStickerStoryArgs) {
  return resolveShmetroColors({
    lineNumber: args.lineNumber,
    height: args.height,
    foreground: args.foreground,
    background: args.background,
    fontFamily: args.latinFontFamily,
    useMetroPalette: args.useMetroPalette,
  })
}

export function toNumericFloorStickerProps(args: NumericFloorStickerStoryArgs) {
  return {
    lineNumber: args.lineNumber,
    height: args.height,
    latinFontFamily: args.latinFontFamily,
    cjkFontFamily: args.cjkFontFamily,
  }
}
