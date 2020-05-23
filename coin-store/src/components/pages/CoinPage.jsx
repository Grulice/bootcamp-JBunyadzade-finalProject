import React, { Component } from "react";
import { ButtonTextSmall } from "../../commonElements";
import AddToCart from "../UIComponents/cart/AddToCart";
import * as fetcher from "../../fetcher";
import { withRouter } from "react-router-dom";
import {
  PageContainer,
  ImagesContainer,
  DescContainer,
  LinkBox,
  BuyBox,
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
    };
  }

  componentDidMount() {
    fetcher.getCoinInfo(this.props.match.params.id).then((result) =>
      this.setState(
        {
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
        },
        () => console.log(this.state)
      )
    );
  }

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
    } = this.state;
    const { params } = this.props.match;
    return (
      <PageContainer>
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
            <ButtonTextSmall onClick={this.props.history.goBack}>
              Back to the list
            </ButtonTextSmall>
          </LinkBox>
        </DescContainer>
        <BuyBox>
          <AddToCart itemId={params.id} itemPrice={price} />
        </BuyBox>
      </PageContainer>
    );
  }
}

export default withRouter(CoinPage);
