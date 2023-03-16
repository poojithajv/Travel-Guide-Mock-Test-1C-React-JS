import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

class Home extends Component {
  state = {
    travelData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    this.setState({isLoading: true})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.packages.map(each => ({
        id: each.id,
        description: each.description,
        imageUrl: each.image_url,
        name: each.name,
      }))
      this.setState({travelData: updatedData, isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {travelData} = this.state
    return (
      <ul className="travel-places-list">
        {travelData.map(eachData => (
          <li key={eachData.id} className="each-travel-place">
            <img
              src={eachData.imageUrl}
              className="image"
              alt={eachData.name}
            />
            <h1 className="each-travel-heading">{eachData.name}</h1>
            <p className="each-travel-description">{eachData.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="main-container">
        <h1 className="heading">Travel Guide</h1>
        {isLoading ? this.renderLoadingView() : this.renderSuccessView()}
      </div>
    )
  }
}
export default Home
