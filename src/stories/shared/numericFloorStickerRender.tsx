import { SvgGeneratorPreview } from '../../components/SvgGeneratorPreview'
import { lineIdBlockFileStem } from '../../utils/downloadLineIdBlock'
import {
  resolveNumericFloorStickerColors,
  toNumericFloorStickerProps,
  type NumericFloorStickerStoryArgs,
} from './numericFloorStickerControls'

type GeneratorProps = {
  lineNumber: string | number
  height?: number
  foreground?: string
  background?: string
  latinFontFamily?: string
  cjkFontFamily?: string
}

export function renderNumericFloorSticker(
  args: NumericFloorStickerStoryArgs,
  generate: (props: GeneratorProps) => string,
  variant: string,
) {
  const colors = resolveNumericFloorStickerColors(args)
  const svg = generate({
    ...toNumericFloorStickerProps(args),
    ...colors,
  })

  return (
    <SvgGeneratorPreview
      svg={svg}
      downloadBaseName={lineIdBlockFileStem(args.lineNumber, variant)}
    />
  )
}
