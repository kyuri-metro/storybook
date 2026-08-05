import type { OutdoorDirectionalSignProps } from '@kyuri-metro/shmetro-outdoor-directional-sign-2025-svg-generator'
import { SvgGeneratorPreview } from '../../components/SvgGeneratorPreview'
import { lineIdBlockFileStem } from '../../utils/downloadLineIdBlock'
import {
  parseMetroLineNumbersInput,
  type OutdoorDirectionalSignStoryArgs,
} from './outdoorDirectionalSignControls'

export function renderOutdoorDirectionalSign(
  args: OutdoorDirectionalSignStoryArgs,
  generate: (props: OutdoorDirectionalSignProps) => string,
  variant: string,
) {
  const distanceRaw = args.distanceMeters.trim()
  const distanceMeters = distanceRaw === '' ? undefined : distanceRaw

  let props: OutdoorDirectionalSignProps

  if (args.mode === 'metro') {
    const metroLineNumbers = parseMetroLineNumbersInput(args.metroLineNumbers)
    props = {
      direction: args.direction,
      height: args.height,
      metroLineNumbers,
      latinFontFamily: args.latinFontFamily,
      cjkFontFamily: args.cjkFontFamily,
      distanceMeters,
      whiteBorder: args.whiteBorder,
      panelFill: args.panelFill,
      colors: args.useMetroPalette ? undefined : args.colors,
    }
  } else {
    const suburbanLines = [
      { zh: args.suburbanZh1.trim(), en: args.suburbanEn1.trim() },
      { zh: args.suburbanZh2.trim(), en: args.suburbanEn2.trim() },
    ].filter((line) => line.zh && line.en)

    props = {
      direction: args.direction,
      height: args.height,
      suburbanLines,
      latinFontFamily: args.latinFontFamily,
      cjkFontFamily: args.cjkFontFamily,
      distanceMeters,
      whiteBorder: args.whiteBorder,
      panelFill: args.panelFill,
    }
  }

  const svg = generate(props)
  const stemKey =
    args.mode === 'metro'
      ? parseMetroLineNumbersInput(args.metroLineNumbers).join('-') || 'invalid'
      : [args.suburbanZh1, args.suburbanZh2].filter(Boolean).join('-') || 'suburban'

  return (
    <div>
      <p
        style={{
          margin: '0 0 12px',
          padding: '10px 12px',
          border: '1px solid #d97706',
          background: '#fffbeb',
          color: '#92400e',
          fontSize: 14,
          lineHeight: 1.45,
        }}
        role="note"
      >
        <strong>TODO：</strong>
        还原 <code>Line *, *, …</code> 部分的字间距压缩（当前多线路英文行逗号/
        <code>tspan</code> letter-spacing 仅为临时值）。
      </p>
      <SvgGeneratorPreview
        svg={svg}
        downloadBaseName={lineIdBlockFileStem(`${args.direction}-${stemKey}`, variant)}
      />
    </div>
  )
}
