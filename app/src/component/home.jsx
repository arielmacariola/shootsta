import React, { Component } from "react";
import axios from "axios";
import { apiHost } from "../utils/restAPI";
import VideoList from "./videoList";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

class Home extends Component {
  state = {
    videos: [],
    pageSize: 5,
    currentPage: 1
  };

  getPagedData = () => {
    const { pageSize, currentPage, videos: allVideos } = this.state;

    const videos = paginate(allVideos, currentPage, pageSize);

    return { totalCount: allVideos.length, data: videos };
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  componentDidMount = () => {
    let data = {};

    // Fetch all videos
    axios
      .get(apiHost + "/api/videos")
      .then(response => {
        data = response.data;

        this.setState({
          videos: data
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  render() {
    const { pageSize, currentPage } = this.state;

    const { totalCount, data: videos } = this.getPagedData();

    return (
      <div>
        <h2 className="page-title">Video Library</h2>
        {totalCount !== 0 ? <p>All {totalCount} videos</p> : ""}
        {totalCount === 0 ? (
          <div className="alert alert-info alert-no-video" role="alert">
            There's no video available.
          </div>
        ) : (
          ""
        )}
        <VideoList videos={videos} />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Home;
