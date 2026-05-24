import './App.scss'
import githubLogo from './assets/github.svg'
import logo from './assets/logo.png'

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.32 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.54V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29l13.32 17.41Z" />
    </svg>
  )
}

function App() {
  return (
    <div className="App">
      <div>
        <img src={ logo } className="logo" alt="Ever Guild"/>
      </div>
      <h2>Ever Guild</h2>
      <div className="card">
        <a className="center" href="https://github.com/ever-guild" aria-label="Ever Guild on GitHub">
          <img src={ githubLogo } className="logo github" alt="Ever Guild"/>
        </a>
        <div className="social-links">
          <a href="https://linkedin.com/company/ever-guild/" aria-label="Ever Guild on LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://x.com/ever_guild_net" aria-label="Ever Guild on X">
            <XIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
