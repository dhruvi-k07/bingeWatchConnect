import React, { Component } from "react";

import {
  Card,
  CardHeader,
  CardText,
  RaisedButton,
} from "material-ui";
import {
  List,
  ListItem,
  Divider,
  Avatar,
  IconButton,
} from "material-ui";

import FontIcon from "material-ui/FontIcon";

class HomeFollow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: window.data.auth.suggestions,
    };
  }
  removeItem(e) {
    var el = this.findAncestor(e.target, "follow-item");
    if (el) {
      el.className = "animated fadeOutRight";
      setTimeout(function () {
        el.parentNode.removeChild(el);
      }, 1000);
    }
  }
  findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

  render() {
    const listSuggestions = this.state.suggestions.map((s) => (
      <div key={s.name} className="follow-item">
        <ListItem
          hoverColor="transparent"
          leftAvatar={<Avatar src={s.avatar} />}
          rightIconButton={
            <IconButton onClick={this.removeItem.bind(this)}>
              <FontIcon className="material-icons">close</FontIcon>
            </IconButton>
          }
          primaryText={
            <div className="list-primary-text">
              <span>{s.name}</span>
              <small>@{s.address}</small>
            </div>
          }
          secondaryText={<RaisedButton label="follow" primary={true} />}
          secondaryTextLines={2}
        />
        <Divider />{" "}
      </div>
    ));
    return (
      <Card zDepth={1} className="sidebar-component" initiallyExpanded={true}>
        <CardHeader
          className="card-header"
          title={<h2>Follow now</h2>}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true} className="card-text">
          <List>{listSuggestions}</List>
        </CardText>
      </Card>
    );
  }
}

export default HomeFollow;
