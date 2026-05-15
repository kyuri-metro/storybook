import type { CSSProperties } from 'react'
import { kyuriMetroGeneratorPackages, kyuriMetroPalettePackages } from '../data/kyuriMetroPackages'

type NpmPackageLinksProps = {
  compact?: boolean
}

const sectionStyle: CSSProperties = {
  margin: '0 0 16px',
  padding: '12px 16px',
  background: '#fafafa',
  border: '1px solid #e0e0e0',
}

const headingStyle: CSSProperties = {
  margin: '0 0 8px',
  fontSize: 14,
  fontWeight: 600,
  color: '#333333',
}

const listStyle: CSSProperties = {
  margin: 0,
  paddingLeft: 20,
  fontSize: 13,
  lineHeight: 1.5,
  color: '#444444',
}

const linkStyle: CSSProperties = {
  color: '#007f7f',
}

export function NpmPackageLinks({ compact = false }: NpmPackageLinksProps) {
  if (compact) {
    return (
      <p style={{ ...sectionStyle, fontSize: 13, lineHeight: 1.5 }}>
        本 Storybook 展示{' '}
        <a href="https://www.npmjs.com/org/kyuri-metro" style={linkStyle} target="_blank" rel="noreferrer">
          @kyuri-metro
        </a>{' '}
        组织下的线路号方块生成器 npm 包。完整包列表见侧边栏「说明」。
      </p>
    )
  }

  return (
    <section style={sectionStyle} aria-label="npm 包链接">
      <h2 style={headingStyle}>npm 包</h2>
      <p style={{ margin: '0 0 12px', fontSize: 13, color: '#666666' }}>
        组织主页：
        <a href="https://www.npmjs.com/org/kyuri-metro" style={linkStyle} target="_blank" rel="noreferrer">
          https://www.npmjs.com/org/kyuri-metro
        </a>
      </p>
      <h3 style={{ ...headingStyle, fontSize: 13 }}>SVG 生成器</h3>
      <ul style={listStyle}>
        {kyuriMetroGeneratorPackages.map((pkg) => (
          <li key={pkg.name}>
            <a href={pkg.npmUrl} style={linkStyle} target="_blank" rel="noreferrer">
              {pkg.name}
            </a>
            {' — '}
            {pkg.description}
            {' '}
            <a href={pkg.storyPath} style={linkStyle}>
              打开 Story
            </a>
          </li>
        ))}
      </ul>
      <h3 style={{ ...headingStyle, fontSize: 13, marginTop: 12 }}>配色</h3>
      <ul style={listStyle}>
        {kyuriMetroPalettePackages.map((pkg) => (
          <li key={pkg.name}>
            <a href={pkg.npmUrl} style={linkStyle} target="_blank" rel="noreferrer">
              {pkg.name}
            </a>
            {' — '}
            {pkg.description}
          </li>
        ))}
      </ul>
    </section>
  )
}
