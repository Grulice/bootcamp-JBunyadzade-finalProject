import React, { Component } from "react";
import { connect } from "react-redux";
import {
  DictContainer,
  TableContainer,
  MainTable,
  InputBox,
  AddButton,
} from "./AdminDictBrowser_style";
import { Input } from "../../commonElements";
import * as fetcher from "../../fetcher";

class AdminDictBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionary: [],
      colName: "",
      inputVal: "",
      addSuccess: false,
    };

    this.btnTimeoutId = 0;
  }

  componentDidMount() {
    this.populateDictionary();
  }

  componentWillUnmount() {
    clearTimeout(this.btnTimeoutId);
  }

  handleInputChange = (e) => this.setState({ inputVal: e.target.value });
  handleAddClick = () => {
    const { tableName, token } = this.props;
    const { colName, inputVal } = this.state;
    const newEntry = {};
    newEntry[colName] = inputVal;
    fetcher.postToDict(tableName, token, newEntry).then((success) => {
      if (success) {
        this.populateDictionary();
        this.setState({ addSuccess: true }, () => {
          this.btnTimeoutId = setTimeout(() => {
            this.setState({ addSuccess: false });
          }, 2000);
        });
      } else {
        alert("Something went wrong...");
      }
    });
  };

  populateDictionary = () => {
    const { tableName } = this.props;
    fetcher.getDict(tableName).then((result) =>
      this.setState(
        {
          dictionary: result,
          colName: Object.keys(result[0])[1],
        },
        () => console.log(this.state)
      )
    );
  };
  render() {
    const { dictionary, colName, inputVal, addSuccess } = this.state;
    return (
      <DictContainer>
        <TableContainer>
          <MainTable>
            <tbody>
              <tr>
                <th>ID</th>
                <th>{colName}</th>
              </tr>
              {dictionary.map((entry) => (
                <tr key={entry.id}>
                  <td className="id-col">{entry.id}</td>
                  <td className="country-col">{entry[colName]}</td>
                </tr>
              ))}
            </tbody>
          </MainTable>
        </TableContainer>
        <InputBox>
          <AddButton onClick={this.handleAddClick}>
            {addSuccess ? "✓" : "+"}
          </AddButton>
          <Input
            style={{ flexGrow: 1 }}
            onChange={this.handleInputChange}
            value={inputVal}
          />
        </InputBox>
      </DictContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps)(AdminDictBrowser);
