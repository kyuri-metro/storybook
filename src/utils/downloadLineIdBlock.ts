export type RasterFormat = 'png' | 'jpg' | 'webp'

const rasterMime: Record<RasterFormat, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  webp: 'image/webp',
}

function downloadBlob(blob: Blob, fileName: string) {
  const objectUrl = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = objectUrl
  link.download = fileName
  document.body.append(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(objectUrl)
}

export function downloadSvgFile(fileName: string, svgContent: string) {
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
  downloadBlob(blob, fileName.endsWith('.svg') ? fileName : `${fileName}.svg`)
}

function parseSvgSize(svg: string) {
  const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
  const root = doc.documentElement

  const width = Number.parseFloat(root.getAttribute('width') ?? '')
  const height = Number.parseFloat(root.getAttribute('height') ?? '')

  if (Number.isFinite(width) && width > 0 && Number.isFinite(height) && height > 0) {
    return { width, height }
  }

  const viewBox = root.getAttribute('viewBox')?.trim().split(/\s+/)

  if (viewBox?.length === 4) {
    const viewWidth = Number.parseFloat(viewBox[2])
    const viewHeight = Number.parseFloat(viewBox[3])

    if (Number.isFinite(viewWidth) && viewWidth > 0 && Number.isFinite(viewHeight) && viewHeight > 0) {
      return { width: viewWidth, height: viewHeight }
    }
  }

  return { width: 100, height: 100 }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('无法将 SVG 转为位图。'))
    image.src = src
  })
}

async function svgToCanvas(svg: string) {
  const { width, height } = parseSvgSize(svg)
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const objectUrl = window.URL.createObjectURL(blob)

  try {
    const image = await loadImage(objectUrl)
    const canvas = document.createElement('canvas')
    canvas.width = Math.ceil(width)
    canvas.height = Math.ceil(height)
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('无法创建 Canvas 上下文。')
    }

    if (image.decode) {
      await image.decode()
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    return canvas
  } finally {
    window.URL.revokeObjectURL(objectUrl)
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality?: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('无法编码位图。'))
          return
        }

        resolve(blob)
      },
      mimeType,
      quality,
    )
  })
}

async function canvasForJpeg(svg: string) {
  const { width, height } = parseSvgSize(svg)
  const sourceCanvas = await svgToCanvas(svg)
  const canvas = document.createElement('canvas')
  canvas.width = Math.ceil(width)
  canvas.height = Math.ceil(height)
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('无法创建 Canvas 上下文。')
  }

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(sourceCanvas, 0, 0)

  return canvas
}

export async function downloadRasterFromSvg(fileName: string, svg: string, format: RasterFormat) {
  const extension = format === 'jpg' ? 'jpg' : format
  const fullName = fileName.endsWith(`.${extension}`) ? fileName : `${fileName}.${extension}`
  const canvas = format === 'jpg' ? await canvasForJpeg(svg) : await svgToCanvas(svg)
  const quality = format === 'png' ? undefined : 0.92
  const blob = await canvasToBlob(canvas, rasterMime[format], quality)

  downloadBlob(blob, fullName)
}

export function lineIdBlockFileStem(lineNumber: string, variant: string) {
  const safeLine = lineNumber.trim().replace(/[^a-zA-Z0-9]+/gi, '-') || 'invalid'

  return `line-${safeLine}-${variant}`
}
