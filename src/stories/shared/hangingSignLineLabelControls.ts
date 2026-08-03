import type { InputType } from 'storybook/internal/types'

export type HangingSignLineColorArg = {
  foreground: string
  background: string
}

export type HangingSignLineLabelStoryArgs = {
  lineNumbers: string
  height: number
  colors: HangingSignLineColorArg[]
  latinFontFamily: string
  cjkFontFamily: string
  useMetroPalette: boolean
}

export const defaultHangingSignLineLabelArgs: HangingSignLineLabelStoryArgs = {
  lineNumbers: '2,13,22',
  height: 100,
  colors: [
    { foreground: '#000000', background: '#8CC220' },
    { foreground: '#000000', background: '#E999C0' },
    { foreground: '#FFFFFF', background: '#5F376F' },
  ],
  latinFontFamily: 'Arial, Helvetica, sans-serif',
  cjkFontFamily: 'SimHei, "Microsoft YaHei", sans-serif',
  useMetroPalette: true,
}

export const hangingSignLineLabelArgTypes = {
  lineNumbers: {
    control: 'text',
    description: '线路号列表，逗号或空白分隔，每项 0–99，从左到右排列。',
  },
  height: {
    control: { type: 'number', min: 1, step: 1 },
    description: '输出 SVG 高度（像素，即 a）。宽度随线路数量与 0.15a 方块间距变化。',
  },
  colors: {
    control: 'object',
    description:
      '与线路号等长的 { foreground, background }[]。取消「使用官方色板」后生效；长度不一致时无法生成。',
  },
  latinFontFamily: {
    control: 'text',
    description: '英文 Line 行的 font-family（整牌共用）。',
  },
  cjkFontFamily: {
    control: 'text',
    description: '「号线」与英文行逗号的 font-family（整牌共用）。',
  },
  useMetroPalette: {
    control: 'boolean',
    name: '使用官方色板',
    description: '开启时各方块按自身线路号取色；关闭时使用下方 colors 数组。',
  },
} satisfies Record<keyof HangingSignLineLabelStoryArgs, InputType>

export function parseLineNumbersInput(value: string) {
  return value
    .split(/[,，\s]+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export function toHangingSignLineLabelProps(args: HangingSignLineLabelStoryArgs) {
  return {
    lineNumbers: parseLineNumbersInput(args.lineNumbers),
    height: args.height,
    latinFontFamily: args.latinFontFamily,
    cjkFontFamily: args.cjkFontFamily,
  }
}
