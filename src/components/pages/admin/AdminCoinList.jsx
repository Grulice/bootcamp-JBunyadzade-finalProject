import React, { Component } from "react";
import { connect } from "react-redux";
import Paginator from "../../UIComponents/paginator/Paginator";
import AdminSearchResultPlaque from "../../UIComponents/AdminSearchResultPlaque";
import * as fetcher from "../../../fetcher";
import { Redirect } from "react-router-dom";
import { InputLabel, ButtonTextSmall } from "../../../commonElements";

import ArrowDown from "../../UIComponents/img/arrow-down.svg";
import ArrowUp from "../../UIComponents/img/arrow-up.svg";
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
  SearchPriceYearContainer,
  SearchPriceYearInput,
  CoinsArea,
  NewCoinContainer,
  NewCoinBtn,
} from "./AdminCoinList_style";

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: 0,
    border: "1px solid black",
    width: 300,
  }),
};

class AdminCoinList extends Component {
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
      offset: 0,
      count: 10,
      searchCount: 0,
      searchResultData: [],
      editTarget: 0,
      goToEdit: false,
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

  handlePaginatorChange = (pageNum, pageSize) => {
    this.setState(
      { offset: (pageNum - 1) * pageSize, count: pageSize },
      this.handleSearchRequest
    );
  };

  handleSearchRequest = (e) => {
    const {
      searchTextInp,
      countrySelect,
      metalSelect,
      qualitySelect,
      priceMinInp,
      priceMaxInp,
      yearMinInp,
      yearMaxInp,
    } = this.state;
    const compiledLink = this.compileSearchLink(
      searchTextInp,
      countrySelect,
      metalSelect,
      qualitySelect,
      priceMinInp,
      priceMaxInp,
      yearMinInp,
      yearMaxInp
    );
    const { offset, count } = this.state;
    fetcher
      .getSearchResults(compiledLink + `&offset=${offset}&count=${count}`)
      .then((result) =>
        this.setState({
          searchResultData: result.data,
          searchCount: result.count,
        })
      );
  };

  handleNewCoin = (e) => {
    fetcher
      .createCoin(this.props.token)
      .then((result) =>
        this.setState({ editTarget: result.insertId, goToEdit: true })
      );
  };

  compileSearchLink = (
    searchTextInp,
    countrySelect,
    metalSelect,
    qualitySelect,
    priceMinInp,
    priceMaxInp,
    yearMinInp,
    yearMaxInp
  ) => {
    return `?searchText=${searchTextInp}&countryId=${countrySelect}&materialId=${metalSelect}&quality=${qualitySelect}&pricemin=${priceMinInp}&pricemax=${priceMaxInp}&yearmin=${yearMinInp}&yearmax=${yearMaxInp}`;
  };

  redirectToEdit = (id) => {
    this.setState({ editTarget: id, goToEdit: true });
  };

  render() {
    const {
      editTarget,
      goToEdit,
      showAdvSearch,
      selectQualityContents,
      selectCountryContents,
      selectMetalContents,
      searchResultData,
      searchTextInp,
    } = this.state;

    return (
      <PageContainer>
        {goToEdit ? <Redirect to={`/admin/editcoin/${editTarget}`} /> : ""}
        <SearchArea>
          <SearchTextContainer>
            <InputLabel>Search</InputLabel>
            <InputContainer>
              <SearchInput
                type="text"
                value={searchTextInp}
                onChange={this.handleSearchTextChange}
              />
              <SearchButton onClick={this.handleSearchRequest}>
                Search
              </SearchButton>
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
          <NewCoinContainer>
            <NewCoinBtn onClick={this.handleNewCoin}>+</NewCoinBtn>
            Add a new coin
          </NewCoinContainer>
          {searchResultData.length !== 0 ? (
            <Paginator
              elems={
                <>
                  {searchResultData.map((result) => (
                    <AdminSearchResultPlaque
                      key={result.id}
                      coinId={result.id}
                      name={result.name}
                      shortDesc={result.desc_short}
                      views={result.views}
                      redirectCB={this.redirectToEdit}
                    />
                  ))}
                </>
              }
              totalCount={this.state.searchCount}
              onChange={this.handlePaginatorChange}
            />
          ) : (
            ""
          )}
        </CoinsArea>
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps)(AdminCoinList);
