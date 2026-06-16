export type KyuriMetroGeneratorPackage = {
  name: string
  npmUrl: string
  description: string
  storyPath: string
}

export const kyuriMetroGeneratorPackages: KyuriMetroGeneratorPackage[] = [
  {
    name: '@kyuri-metro/shmetro-numeric-floor-sticker-2025-svg-generator',
    npmUrl:
      'https://www.npmjs.com/package/@kyuri-metro/shmetro-numeric-floor-sticker-2025-svg-generator',
    description: '2025 版上海地铁数字地贴（线路号箭头）SVG 生成器',
    storyPath:
      '?path=/story/kyuri-metro-shmetro-numeric-floor-sticker-2025-svg-generator--default',
  },
  {
    name: '@kyuri-metro/shmetro-line-id-block-2025-svg-generator',
    npmUrl: 'https://www.npmjs.com/package/@kyuri-metro/shmetro-line-id-block-2025-svg-generator',
    description: '2025 版上海地铁线路号方块 SVG 生成器',
    storyPath: '?path=/story/kyuri-metro-shmetro-line-id-block-2025-svg-generator--default',
  },
  {
    name: '@kyuri-metro/shmetro-line-id-block-2020-svg-generator',
    npmUrl: 'https://www.npmjs.com/package/@kyuri-metro/shmetro-line-id-block-2020-svg-generator',
    description: '2020 版上海地铁线路号方块 SVG 生成器',
    storyPath: '?path=/story/kyuri-metro-shmetro-line-id-block-2020-svg-generator--default',
  },
  {
    name: '@kyuri-metro/shmetro-line-id-block-2020-type-2-svg-generator',
    npmUrl: 'https://www.npmjs.com/package/@kyuri-metro/shmetro-line-id-block-2020-type-2-svg-generator',
    description: '2020 type 2 上海地铁线路号方块 SVG 生成器',
    storyPath: '?path=/story/kyuri-metro-shmetro-line-id-block-2020-type-2-svg-generator--default',
  },
  {
    name: '@kyuri-metro/njmetro-line-id-block-svg-generator',
    npmUrl: 'https://www.npmjs.com/package/@kyuri-metro/njmetro-line-id-block-svg-generator',
    description: '南京地铁线路号方块 SVG 生成器',
    storyPath: '?path=/story/kyuri-metro-njmetro-line-id-block-svg-generator--default',
  },
]

export const kyuriMetroPalettePackages = [
  {
    name: '@kyuri-metro/shmetro-palette',
    npmUrl: 'https://www.npmjs.com/package/@kyuri-metro/shmetro-palette',
    description: '上海地铁线路配色',
  },
  {
    name: '@kyuri-metro/njmetro-palette',
    npmUrl: 'https://www.npmjs.com/package/@kyuri-metro/njmetro-palette',
    description: '南京地铁线路配色',
  },
] as const
