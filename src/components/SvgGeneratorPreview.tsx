import { useState, type CSSProperties } from 'react'
import {
  downloadRasterFromSvg,
  downloadSvgFile,
  type RasterFormat,
} from '../utils/downloadLineIdBlock'

type SvgGeneratorPreviewProps = {
  svg: string
  downloadBaseName?: string
  emptyMessage?: string
}

const previewStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 120,
  padding: 16,
  background: '#f5f5f5',
  border: '1px solid #e0e0e0',
}

const actionsStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  marginTop: 12,
}

const buttonStyle: CSSProperties = {
  padding: '6px 12px',
  fontSize: 13,
  lineHeight: 1.3,
  border: '1px solid #d0d0d0',
  borderRadius: 4,
  background: '#ffffff',
  color: '#333333',
  cursor: 'pointer',
}

const buttonDisabledStyle: CSSProperties = {
  ...buttonStyle,
  cursor: 'not-allowed',
  color: '#999999',
}

const emptyStyle: CSSProperties = {
  margin: 0,
  color: '#666666',
  fontSize: 14,
}

const codeStyle: CSSProperties = {
  margin: '12px 0 0',
  padding: 12,
  background: '#fafafa',
  border: '1px solid #e0e0e0',
  fontSize: 11,
  lineHeight: 1.4,
  overflow: 'auto',
  maxHeight: 160,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
}

const downloadActions: { label: string; format: 'svg' | RasterFormat }[] = [
  { label: 'SVG', format: 'svg' },
  { label: 'PNG', format: 'png' },
  { label: 'JPG', format: 'jpg' },
  { label: 'WebP', format: 'webp' },
]

export function SvgGeneratorPreview({
  svg,
  downloadBaseName = 'line-id-block',
  emptyMessage = '参数无效或无法生成 SVG。',
}: SvgGeneratorPreviewProps) {
  const [busyFormat, setBusyFormat] = useState<'svg' | RasterFormat | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleDownload(format: 'svg' | RasterFormat) {
    if (!svg || busyFormat) {
      return
    }

    setBusyFormat(format)
    setErrorMessage(null)

    try {
      if (format === 'svg') {
        downloadSvgFile(downloadBaseName, svg)
        return
      }

      await downloadRasterFromSvg(downloadBaseName, svg, format)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '下载失败。')
    } finally {
      setBusyFormat(null)
    }
  }

  return (
    <div>
      <div style={previewStyle}>
        {svg ? (
          <div dangerouslySetInnerHTML={{ __html: svg }} aria-label="生成的 SVG 预览" />
        ) : (
          <p style={emptyStyle}>{emptyMessage}</p>
        )}
      </div>
      {svg ? (
        <div style={actionsStyle} role="group" aria-label="下载导出">
          {downloadActions.map(({ label, format }) => {
            const isBusy = busyFormat !== null
            const isThisBusy = busyFormat === format

            return (
              <button
                key={format}
                type="button"
                style={isBusy && !isThisBusy ? buttonDisabledStyle : buttonStyle}
                disabled={isBusy}
                onClick={() => void handleDownload(format)}
              >
                {isThisBusy ? `导出 ${label}…` : `下载 ${label}`}
              </button>
            )
          })}
        </div>
      ) : null}
      {errorMessage ? <p style={emptyStyle}>{errorMessage}</p> : null}
      {svg ? <pre style={codeStyle}>{svg}</pre> : null}
    </div>
  )
}
