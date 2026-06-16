import { generateNumericFloorSticker2025Svg } from '@kyuri-metro/shmetro-numeric-floor-sticker-2025-svg-generator'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  defaultNumericFloorStickerArgs,
  numericFloorStickerArgTypes,
  type NumericFloorStickerStoryArgs,
} from './shared/numericFloorStickerControls'
import { renderNumericFloorSticker } from './shared/numericFloorStickerRender'

const meta = {
  title: 'kyuri-metro/shmetro-numeric-floor-sticker-2025-svg-generator',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '调用 npm 包 `@kyuri-metro/shmetro-numeric-floor-sticker-2025-svg-generator` 生成 2025 版上海地铁数字地贴（竖向箭头，显示线路号），在 Controls 中调整参数后即时预览 SVG。',
      },
    },
  },
  args: defaultNumericFloorStickerArgs,
  argTypes: numericFloorStickerArgTypes,
  render: (args) =>
    renderNumericFloorSticker(args, generateNumericFloorSticker2025Svg, 'numeric-floor-sticker-2025'),
} satisfies Meta<NumericFloorStickerStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
