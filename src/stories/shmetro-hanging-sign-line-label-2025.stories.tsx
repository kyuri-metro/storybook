import { generateHangingSignLineLabel2025Svg } from '@kyuri-metro/shmetro-hanging-sign-line-label-2025-svg-generator'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  defaultHangingSignLineLabelArgs,
  hangingSignLineLabelArgTypes,
  type HangingSignLineLabelStoryArgs,
} from './shared/hangingSignLineLabelControls'
import { renderHangingSignLineLabel } from './shared/hangingSignLineLabelRender'

const meta = {
  title: 'kyuri-metro/shmetro-hanging-sign-line-label-2025-svg-generator',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '调用 npm 包 `@kyuri-metro/shmetro-hanging-sign-line-label-2025-svg-generator` 生成上海地铁悬挂指示牌线路标识（多线路号方块 +「号线」/ Line 列表）。方块间距 0.15a；英文逗号 letter-spacing 按后接是否以 1 起首分两档。自定义色时传入与 lineNumbers 等长的 colors 数组。',
      },
    },
  },
  args: defaultHangingSignLineLabelArgs,
  argTypes: hangingSignLineLabelArgTypes,
  render: (args) =>
    renderHangingSignLineLabel(args, generateHangingSignLineLabel2025Svg, 'hanging-sign-line-label-2025'),
} satisfies Meta<HangingSignLineLabelStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleLine: Story = {
  args: {
    lineNumbers: '22',
    colors: [{ foreground: '#FFFFFF', background: '#5F376F' }],
  },
}
