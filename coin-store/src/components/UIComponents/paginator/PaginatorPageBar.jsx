import React, { Component } from "react";
import PaginatorButton from "./PaginatorButton";
import { MainBar, IncDecButton } from "./PaginatorPageBar_style";

class PaginatorPageBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickHandler = (btnNum) => {
    this.props.onChange(btnNum);
  };

  getButton = (pageNum) => {
    return (
      <PaginatorButton
        key={pageNum} // for React's internal engine
        isSelected={this.props.curSelectedPage === pageNum ? true : false}
        buttonNum={pageNum}
        handleBtnClick={this.clickHandler}
      />
    );
  };

  getPageNumButtons = () => {
    let btns = [];
    const { pageAmount, curSelectedPage } = this.props;

    const lastPageButton = (
      <React.Fragment key="btnFirstWrapper">
        &nbsp; ... &nbsp;
        {this.getButton(pageAmount)}
      </React.Fragment>
    );

    const firstPageButton = (
      <React.Fragment key="btnLastWrapper">
        {this.getButton(1)}
        ... &nbsp;
      </React.Fragment>
    );

    const distToLastPage = pageAmount - curSelectedPage;
    const distToFirstPage = curSelectedPage - 1;

    const neighborhoodButtons = [];
    if (curSelectedPage - 2 >= 1)
      neighborhoodButtons.push(this.getButton(curSelectedPage - 2));
    if (curSelectedPage - 1 >= 1)
      neighborhoodButtons.push(this.getButton(curSelectedPage - 1));
    neighborhoodButtons.push(this.getButton(curSelectedPage));
    if (curSelectedPage + 1 <= pageAmount)
      neighborhoodButtons.push(this.getButton(curSelectedPage + 1));
    if (curSelectedPage + 2 <= pageAmount)
      neighborhoodButtons.push(this.getButton(curSelectedPage + 2));
    if (distToLastPage > 2) neighborhoodButtons.push(lastPageButton);
    if (distToFirstPage > 2) neighborhoodButtons.unshift(firstPageButton);
    btns.push([...neighborhoodButtons]);

    return btns;
  };

  render() {
    const btns = this.getPageNumButtons();
    return (
      <MainBar>
        <IncDecButton onClick={this.props.decrCallback}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5653 0.869513L1 6.43481L6.5653 12.0001"
              stroke="#833AE0"
            />
          </svg>
        </IncDecButton>
        {btns}
        <IncDecButton onClick={this.props.incrCallback}>
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.56531 0.869513L11.1306 6.43481L5.56531 12.0001"
              stroke="#833AE0"
            />
          </svg>
        </IncDecButton>
      </MainBar>
    );
  }
}

export default PaginatorPageBar;
