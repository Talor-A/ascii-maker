import React, { Component } from 'react'
import './App.css'
class App extends Component {
  state = {
    figure: '',
    text: ''
  }
componentDidMount() {
    this.fetchFig()
  }
fetchFig = async () => {
    const response = await fetch(`/api/fig`)
    const initial = await response.json()
    const figure = initial.fig
    this.setState({ figure })
  }
customFig = async evt => {
    evt.preventDefault()
    const text = this.state.text
    const response = await fetch(`/api/fig/${text}`)
    const custom = await response.json()
    const figure = custom.fig
    this.setState({ figure, text: '' })
  }
handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
    console.log(this.state.text)
  }
render() {
    return (
      <div className="App">
        <h3>ascii art maker :)</h3>
        <code>{this.state.figure}</code>
        <form onSubmit={this.customFig}>
          <label>Custom Text:</label>
          <input
            maxLength={20}
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button type="submit">make it!</button>
        </form>
      </div>
    )
  }
}
export default App
