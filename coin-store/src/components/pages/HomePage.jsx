import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import * as fetcher from "../../fetcher";
import { InputLabel, ButtonTextSmall } from "../../commonElements";
import SearchResults from "./SearchResults";

import ArrowDown from "../UIComponents/img/arrow-down.svg";
import ArrowUp from "../UIComponents/img/arrow-up.svg";
import {
  PageContainer,
  SearchArea,
  SearchTextContainer,
  InputContainer,
  SearchInput,
  SearchButton,
  SearchAdvFilterContainer,
  SearchSelectsContainer,
  SearchSelect,
  customStyles,
  SearchPriceYearContainer,
  SearchPriceYearInput,
  CoinsArea,
  CategoriesContainer,
  CoinPlaque,
} from "./HomePage_style";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvSearch: false,
      selectQualityContents: [
        { value: "", label: "Any" },
        { value: "BU", label: "BU" },
        { value: "New", label: "New" },
        { value: "Old", label: "Old" },
      ],
      selectCountryContents: [],
      selectMetalContents: [],
      searchTextInp: "",
      countrySelect: "",
      metalSelect: "",
      qualitySelect: "",
      priceMinInp: "",
      priceMaxInp: "",
      yearMinInp: "",
      yearMaxInp: "",
    };
  }

  componentDidMount() {
    Promise.all([fetcher.getCountries(), fetcher.getMetals()]).then(
      (results) => {
        const anyElem = { value: "", label: "Any" };
        let mappedCountries = results[0].map((country) => {
          return { value: country.id, label: country.country };
        });
        let mappedMetals = results[1].map((material) => {
          return { value: material.id, label: material.material };
        });

        // add the "Any" item to selects
        mappedCountries.unshift(anyElem);
        mappedMetals.unshift(anyElem);
        this.setState({
          selectCountryContents: mappedCountries,
          selectMetalContents: mappedMetals,
        });
      }
    );
  }

  handleCountryChange = (selected) =>
    this.setState({ countrySelect: selected.value });

  handleMetalChange = (selected) =>
    this.setState({ metalSelect: selected.value });

  handleQualityChange = (selected) =>
    this.setState({ qualitySelect: selected.value });

  handlePriceMinChange = (e) => this.setState({ priceMinInp: e.target.value });
  handlePriceMaxChange = (e) => this.setState({ priceMaxInp: e.target.value });
  handleYearMinChange = (e) => this.setState({ yearMinInp: e.target.value });
  handleYearMaxChange = (e) => this.setState({ yearMaxInp: e.target.value });

  toggleAdvSearch = (e) =>
    this.setState({ showAdvSearch: !this.state.showAdvSearch });

  handleSearchTextChange = (e) =>
    this.setState({ searchTextInp: e.target.value });

  compileSearchLink = (
    searchTextInp,
    categoryId,
    countrySelect,
    metalSelect,
    qualitySelect,
    priceMinInp,
    priceMaxInp,
    yearMinInp,
    yearMaxInp
  ) => {
    return `/search?searchText=${searchTextInp}&categoryId=${categoryId}&countryId=${countrySelect}&materialId=${metalSelect}&quality=${qualitySelect}&pricemin=${priceMinInp}&pricemax=${priceMaxInp}&yearmin=${yearMinInp}&yearmax=${yearMaxInp}`;
  };

  render() {
    const {
      showAdvSearch,
      selectQualityContents,
      selectCountryContents,
      selectMetalContents,
      searchTextInp,
      countrySelect,
      metalSelect,
      qualitySelect,
      priceMinInp,
      priceMaxInp,
      yearMinInp,
      yearMaxInp,
    } = this.state;
    const searchLink = this.compileSearchLink(
      searchTextInp,
      "",
      countrySelect,
      metalSelect,
      qualitySelect,
      priceMinInp,
      priceMaxInp,
      yearMinInp,
      yearMaxInp
    );
    return (
      <PageContainer>
        <SearchArea>
          <SearchTextContainer>
            <InputLabel>Search</InputLabel>
            <InputContainer>
              <SearchInput
                type="text"
                value={searchTextInp}
                onChange={this.handleSearchTextChange}
              />
              <Link to={searchLink}>
                <SearchButton>Search</SearchButton>
              </Link>
            </InputContainer>
          </SearchTextContainer>
          <ButtonTextSmall
            style={{ textDecoration: "underline", marginRight: 4 }}
            onClick={this.toggleAdvSearch}
          >
            Advanced Filter
          </ButtonTextSmall>
          <img src={showAdvSearch ? ArrowUp : ArrowDown} alt="" />
          {showAdvSearch ? (
            <SearchAdvFilterContainer>
              <SearchSelectsContainer>
                <div>
                  <InputLabel>Issuing country</InputLabel>
                  <SearchSelect
                    styles={customStyles}
                    options={selectCountryContents}
                    onChange={this.handleCountryChange}
                  />
                </div>
                <div>
                  {" "}
                  <InputLabel>Metal</InputLabel>
                  <SearchSelect
                    styles={customStyles}
                    options={selectMetalContents}
                    onChange={this.handleMetalChange}
                  />
                </div>
                <div>
                  {" "}
                  <InputLabel>Quality of the coin</InputLabel>
                  <SearchSelect
                    styles={customStyles}
                    options={selectQualityContents}
                    onChange={this.handleQualityChange}
                  />
                </div>
              </SearchSelectsContainer>
              <SearchPriceYearContainer>
                <div>
                  <InputLabel>Price</InputLabel>
                  from
                  <SearchPriceYearInput onChange={this.handlePriceMinChange} />
                  to
                  <SearchPriceYearInput onChange={this.handlePriceMaxChange} />
                </div>
                <div>
                  <InputLabel>Year of issue</InputLabel>
                  from
                  <SearchPriceYearInput onChange={this.handleYearMinChange} />
                  to
                  <SearchPriceYearInput onChange={this.handleYearMaxChange} />
                </div>
              </SearchPriceYearContainer>
            </SearchAdvFilterContainer>
          ) : (
            <></>
          )}
        </SearchArea>
        <CoinsArea>
          <Route path="/search" component={SearchResults} />
          <Route exact path="/">
            <CategoriesContainer>
              <CoinPlaque>
                <h2>Bullion Coins</h2>
                <Link
                  to={this.compileSearchLink(
                    "",
                    "1",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                  )}
                >
                  <ButtonTextSmall>Show all ></ButtonTextSmall>
                  <img src="./img/dong.png" alt="" />
                </Link>
              </CoinPlaque>
              <CoinPlaque>
                <h2>Exclusive Coins</h2>
                <Link
                  to={this.compileSearchLink(
                    "",
                    "2",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                  )}
                >
                  <ButtonTextSmall>Show all ></ButtonTextSmall>
                  <img src="./img/isk.png" alt="" />
                </Link>
              </CoinPlaque>
              <CoinPlaque>
                <h2>Commemorative Coins</h2>
                <Link
                  to={this.compileSearchLink(
                    "",
                    "3",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                  )}
                >
                  <ButtonTextSmall>Show all ></ButtonTextSmall>
                  <img src="./img/looney.png" alt="" />
                </Link>
              </CoinPlaque>
            </CategoriesContainer>
          </Route>
        </CoinsArea>
      </PageContainer>
    );
  }
}

export default HomePage;
