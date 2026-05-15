import { SvgGeneratorPreview } from '../../components/SvgGeneratorPreview'
import { lineIdBlockFileStem } from '../../utils/downloadLineIdBlock'
import {
  resolveShmetroColors,
  toGeneratorProps,
  type LineIdBlockStoryArgs,
} from './lineIdBlockControls'

type GeneratorProps = {
  lineNumber: string | number
  height?: number
  foreground?: string
  background?: string
  fontFamily?: string
}

export function renderShmetroLineIdBlock(
  args: LineIdBlockStoryArgs,
  generate: (props: GeneratorProps) => string,
  variant: string,
) {
  const colors = resolveShmetroColors(args)
  const svg = generate({
    ...toGeneratorProps(args),
    ...colors,
  })

  return (
    <SvgGeneratorPreview
      svg={svg}
      downloadBaseName={lineIdBlockFileStem(args.lineNumber, variant)}
    />
  )
}
