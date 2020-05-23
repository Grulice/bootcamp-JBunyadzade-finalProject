import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  PlaqueContainer,
  ImageContainer,
  DescContainer,
  CoinLink,
  CoinDesc,
} from "./SearchResultPlaque_style";

const SERVER_BASEURL = "http://localhost:3001";

class SearchResultPlaque extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { coinId, name, shortDesc } = this.props;
    return (
      <PlaqueContainer>
        <ImageContainer>
          <Link to={`/coin/${coinId}`}>
            <img src={`${SERVER_BASEURL}/image/${coinId}.png`} alt="" />
          </Link>
        </ImageContainer>
        <DescContainer>
          <CoinLink to={`/coin/${coinId}`}>{name}</CoinLink>
          <CoinDesc>{shortDesc}</CoinDesc>
        </DescContainer>
      </PlaqueContainer>
    );
  }
}

export default SearchResultPlaque;
