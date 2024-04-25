import './App.scss'
import githubLogo from './assets/github.svg'
import logo from './assets/logo.png'

function App() {
  return (
    <div className="App">
      <div>
        <img src={ logo } className="logo" alt="Ever Guild"/>
      </div>
      <h2>Ever Guild</h2>
      <div className="card">
        <a className="center" href="https://github.com/ever-guild">
          <img src={ githubLogo } className="logo github" alt="Ever Guild"/>
        </a>
      </div>
    </div>
  )
}

export default App
