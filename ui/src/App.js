import React from 'react';
import { 
  about,
  regions,
  addRegion,
  addCity,
  getCities
} from './api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      regions: [],
      cities: []
    }
  }

  componentDidMount() {
    
    about()
      .then(res => {
        const message = res.data.result;
        this.setState({ title: message });
       });

    regions()
      .then(res => {
        const regions = res.data.result;
        this.setState( { regions: regions } )
      });
  }

  update(e) {
    getCities(this.refs.regionselectbox.value)
    .then(res => {
      const cities = res.data.result;
      this.setState( { cities: cities } )
    });
    //this.setState( { txt: e.target.value } )
  }

  handleClickNewRegion = () => {
    addRegion(this.refs.newregion.value)
    .then(res => {
      this.setState( { regions: res.data.result } )
     })
  }

  handleClickNewCity = () => {
    addCity(
      this.refs.regionselectbox.value, 
      this.refs.newcity.value
    )
    .then(res => {
      const cities = res.data.result;
      this.setState( { cities: cities } )
     })
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <hr />
        <h2>Regions</h2>
        <ul id="regions_list">
          {
            this.state.regions.map(
              region => 
                <li>
                  {region.name}
                </li>
            )
          }
        </ul>
        <div>
         New Region: <input ref="newregion" id="newregion" type="text" />
         <button id="btn_saveregion" onClick={this.handleClickNewRegion}>Save Region</button>
        </div>

        <hr />
        <div>
          <h2>Cities</h2>

          Select Region: 
          <select id="regionselectbox" ref="regionselectbox" onChange={this.update.bind(this)}>
          <option value=""> Select </option>
            {this.state.regions.map(region => {
              return <option value={region.name} key={region.name} >{region.name}</option>
            })}
          </select>

          New City: <input ref="newcity" id="newcity" />
          <button id="btn_savecity" onClick={this.handleClickNewCity}>Save City</button>
        </div>
        <div>
        <ul id="regions_city_list">
          {
            this.state.cities.map(
              city => 
                <li>
                  {city}
                </li>
            )
          }
        </ul>
        </div>
      </div>
    )
  }
}

export default App;