import React from 'react'
import ReactDOM from 'react-dom'
import Loader from './Loader'
import Alert from './Alert'
import NoContent from './NoContent'
import { NavLink } from 'react-router-dom'
import { fetchStatusHandler, showAlertForError, showAlertForURL, isURLValid } from './utils'


class Sources extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sources: null,
      waiting: false,
      showAlertURL: false,
      showAlertError: false
    }
    this.getSources = this.getSources.bind(this);
    this.renderSources = this.renderSources.bind(this);
    this.addNewSource = this.addNewSource.bind(this);
    this.deleteSource = this.deleteSource.bind(this);
  }

  componentDidMount() {
    this.getSources();
  }

  getSources() {
    const url = '/api/sources';
    fetch(url).then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => this.setState({sources: data}))
    .catch(err => showAlertForError(this));
  }

  addNewSource() {
    if (!isURLValid(this.textInput.value)) {
      showAlertForURL(this);
      return;
    }
    this.setState({waiting: true});
    const url = '/api/sources/';
    const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({url: this.textInput.value})
    }
    fetch(url, options).then(fetchStatusHandler)
    .then(response => {
      this.setState({waiting: false});
      this.getSources();
      this.props.updateSidebarSources();
    })
    .catch(error => {
      this.setState({waiting: false});
      showAlertForError(this);
    })
  }

  deleteSource(source) {
    const url = '/api/sources/' + source.id;
    const options = {
      method: 'delete',
      headers: {'Content-Type': 'application/json'}
    }
    fetch(url, options).then(fetchStatusHandler)
    .then(response => {
      this.getSources();
      this.props.updateSidebarSources();
    })
    .catch(error => showAlertForError(this));
  }


  render() {
    return(
      <div className="d-flex flex-column margin-fix sources">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Manage sources</li>
          </ol>
        </nav>
        <div className="row row-input">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <p>Add new source</p>
                <div className="input-group">
                  <input ref={(input) => {this.textInput = input}} type="text" className="form-control" placeholder="Enter RSS feed URL..." aria-label="Search for..." />
                  <span className="input-group-btn">
                    <button onClick={this.addNewSource.bind(this)} className="btn btn-form" type="button"><i className="icon ion-ios-plus-empty" aria-hidden="true"></i></button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col d-flex flex-column">
            {this.state.waiting && <Loader />}
            {this.state.showAlertURL && <Alert />}
          </div>
        </div>
        <div className="row">
          {
            !this.state.sources ? (<Loader />) : (
              this.state.sources.length > 0 ? this.renderSources() : (<NoContent text="No sources yet" />)
            )
          }
        </div>
        {this.state.showAlertError && <Alert error />}
      </div>
    )
  }


  renderSources() {

    let htmlArray = [];
    const sources = this.state.sources;

    for (let i = 0; i < sources.length; i++) {
      htmlArray.push(<Source key={i} source={sources[i]} deleteSource={this.deleteSource} />);
      if (i % 2 !== 0)
        htmlArray.push(<div key={100+i} className="w-100"></div>);
    }
    
    if (sources.length % 2 !== 0)
      htmlArray.push(<div key={sources.length} className="col"></div>);

    return htmlArray;
  }

}


const Source = (props) => {
  const {title, id, link, description} = props.source;
  return(
    <div className="col">
      <div className="card">
        <div className="card-body">
          <div className="card-head d-flex justify-content-between">
            <NavLink to={`/source/${id}`}><h4 className="card-title">{title}</h4></NavLink>
            <button onClick={props.deleteSource.bind(this, props.source)} className="btn btn-light btn-card" title="Delete"><i className="icon ion-ios-trash" aria-hidden="true"></i></button>
          </div>
          <a href={link} target="_blank"><p className="text-muted"><small>{link}</small></p></a>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  )
}


export default Sources;
