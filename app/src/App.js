import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./component/navbar/navbar";
import Home from "./component/home";
import Upload from "./component/upload";
import NotFound from "./component/notFound";

class App extends Component {
  state = { videos: [] };

  getVideos = async () => {
    try {
      const url = "http://localhost:5000/api/videos";
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getVideos();
  }
  render() {
    const menuList = [
      { label: "Videos", linkTo: "/" },
      { label: "Upload", linkTo: "/upload" }
    ];
    return (
      <div className="container">
        <NavBar brandName="shootsta" menuList={menuList} />
        <div className="content">
          <Switch>
            <Route path="/not-found" exact component={NotFound} />
            <Route path="/upload/" component={Upload} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
