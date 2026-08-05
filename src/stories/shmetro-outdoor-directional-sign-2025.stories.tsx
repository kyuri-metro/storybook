import { generateOutdoorDirectionalSignSvg } from '@kyuri-metro/shmetro-outdoor-directional-sign-2025-svg-generator'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  defaultOutdoorDirectionalSignArgs,
  outdoorDirectionalSignArgTypes,
  type OutdoorDirectionalSignStoryArgs,
} from './shared/outdoorDirectionalSignControls'
import { renderOutdoorDirectionalSign } from './shared/outdoorDirectionalSignRender'

const meta = {
  title: 'kyuri-metro/shmetro-outdoor-directional-sign-2025-svg-generator',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**TODO：还原 `Line *, *, …` 部分的字间距压缩**（当前多线路英文行逗号/`tspan` letter-spacing 仅为临时值）。\n\n调用 `@kyuri-metro/shmetro-outdoor-directional-sign-2025-svg-generator` 生成上海地铁站外指向牌（基准 1640×420，可 height 缩放）。支持左/右向、普线 1～4（4 条缩小方块套）或市域命名线路 1～2；市域中英各自对齐；右向市域 logo 水平翻转。',
      },
    },
  },
  args: defaultOutdoorDirectionalSignArgs,
  argTypes: outdoorDirectionalSignArgTypes,
  render: (args) =>
    renderOutdoorDirectionalSign(
      args,
      generateOutdoorDirectionalSignSvg,
      'outdoor-directional-sign-2025',
    ),
} satisfies Meta<OutdoorDirectionalSignStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FourLines: Story = {
  args: {
    mode: 'metro',
    metroLineNumbers: '2,10,17,25',
    distanceMeters: '50',
    colors: [
      { foreground: '#FFFFFF', background: '#8CC220' },
      { foreground: '#FFFFFF', background: '#C6AFD4' },
      { foreground: '#FFFFFF', background: '#F07B42' },
      { foreground: '#FFFFFF', background: '#95D1DB' },
    ],
  },
}

export const RightMetro: Story = {
  args: {
    direction: 'r',
    mode: 'metro',
    metroLineNumbers: '13',
    distanceMeters: '50',
  },
}

export const Suburban: Story = {
  args: {
    mode: 'suburban',
    suburbanZh1: '机场联络线',
    suburbanEn1: 'Airport Link Line',
    suburbanZh2: '',
    suburbanEn2: '',
    distanceMeters: '500',
  },
}

export const SuburbanDual: Story = {
  args: {
    mode: 'suburban',
    suburbanZh1: '机场联络线',
    suburbanEn1: 'Airport Link Line',
    suburbanZh2: '南汇线',
    suburbanEn2: 'Nanhui Line',
    distanceMeters: '500',
  },
}

export const SuburbanRight: Story = {
  args: {
    direction: 'r',
    mode: 'suburban',
    suburbanZh1: '机场联络线',
    suburbanEn1: 'Airport Link Line',
    distanceMeters: '50',
  },
}
