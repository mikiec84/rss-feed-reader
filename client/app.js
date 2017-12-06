import React from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './components/Sidebar'
import Sources from './components/Sources'
import Source from './components/Source'
import Saved from './components/Saved'
import Favorites from './components/Favorites'
import Alert from './components/Alert'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { fetchStatusHandler, showAlertForError } from './components/utils'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      showAlertError: false
    }
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const url = '/api/sources';
    fetch(url).then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => this.setState({sources: data}))
    .catch(err => showAlertForError(this));
  }


  render() {
    return (
      <Router>
        <div className="container">

          <Sidebar sources={this.state.sources} />

          <Switch>
            <Route exact path="/" render={(props) => (<Sources {...props} updateSidebarSources={this.getData} />)} />
            <Route path="/saved" component={Saved}/>
            <Route path="/favorites" component={Favorites}/>
            <Route path="/source/:id" component={Source} />
          </Switch>

          {this.state.showAlertError && <Alert error />}

        </div>
      </Router>
    )
  }

}


ReactDOM.render(<App />, document.getElementById('app'));
