import {
  generateLineIdBlockSvg,
  type NjMetroLineId,
} from '@kyuri-metro/njmetro-line-id-block-svg-generator'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SvgGeneratorPreview } from '../components/SvgGeneratorPreview'
import { lineIdBlockFileStem } from '../utils/downloadLineIdBlock'
import {
  defaultNjmetroArgs,
  lineIdBlockArgTypes,
  resolveNjmetroColors,
  toGeneratorProps,
  type LineIdBlockStoryArgs,
} from './shared/lineIdBlockControls'

function parseNjMetroLineId(lineNumber: string): NjMetroLineId | null {
  const raw = lineNumber.trim()

  if (/^s[0-9]$/i.test(raw)) {
    return `S${raw[1]}` as NjMetroLineId
  }

  if (!/^\d{1,2}$/.test(raw)) {
    return null
  }

  const lineId = Number(raw)

  if (!Number.isInteger(lineId) || lineId < 0 || lineId > 99) {
    return null
  }

  return lineId
}

function generateNjmetroSvg(args: LineIdBlockStoryArgs) {
  const lineId = parseNjMetroLineId(args.lineNumber)

  if (lineId === null) {
    return ''
  }

  const colors = resolveNjmetroColors(args)

  return generateLineIdBlockSvg({
    ...toGeneratorProps(args),
    ...colors,
    lineNumber: lineId,
  })
}

const meta = {
  title: 'kyuri-metro/njmetro-line-id-block-svg-generator',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '调用 npm 包 `@kyuri-metro/njmetro-line-id-block-svg-generator`。线路号支持 0–99 与 S0–S9（输入如 `S1` 或 `s1`）。',
      },
    },
  },
  args: defaultNjmetroArgs,
  argTypes: lineIdBlockArgTypes,
  render: (args: LineIdBlockStoryArgs) => (
    <SvgGeneratorPreview
      svg={generateNjmetroSvg(args)}
      downloadBaseName={lineIdBlockFileStem(args.lineNumber, 'njmetro')}
    />
  ),
} satisfies Meta<LineIdBlockStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
