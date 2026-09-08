import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Repo is deployed to https://CrissanDondriano.github.io/ (user/org page,
  // served from the domain root) — so base stays "/".
  // If you ever deploy this as a PROJECT page instead
  // (https://CrissanDondriano.github.io/crissan-portfolio/), change this to
  // base: '/crissan-portfolio/'
  base: '/',
})
