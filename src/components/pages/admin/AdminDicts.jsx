import React, { Component } from "react";
import { PageContainer, DictCol } from "./AdminDicts_style";
import AdminDictBrowser from "../../UIComponents/AdminDictBrowser";

class AdminDicts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <PageContainer>
        <DictCol>
          <h2>Countries</h2>
          <AdminDictBrowser tableName="countries" />
        </DictCol>
        <DictCol>
          <h2>Categories</h2>
          <AdminDictBrowser tableName="categories" />
        </DictCol>
        <DictCol>
          <h2>Materials</h2>
          <AdminDictBrowser tableName="materials" />
        </DictCol>
      </PageContainer>
    );
  }
}

export default AdminDicts;
