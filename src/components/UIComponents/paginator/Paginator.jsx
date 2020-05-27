import React, { Component } from "react";
import PaginatorPageBar from "./PaginatorPageBar";
import Select from "react-select";
import { PaginatorMain, Page, PageSizeContainer } from "./Paginator_style";

const pageSizeOptions = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];
const DEFAULT_PAGE_SIZE = 10;

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: 0,
    border: "1px solid black",
    width: 100,
  }),
};

class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = { curPage: 1, pageAmount: 0, pageSize: DEFAULT_PAGE_SIZE };
  }

  incrementIndex = (e) => {
    const { totalCount } = this.props;
    const newPage =
      this.state.curPage + 1 > Math.ceil(totalCount / this.state.pageSize)
        ? Math.ceil(totalCount / this.state.pageSize)
        : this.state.curPage + 1;
    this.setState(
      { curPage: newPage },
      this.props.onChange(newPage, this.state.pageSize)
    );
  };

  decrementIndex = (e) => {
    const newPage = this.state.curPage - 1 < 1 ? 1 : this.state.curPage - 1;
    this.setState({ curPage: newPage }, () =>
      this.props.onChange(newPage, this.state.pageSize)
    );
  };

  handleChangePage = (selectedPage) => {
    this.setState({ curPage: selectedPage }, () =>
      this.props.onChange(this.state.curPage, this.state.pageSize)
    );
  };

  handlePageSizeChange = (selected) =>
    this.setState({ pageSize: selected.value }, () =>
      this.props.onChange(this.state.curPage, this.state.pageSize)
    );

  componentDidUpdate() {
    if (
      this.state.curPage >
      Math.ceil(this.props.totalCount / this.state.pageSize) + 1
    )
      this.setState({ curPage: 1 });
  }

  render() {
    const { pageSize } = this.state;
    return (
      <PaginatorMain>
        <PageSizeContainer>
          <Select
            styles={customSelectStyles}
            options={pageSizeOptions}
            onChange={this.handlePageSizeChange}
            defaultValue={{
              value: DEFAULT_PAGE_SIZE,
              label: DEFAULT_PAGE_SIZE,
            }}
          />
          Page size: &nbsp;
        </PageSizeContainer>
        <Page>{this.props.elems}</Page>
        <PaginatorPageBar
          pageAmount={Math.ceil(this.props.totalCount / pageSize)}
          onChange={this.handleChangePage}
          incrCallback={this.incrementIndex}
          decrCallback={this.decrementIndex}
          curSelectedPage={this.state.curPage}
        />
      </PaginatorMain>
    );
  }
}

export default Paginator;
