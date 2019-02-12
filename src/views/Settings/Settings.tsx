import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Input } from "reactstrap";
import {IState} from "../../store/state";
import { Dispatch } from "redux";

interface Props {
  playerName: string;
  onNameChange: (e:ChangeEvent<HTMLInputElement>) => void;
  link: (ref: string) => void;
}

class Settings extends Component<Props> {
  render() {
    return (
      <Container style={{color: "white"}}>
        <div className="text-center">
          <h1>Settings</h1>
        </div>
        <Row>
          <Col>Player Name</Col>
          <Col><Input type="text" value={this.props.playerName} onChange={this.props.onNameChange}/></Col>
        </Row>
        <Row>
          <Col>Music:</Col>
          <Col>Setting goes here</Col>
        </Row>
        <Row>
          <Col>Sound Effects</Col>
          <Col>Setting goes here</Col>
        </Row>
        <Button color="light" onClick={() => this.props.link("Lobby")}>
          Return Home
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = (state:IState) => {
  return {
    playerName: state.playerName
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    onNameChange: (e:ChangeEvent<HTMLInputElement>) => dispatch({type: "UPDATE_PLAYER_NAME", value: e.target.value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
