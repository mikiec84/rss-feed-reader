import React from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom'


class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSources: false
    }
    this.toggleSidebarSources = this.toggleSidebarSources.bind(this);
  }

  toggleSidebarSources() {
    this.setState({showSources: !this.state.showSources});
  }


  render() {
    const classNames = this.state.showSources ? "sidebar sidebar-sources visible" : "sidebar sidebar-sources";
    return (
      <div>
        <div className="sidebar">
          <a className="navbar-brand" href="/">Feed Reader</a>
          <ul className="list-group">
            <li className="list-group-item item-category d-flex justify-content-center align-items-center">
              <span className="show-cursor" onClick={this.toggleSidebarSources.bind(this)}>
                <i className="icon ion-ios-list-outline" aria-hidden="true"></i>
                SOURCES
              </span>
            </li>
            <li className="list-group-item item-category d-flex justify-content-center align-items-center">
              <NavLink to="/saved">
                <i className="icon ion-ios-book-outline" aria-hidden="true"></i>
                SAVED
              </NavLink>
            </li>
            <li className="list-group-item item-category d-flex justify-content-center align-items-center">
              <NavLink to="/favorites">
                <i className="icon ion-ios-star-outline" aria-hidden="true"></i>
                FAVORITES
              </NavLink>
            </li>
          </ul>
        </div>
        <SourcesList sources={this.props.sources} classNames={classNames} />
      </div>
    )
  }
}


const SourcesList = (props) => {
  return(
    <div className={props.classNames}>
      <ul className="list-group">
        <li className="list-group-item item-source">
          <NavLink exact to="/">MANAGE SOURCES</NavLink>
        </li>
        {props.sources.map((item, index) => {
            return <li key={index} className="list-group-item item-source">
                     <NavLink to={`/source/${item.id}`}>{item.title}</NavLink>
                   </li>
          })}
      </ul>
    </div>
  )
}

export default Sidebar;
