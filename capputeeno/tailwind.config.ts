import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      maxWidth: {
        desktop: '1120px',
      },
      colors: {
        'app-red': '#DE3838',
        'app-orange': '#FD951F',
        'app-light-orange': '#FFA585',
        'app-blue': '#115D8C',
        'app-back-bt': '#617480',
        'app-green': '#51B853',
        'app-background-100': '#F0F0F5',
        'app-background-200': '#E9E9F0',
        'app-title': '#5D5D6D',
        'app-text-300': '#737380',
        'app-text-400': '#41414D',
      },
    },
  },
  plugins: [],
}
export default config
