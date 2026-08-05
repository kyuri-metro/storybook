import { SvgGeneratorPreview } from '../../components/SvgGeneratorPreview'
import { lineIdBlockFileStem } from '../../utils/downloadLineIdBlock'
import {
  parseLineNumbersInput,
  toHangingSignLineLabelProps,
  type HangingSignLineColorArg,
  type HangingSignLineLabelStoryArgs,
} from './hangingSignLineLabelControls'

type GeneratorProps = {
  lineNumbers: Array<string | number>
  height?: number
  colors?: HangingSignLineColorArg[]
  latinFontFamily?: string
  cjkFontFamily?: string
  whiteBorder?: boolean
}

export function renderHangingSignLineLabel(
  args: HangingSignLineLabelStoryArgs,
  generate: (props: GeneratorProps) => string,
  variant: string,
) {
  const props = toHangingSignLineLabelProps(args)
  const colors = args.useMetroPalette ? undefined : args.colors
  const svg = generate({
    ...props,
    colors,
  })
  const stemKey = parseLineNumbersInput(args.lineNumbers).join('-') || 'invalid'

  return (
    <SvgGeneratorPreview
      svg={svg}
      downloadBaseName={lineIdBlockFileStem(stemKey, variant)}
    />
  )
}
