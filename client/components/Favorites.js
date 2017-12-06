import React from 'react'
import ReactDOM from 'react-dom'
import Loader from './Loader'
import Alert from './Alert'
import NoContent from './NoContent'
import { fetchStatusHandler, showAlertForError } from './utils'


class Favorites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      showAlertError: false
    }
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites() {
    const url = '/api/favorites';
    fetch(url).then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => this.setState({posts: data}))
    .catch(error => showAlertForError(this));
  }

  deleteFavorite(story) {
    const url = '/api/favorites/' + story.id;
    const options = {
      method: 'delete',
      headers: {'Content-Type': 'application/json'}
    }
    fetch(url, options).then(fetchStatusHandler)
    .then(response => this.getFavorites())
    .catch(error => showAlertForError(this));
  }


  render() {
    return(
      <div className="d-flex flex-column margin-fix stories">
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">Favorites</li>
          </ol>
        </nav>
        <div className="row">
          {
            !this.state.posts ? (<Loader />) : (
              this.state.posts.length > 0 ? this.renderStories() : (<NoContent text="No favorites yet" />)
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
      htmlArray.push(<Story key={i} story={posts[i]} deleteFavorite={this.deleteFavorite} />);
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
            <button onClick={props.deleteFavorite.bind(this, props.story)} className="btn btn-light btn-card" title="Delete"><i className="icon ion-ios-trash" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}

const NoStories = () => {
  return(
    <div className="nothing-yet">
      No favorites yet
    </div>
  )
}


export default Favorites;
