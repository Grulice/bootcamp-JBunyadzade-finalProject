import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  ButtonPrimary,
  Button,
  Input,
  InputLabel,
  TextArea,
} from "../../../commonElements";
import * as fetcher from "../../../fetcher";
import {
  PageForm,
  InfoCol,
  InputContainer,
  customStyles,
  InfoColUpload,
  ImgPreviewsContainer,
  ImgPreviewBox,
  ButtonBox,
} from "./AdminEditCoin_style";

const SERVER_BASEURL = "http://localhost:3001";

class AdminEditCoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectQualityContents: [
        { value: "", label: "Any" },
        { value: "BU", label: "BU" },
        { value: "New", label: "New" },
        { value: "Old", label: "Old" },
      ],
      selectCountryContents: [],
      selectMetalContents: [],
      selectCategoryContents: [],
      //current select values
      countrySelect: "",
      metalSelect: "",
      qualitySelect: "",
      categorySelect: "",
      //inputs
      coinNameInp: "",
      faceValueInp: "",
      issueYearInp: "",
      priceInp: "",
      shortDescInp: "",
      longDescInp: "",
      weightInp: "",

      addSuccess: false,

      coinNotFound: false,

      // this will be appended to <img> sources every time the image is changed
      // the browser is forced to reload image (because the url has changed)
      // This is a total bodge job. I'm sorry ;(
      imageReloadForcer: Date.now(),
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.populateSelects().then((_) => {
      fetcher
        .getCoinInfo(this.props.match.params.id)
        .then((result) => this.populateFormValues(result))
        .catch((_) => this.setState({ coinNotFound: true }));
    });
  }

  handleCountryChange = (selected) =>
    this.setState({ countrySelect: selected.value });

  handleMetalChange = (selected) =>
    this.setState({ metalSelect: selected.value });

  handleQualityChange = (selected) =>
    this.setState({ qualitySelect: selected.value });

  handleCategoryChange = (selected) =>
    this.setState({ categorySelect: selected.value });

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const targetId = this.props.match.params.id;

    const {
      countrySelect,
      metalSelect,
      qualitySelect,
      categorySelect,
      coinNameInp,
      faceValueInp,
      issueYearInp,
      priceInp,
      shortDescInp,
      longDescInp,
      weightInp,
    } = this.state;

    const formData = new FormData();
    if (form.obverseImage.files[0])
      formData.append("obv_img", form.obverseImage.files[0], `${targetId}.png`);

    if (form.reverseImage.files[0])
      formData.append(
        "rev_img",
        form.reverseImage.files[0],
        `${targetId}r.png`
      );
    formData.append("country_id", countrySelect);
    formData.append("material_id", metalSelect);
    formData.append("quality", qualitySelect);
    formData.append("denomination", faceValueInp);
    formData.append("issue_year", issueYearInp);
    formData.append("weight", weightInp);
    formData.append("price", priceInp);
    formData.append("category_id", categorySelect);
    formData.append("name", coinNameInp);
    formData.append("desc_short", shortDescInp);
    formData.append("desc_long", longDescInp);

    fetcher.putCoin(this.props.token, formData, targetId).then((success) => {
      if (success) {
        alert("Coin info updated successfully!");
        this.setState(
          { addSuccess: true, imageReloadForcer: Date.now() },
          () => {
            setTimeout(() => {
              this.setState({ addSuccess: false });
            }, 2000);
          }
        );
      } else {
        alert("Something went wrong...");
      }
    });
  };

  populateSelects = () => {
    return Promise.all([
      fetcher.getCountries(),
      fetcher.getMetals(),
      fetcher.getCategories(),
    ]).then((results) => {
      // const anyElem = { value: "", label: "Any" };
      let mappedCountries = results[0].map((country) => {
        return { value: country.id, label: country.country };
      });
      let mappedMetals = results[1].map((material) => {
        return { value: material.id, label: material.material };
      });
      let mappedCategories = results[2].map((category) => {
        return { value: category.id, label: category.category };
      });

      // add the "Any" item to selects
      // mappedCountries.unshift(anyElem);
      // mappedMetals.unshift(anyElem);
      this.setState({
        selectCountryContents: mappedCountries,
        selectMetalContents: mappedMetals,
        selectCategoryContents: mappedCategories,
      });
    });
  };

  populateFormValues = (servData) => {
    const coinInfo = servData[0];
    console.log(coinInfo);
    this.setState({
      countrySelect: coinInfo.country_id,
      metalSelect: coinInfo.material_id,
      qualitySelect: coinInfo.quality,
      categorySelect: coinInfo.category_id,
      coinNameInp: coinInfo.name || "",
      faceValueInp: coinInfo.denomination || "",
      issueYearInp: coinInfo.issue_year || "",
      priceInp: coinInfo.price || "",
      shortDescInp: coinInfo.desc_short || "",
      longDescInp: coinInfo.desc_long || "",
      weightInp: coinInfo.weight || "",
    });
  };

  render() {
    const {
      selectQualityContents,
      selectCountryContents,
      selectMetalContents,
      selectCategoryContents,
      countrySelect,
      metalSelect,
      qualitySelect,
      categorySelect,
      coinNameInp,
      faceValueInp,
      issueYearInp,
      priceInp,
      shortDescInp,
      longDescInp,
      weightInp,
      coinNotFound,
      addSuccess,
      imageReloadForcer,
    } = this.state;
    return (
      <PageForm onSubmit={this.handleSubmit}>
        {coinNotFound ? (
          "Coin not found. Maybe it was already deleted?"
        ) : (
          <>
            <InfoCol>
              <InputContainer>
                <InputLabel>Coin name</InputLabel>
                <Input
                  type="text"
                  value={coinNameInp}
                  name="coinNameInp"
                  onChange={this.onInputChange}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Face value</InputLabel>
                <Input
                  type="text"
                  value={faceValueInp}
                  name="faceValueInp"
                  onChange={this.onInputChange}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Year of issue</InputLabel>
                <Input
                  type="number"
                  step="1"
                  value={issueYearInp}
                  name="issueYearInp"
                  onChange={this.onInputChange}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Price</InputLabel>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={priceInp}
                  name="priceInp"
                  onChange={this.onInputChange}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Country</InputLabel>
                <Select
                  styles={customStyles}
                  options={selectCountryContents}
                  onChange={this.handleCountryChange}
                  value={selectCountryContents.find(
                    (select) => select.value === countrySelect
                  )}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Metal</InputLabel>
                <Select
                  styles={customStyles}
                  options={selectMetalContents}
                  onChange={this.handleMetalChange}
                  value={selectMetalContents.find(
                    (select) => select.value === metalSelect
                  )}
                />
              </InputContainer>
            </InfoCol>
            <InfoCol>
              <InputContainer>
                <InputLabel>Short description</InputLabel>
                <TextArea
                  value={shortDescInp}
                  name="shortDescInp"
                  onChange={this.onInputChange}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Long description</InputLabel>
                <TextArea
                  value={longDescInp}
                  name="longDescInp"
                  onChange={this.onInputChange}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Quality of the coin</InputLabel>
                <Select
                  styles={customStyles}
                  options={selectQualityContents}
                  onChange={this.handleQualityChange}
                  value={selectQualityContents.find(
                    (select) => select.value === qualitySelect
                  )}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Coin Category</InputLabel>
                <Select
                  styles={customStyles}
                  options={selectCategoryContents}
                  onChange={this.handleCategoryChange}
                  value={selectCategoryContents.find(
                    (select) => select.value === categorySelect
                  )}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Weight</InputLabel>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={weightInp}
                  name="weightInp"
                  onChange={this.onInputChange}
                />
              </InputContainer>
            </InfoCol>
            <InfoColUpload>
              <div>
                <InputContainer>
                  <InputLabel>Obverse image</InputLabel>
                  <Input type="file" name="obverseImage" />
                </InputContainer>

                <InputContainer>
                  <InputLabel>Reverse image</InputLabel>
                  <Input type="file" name="reverseImage" />
                </InputContainer>

                <ImgPreviewsContainer>
                  <ImgPreviewBox>
                    <InputLabel>Current obverse image</InputLabel>
                    <img
                      src={`/api/image/${this.props.match.params.id}.png?${imageReloadForcer}`}
                      alt=""
                    />
                  </ImgPreviewBox>

                  <ImgPreviewBox>
                    <InputLabel>Current reverse image</InputLabel>
                    <img
                      src={`/api/image/${this.props.match.params.id}r.png?${imageReloadForcer}`}
                      alt=""
                    />
                  </ImgPreviewBox>
                </ImgPreviewsContainer>
              </div>
              <ButtonBox>
                <ButtonPrimary type="submit">
                  {addSuccess ? "Success!" : "Save"}
                </ButtonPrimary>
                <Link to="/admin/coinlist">
                  <Button type="button">Cancel</Button>
                </Link>
              </ButtonBox>
            </InfoColUpload>
          </>
        )}
      </PageForm>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps)(AdminEditCoin);
