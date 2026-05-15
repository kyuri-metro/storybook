import type { Preview } from '@storybook/react-vite'
import { NpmPackageLinks } from '../src/components/NpmPackageLinks'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'system-ui, sans-serif' }}>
        <NpmPackageLinks compact />
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
