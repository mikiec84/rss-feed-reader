
export const fetchStatusHandler = (response) => {
  if (response.status >= 200 && response.status < 400) {
    return response;
  } else {
    throw new Error();
  }
}


export const showAlertForError = (thisComponent) => {
  thisComponent.setState({showAlertError: true});
  setInterval(() => {
    thisComponent.setState({showAlertError: false})
  }, 2000)
}


export const showAlertForURL = (thisComponent) => {
  thisComponent.setState({showAlertURL: true});
  setInterval(() => {
    thisComponent.setState({showAlertURL: false})
  }, 2000)
}

export const isURLValid = (urlString) => {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  return urlString.match(regex);
}


export const buttonWasClicked = (button) => {
  button.classList.add('btn-card-active');
}
