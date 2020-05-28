import React, { Component } from "react";
import * as fetcher from "../../fetcher";
import SearchResultPlaque from "../UIComponents/SearchResultPlaque";
import Paginator from "../UIComponents/paginator/Paginator";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      count: 10,
      searchResultData: [],
      searchCount: 0,
      searching: false,
    };
  }
  componentDidMount() {
    this.refreshSearch();
  }

  componentDidUpdate(prevProps) {
    const prevLoc = prevProps.location.search;
    const curLoc = this.props.location.search;
    if (prevLoc !== curLoc) {
      this.refreshSearch();
    }
  }

  refreshSearch = () => {
    const { offset, count } = this.state;
    const curLoc = this.props.location.search;
    this.setState({ searching: true }, () =>
      fetcher
        .getSearchResults(curLoc + `&offset=${offset}&count=${count}`)
        .then((result) =>
          this.setState({
            offset: 0,
            searchResultData: result.data,
            searchCount: result.count,
            searching: false,
          })
        )
    );
  };
  handlePaginatorChange = (pageNum, pageSize) => {
    this.setState(
      { offset: (pageNum - 1) * pageSize, count: pageSize },
      this.refreshSearch
    );
  };

  render() {
    const { searchResultData, searching } = this.state;
    return (
      <div>
        {searchResultData.length !== 0 ? (
          <Paginator
            elems={searchResultData.map((result) => (
              <SearchResultPlaque
                key={result.id}
                coinId={result.id}
                name={result.name}
                shortDesc={result.desc_short}
              />
            ))}
            totalCount={this.state.searchCount}
            onChange={this.handlePaginatorChange}
          />
        ) : (
          ""
        )}
        {searching ? <p>Searching...</p> : ""}
        {searchResultData.length === 0 && !searching ? <p>No results</p> : ""}
      </div>
    );
  }
}

export default SearchResults;
