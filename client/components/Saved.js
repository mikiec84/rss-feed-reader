import React from 'react'
import ReactDOM from 'react-dom'
import Loader from './Loader'
import Alert from './Alert'
import NoContent from './NoContent'
import { fetchStatusHandler, showAlertForError, buttonWasClicked } from './utils'


class Saved extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      showAlertError: false
    }
    this.deleteSaved = this.deleteSaved.bind(this);
    this.addNewFavorite = this.addNewFavorite.bind(this);
  }

  componentDidMount() {
    this.getSavedStories();
  }

  getSavedStories() {
    const url = '/api/saved';
    fetch(url).then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => this.setState({posts: data}))
    .catch(error => showAlertForError(this));
  }

  deleteSaved(story) {
    const url = '/api/saved/' + story.id;
    const options = {
      method: 'delete',
      headers: {'Content-Type': 'application/json'}
    }
    fetch(url, options).then(fetchStatusHandler)
    .then(response => this.getSavedStories())
    .catch(error => showAlertForError(this));
  }

  addNewFavorite(story, event) {
    const button = event.currentTarget;
    const url = '/api/favorites';
    const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(story)
    }
    fetch(url, options).then(fetchStatusHandler)
    .then(response => buttonWasClicked(button))
    .catch(error => showAlertForError(this))
  }


  render() {
    return(
      <div className="d-flex flex-column margin-fix stories">
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">Saved for later</li>
          </ol>
        </nav>
        <div className="row">
          {
            !this.state.posts ? (<Loader />) : (
              this.state.posts.length > 0 ? this.renderStories() : (<NoContent text="No saved for later yet" />)
            )
          }
        </div>
        {this.state.showAlertError && <Alert error />}
      </div>
    )
  }

  renderStories() {

    let htmlArray = [];
    const posts = this.state.posts;

    for (let i = 0; i < posts.length; i++) {
      htmlArray.push(<Story key={i} story={posts[i]} deleteSaved={this.deleteSaved} addNewFavorite={this.addNewFavorite} />);
      if (i % 2 !== 0)
        htmlArray.push(<div key={100+i} className="w-100"></div>);
    }

    if (posts.length % 2 !== 0)
      htmlArray.push(<div key={posts.length} className="col"></div>);

    return htmlArray;
  }

}


const Story = (props) => {
  const {title, link, date, content} = props.story;
  return(
    <div className="col">
      <div className="card">
        <div className="card-body">
          <a href={link} target="_blank"><h4 className="card-title">{title}</h4></a>
          <p className="text-muted"><small>{date}</small></p>
          <p className="card-text">{content}</p>
        </div>
        <div className="card-footer bg-transparent d-flex justify-content-end">
          <div className="buttons">
            <button onClick={props.addNewFavorite.bind(this, props.story)} className="btn btn-light btn-card" title="Add to favorites"><i className="icon ion-ios-star" aria-hidden="true"></i></button>
            <button onClick={props.deleteSaved.bind(this, props.story)} className="btn btn-light btn-card" title="Delete"><i className="icon ion-ios-trash" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Saved;
