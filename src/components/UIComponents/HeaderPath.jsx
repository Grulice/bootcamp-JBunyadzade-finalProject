import React, { Component } from "react";
import { LinkSmall } from "../../commonElements";
import styled from "styled-components";

const BASE_URL = "http://localhost:3000";

const pathDict = {
  "/": "Homepage",
  "/login": "Login",
  "/signup": "Sign-up",
  "/admin": "Admin panel",
  "/search": "Search",
};

const PathLink = styled(LinkSmall)`
  color: lightgrey;
`;

class HeaderPath extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { path } = this.props;
    return (
      <div>
        {path.split("/").map((pathPart) => {
          return (
            <PathLink to={`${pathPart}`}>
              {pathDict["/" + pathPart] + " -> "}
            </PathLink>
          );
        })}
      </div>
    );
  }
}

export default HeaderPath;
