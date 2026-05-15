import { generateLineIdBlock2020Svg } from '@kyuri-metro/shmetro-line-id-block-2020-svg-generator'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  defaultShmetroArgs,
  lineIdBlockArgTypes,
  type LineIdBlockStoryArgs,
} from './shared/lineIdBlockControls'
import { renderShmetroLineIdBlock } from './shared/lineIdBlockRender'

const meta = {
  title: 'kyuri-metro/shmetro-line-id-block-2020-svg-generator',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '调用 npm 包 `@kyuri-metro/shmetro-line-id-block-2020-svg-generator` 的生成函数，在 Controls 中调整参数后即时预览 SVG。',
      },
    },
  },
  args: defaultShmetroArgs,
  argTypes: lineIdBlockArgTypes,
  render: (args) => renderShmetroLineIdBlock(args, generateLineIdBlock2020Svg, '2020'),
} satisfies Meta<LineIdBlockStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
