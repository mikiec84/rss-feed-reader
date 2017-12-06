import React from 'react'
import ReactDOM from 'react-dom'
import Loader from './Loader'
import Alert from './Alert'
import NoContent from './NoContent'
import { fetchStatusHandler, buttonWasClicked } from './utils'


class Source extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      posts: null,
      showAlertError: false
    }
    this.getSourceStories = this.getSourceStories.bind(this);
    this.addNewFavorite = this.addNewFavorite.bind(this);
    this.addNewSaved = this.addNewSaved.bind(this);
  }

  componentDidMount() {
    this.getSourceStories();
  }

  componentWillReceiveProps() {
    this.getSourceStories();
  }

  getSourceStories() {
    if (this.state.posts) this.setState({posts: null});
    const sourceIdPath = this.props.history.location.pathname;
    const url = '/api/' + sourceIdPath;
    fetch(url).then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => this.setState({ title: data.title, posts: data.posts }))
    .catch(error => this.showAlertForError());
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
    .catch(error => this.showAlertForError())
  }

  addNewSaved(story, event) {
    const button = event.currentTarget;
    const url = '/api/saved';
    const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(story)
    }
    fetch(url, options).then(fetchStatusHandler)
    .then(response => buttonWasClicked(button))
    .catch(error => this.showAlertForError())
  }


  render() {
    return(
      <div className="d-flex flex-column margin-fix stories">
      <nav aria-label="breadcrumb" role="navigation">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">{this.state.title}</li>
        </ol>
      </nav>
        <div className="row">
          {
            !this.state.posts ? (<Loader />) : (
              this.state.posts.length > 0 ? this.renderStories() : (<NoContent text="No stories for this source" />)
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
      htmlArray.push(<Story key={i} story={posts[i]} addNewFavorite={this.addNewFavorite} addNewSaved={this.addNewSaved} />);
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
            <button onClick={props.addNewSaved.bind(this, props.story)} className="btn btn-light btn-card" title="Save for later"><i className="icon ion-ios-book" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Source;
