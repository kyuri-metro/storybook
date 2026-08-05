import type { InputType } from 'storybook/internal/types'

export type OutdoorSignLineColorArg = {
  foreground: string
  background: string
}

export type OutdoorDirectionalSignStoryArgs = {
  direction: 'l' | 'r'
  mode: 'metro' | 'suburban'
  height: number
  metroLineNumbers: string
  suburbanZh1: string
  suburbanEn1: string
  suburbanZh2: string
  suburbanEn2: string
  distanceMeters: string
  colors: OutdoorSignLineColorArg[]
  latinFontFamily: string
  cjkFontFamily: string
  useMetroPalette: boolean
  whiteBorder: boolean
  panelFill: string
}

export const defaultOutdoorDirectionalSignArgs: OutdoorDirectionalSignStoryArgs = {
  direction: 'l',
  mode: 'metro',
  height: 210,
  metroLineNumbers: '12',
  suburbanZh1: '机场联络线',
  suburbanEn1: 'Airport Link Line',
  suburbanZh2: '',
  suburbanEn2: '',
  distanceMeters: '50',
  colors: [{ foreground: '#FFFFFF', background: '#89D0E0' }],
  latinFontFamily: 'Arial, Helvetica, sans-serif',
  cjkFontFamily: 'SimHei, "Microsoft YaHei", sans-serif',
  useMetroPalette: true,
  whiteBorder: true,
  panelFill: '#0033ff',
}

export const outdoorDirectionalSignArgTypes = {
  direction: {
    control: 'inline-radio',
    options: ['l', 'r'],
    description: '左：向左箭头、从左到右；右：向右箭头、从右到左。',
  },
  mode: {
    control: 'inline-radio',
    options: ['metro', 'suburban'],
    name: '牌种',
    description: '普线（线路号）或市域（命名线路文案）。二者互斥。',
  },
  height: {
    control: { type: 'number', min: 1, step: 1 },
    description: '输出 SVG 高度（像素）。基准画布高 420，宽度按 1640∶420 等比缩放。',
  },
  metroLineNumbers: {
    control: 'text',
    description: '普线线路号，逗号或空白分隔，1～4 项，每项 0–99。',
  },
  suburbanZh1: {
    control: 'text',
    description: '市域第 1 条中文名。',
  },
  suburbanEn1: {
    control: 'text',
    description: '市域第 1 条英文名。',
  },
  suburbanZh2: {
    control: 'text',
    description: '市域第 2 条中文名（可空）。',
  },
  suburbanEn2: {
    control: 'text',
    description: '市域第 2 条英文名（可空）。',
  },
  distanceMeters: {
    control: 'text',
    description: '距离数值（如 50 → 50m）。留空则不绘制距离。',
  },
  colors: {
    control: 'object',
    description:
      '与线路号等长的 { foreground, background }[]。取消「使用官方色板」后对普线生效；长度不一致时无法生成。',
  },
  latinFontFamily: {
    control: 'text',
    description: '拉丁字体（方块数字、Line、距离等）。',
  },
  cjkFontFamily: {
    control: 'text',
    description: '中文字体（「号线」、市域中文等）。',
  },
  useMetroPalette: {
    control: 'boolean',
    name: '使用官方色板',
    description: '开启时各方块按自身线路号取色；关闭时使用 colors。',
  },
  whiteBorder: {
    control: 'boolean',
    name: '白边',
    description: '线路号方块内侧白边（0.025a），默认开启。',
  },
  panelFill: {
    control: 'color',
    description: '面板填充色（模板默认施工蓝 #0033ff）。',
  },
} satisfies Record<keyof OutdoorDirectionalSignStoryArgs, InputType>

export function parseMetroLineNumbersInput(value: string) {
  return value
    .split(/[,，\s]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => Number(part))
}
