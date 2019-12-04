import React, { Component } from 'react'
import './App.css'

const defaultTitle  ='ascii art maker :)'
const copiedTitle = 'copied to clipboard!'

const copyToClipboard = str => {
  const el = document.createElement('textarea');  // Create a <textarea> element
  el.value = str;                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';                 
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =            
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
};

class App extends Component {
  state = {
    figure: '',
    text: '',
    title: defaultTitle
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

  onFigClick = () => {
    copyToClipboard(this.state.figure)
    this.setState({ title: copiedTitle });
    setTimeout(()=> this.setState({title: defaultTitle}), 1000)
  }
  render() {
    return (
      <div className="App">
  <h3>{this.state.title}</h3>
        <div className="wrap">

          <code onClick={this.onFigClick}>
            {this.state.figure}
          </code>
        </div>
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
        <div className="footer">
          created by <a href="//taloranderson.com">Talor Anderson</a>
        </div>
      </div>
    )
  }
}
export default App
