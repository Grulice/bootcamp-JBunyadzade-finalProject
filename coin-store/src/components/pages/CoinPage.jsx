import React, { Component } from "react";
import { ButtonTextSmall, LinkSmall } from "../../commonElements";
import AddToCart from "../UIComponents/cart/AddToCart";
import * as fetcher from "../../fetcher";
import { withRouter, Link } from "react-router-dom";
import {
  PageContainer,
  CoinInfoContainer,
  ImagesContainer,
  DescContainer,
  LinkBox,
  BuyBox,
  SimilarCoinsContainer,
  SimilarCoinsList,
} from "./CoinPage_style";

const SERVER_BASEURL = "http://localhost:3001";

class CoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      descShort: "",
      descLong: "",
      country: "",
      material: "",
      quality: "",
      denomination: "",
      year: 0,
      weight: 0,
      price: 0,
      similarCoins: [],
    };
  }

  componentDidMount() {
    this.refreshPage();
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.match.params.id;
    const { id } = this.props.match.params;
    if (prevId !== id) this.refreshPage();
  }

  refreshPage = () => {
    const { id } = this.props.match.params;
    fetcher.getCoinInfo(id).then((result) =>
      this.setState({
        name: result[0].name,
        descShort: result[0].desc_short,
        descLong: result[0].desc_long,
        country: result[0].country,
        material: result[0].material,
        quality: result[0].quality,
        denomination: result[0].denomination,
        year: result[0].issue_year,
        weight: result[0].weight,
        price: result[0].price,
      })
    );

    //get similar coins
    fetcher
      .getSimilarCoins(id)
      .then((result) => this.setState({ similarCoins: result }));

    // increase view count
    fetcher.postCoinView(id);
  };

  render() {
    const {
      name,
      descShort,
      descLong,
      country,
      material,
      quality,
      denomination,
      year,
      weight,
      price,
      similarCoins,
    } = this.state;
    const { params } = this.props.match;
    return (
      <PageContainer>
        <CoinInfoContainer>
          <ImagesContainer>
            <img src={`${SERVER_BASEURL}/image/${params.id}.png`} alt="" />{" "}
            <img src={`${SERVER_BASEURL}/image/${params.id}r.png`} alt="" />{" "}
          </ImagesContainer>
          <DescContainer>
            <h2>{name}</h2>
            <p>{descShort}</p>
            {descLong.split(/\r?\n\r?\n/).map((descParagraph, idx) => (
              <p key={idx}>{descParagraph}</p>
            ))}
            <table>
              <tbody>
                <tr>
                  <td>Issuing Country</td>
                  <td>{country}</td>
                </tr>
                <tr>
                  <td>Composition</td>
                  <td>{material}</td>
                </tr>
                <tr>
                  <td>Quality</td>
                  <td>{quality}</td>
                </tr>
                <tr>
                  <td>Denomination</td>
                  <td>{denomination}</td>
                </tr>
                <tr>
                  <td>Year</td>
                  <td>{year}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{weight}&nbsp;g</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{price}$</td>
                </tr>
              </tbody>
            </table>

            <LinkBox>
              <LinkSmall to="/search?searchText=&categoryId=&countryId=&materialId=&quality=&pricemin=&pricemax=&yearmin=&yearmax=">
                Back to the list
              </LinkSmall>
            </LinkBox>
          </DescContainer>
        </CoinInfoContainer>
        <SimilarCoinsContainer>
          <h3>Similar coins</h3>
          <SimilarCoinsList>
            {similarCoins.map((coin) => (
              <li key={coin.id}>
                <Link to={`/coin/${coin.id}`}>
                  <img
                    src={`${SERVER_BASEURL}/image/${coin.id}.png`}
                    alt={coin.name}
                  />
                  <ButtonTextSmall>{coin.name}</ButtonTextSmall>
                </Link>
              </li>
            ))}
          </SimilarCoinsList>
        </SimilarCoinsContainer>
        <BuyBox>
          <AddToCart itemId={params.id} itemPrice={price} />
        </BuyBox>
      </PageContainer>
    );
  }
}

export default withRouter(CoinPage);
