import { SHMETRO_LINE_COLORS } from '@kyuri-metro/shmetro-palette'
import { NJMETRO_LINE_COLORS } from '@kyuri-metro/njmetro-palette'
import { DEFAULT_LINE_ID_BLOCK_FONT_FAMILY } from '@kyuri-metro/njmetro-line-id-block-svg-generator'
import type { InputType } from 'storybook/internal/types'

export type LineIdBlockStoryArgs = {
  lineNumber: string
  height: number
  foreground: string
  background: string
  fontFamily: string
  useMetroPalette: boolean
}

export const defaultShmetroArgs: LineIdBlockStoryArgs = {
  lineNumber: '16',
  height: 100,
  foreground: '#000000',
  background: '#98D1C0',
  fontFamily: 'Arial, Helvetica, sans-serif',
  useMetroPalette: true,
}

export const defaultNjmetroArgs: LineIdBlockStoryArgs = {
  lineNumber: '3',
  height: 100,
  foreground: '#000000',
  background: '#666666',
  fontFamily: DEFAULT_LINE_ID_BLOCK_FONT_FAMILY,
  useMetroPalette: true,
}

export const lineIdBlockArgTypes = {
  lineNumber: {
    control: 'text',
    description: '线路号。上海地铁为 0–99；南京地铁还支持 S0–S9（如 S1）。',
  },
  height: {
    control: { type: 'number', min: 1, step: 1 },
    description: '输出 SVG 高度（像素）。宽度由生成器按比例计算。',
  },
  foreground: {
    control: 'color',
    description: '文字颜色。勾选「使用官方色板」时由色板覆盖。',
  },
  background: {
    control: 'color',
    description: '背景颜色。勾选「使用官方色板」时由色板覆盖。',
  },
  fontFamily: {
    control: 'text',
    description: 'SVG 内 text 元素的 font-family。',
  },
  useMetroPalette: {
    control: 'boolean',
    name: '使用官方色板',
    description: '按线路号自动填充对应城市的标准色号。',
  },
} satisfies Record<keyof LineIdBlockStoryArgs, InputType>

function parseShmetroLineNumber(lineNumber: string) {
  const lineString = lineNumber.trim()

  if (!/^\d{1,2}$/.test(lineString)) {
    return null
  }

  const lineId = Number(lineString)

  if (!Number.isInteger(lineId) || lineId < 0 || lineId > 99) {
    return null
  }

  return lineId
}

function parseNjmetroLineNumber(lineNumber: string) {
  const raw = lineNumber.trim()

  if (/^s[0-9]$/i.test(raw)) {
    const key = `S${raw[1]}` as `S${number}`
    const palette = NJMETRO_LINE_COLORS[key]

    if (!palette) {
      return null
    }

    return {
      foreground: palette.foreground.trim(),
      background: palette.background.trim(),
    }
  }

  const numeric = parseShmetroLineNumber(raw)

  if (numeric === null) {
    return null
  }

  const palette = NJMETRO_LINE_COLORS[numeric as keyof typeof NJMETRO_LINE_COLORS]

  if (!palette || typeof palette !== 'object' || !('background' in palette)) {
    return null
  }

  return {
    foreground: palette.foreground.trim(),
    background: palette.background.trim(),
  }
}

export function resolveShmetroColors(args: LineIdBlockStoryArgs) {
  if (!args.useMetroPalette) {
    return { foreground: args.foreground, background: args.background }
  }

  const lineId = parseShmetroLineNumber(args.lineNumber)
  const palette = lineId === null ? undefined : SHMETRO_LINE_COLORS[lineId]

  return {
    foreground: palette?.foreground ?? args.foreground,
    background: palette?.background ?? args.background,
  }
}

export function resolveNjmetroColors(args: LineIdBlockStoryArgs) {
  if (!args.useMetroPalette) {
    return { foreground: args.foreground, background: args.background }
  }

  const palette = parseNjmetroLineNumber(args.lineNumber)

  return {
    foreground: palette?.foreground ?? args.foreground,
    background: palette?.background ?? args.background,
  }
}

export function toGeneratorProps(args: LineIdBlockStoryArgs) {
  return {
    lineNumber: args.lineNumber,
    height: args.height,
    fontFamily: args.fontFamily,
  }
}
