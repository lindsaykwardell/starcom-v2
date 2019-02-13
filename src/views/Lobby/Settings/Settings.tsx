import React, { ChangeEvent } from "react";
import { Col, FormGroup, Label, Input } from "reactstrap";

export default ({
  className,
  gameMode,
  setGameMode,
  gameName,
  setGameName,
  gridSize,
  setGridSize
}: {
  className: string;
  gameMode: string;
  setGameMode: (e: ChangeEvent<HTMLInputElement>) => void;
  gameName: string;
  setGameName: (e: ChangeEvent<HTMLInputElement>) => void;
  gridSize: number;
  setGridSize: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Col>
      <div className={className}>
        <h5>Settings</h5>
        <hr />
        <FormGroup>
          <Label>Game Mode</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            onChange={setGameMode}
            value={gameMode}
          >
            <option value="hotseat">Hotseat</option>
            <option value="online">Online</option>
            {/*<option value="computer">Vs. AI</option>*/}
          </Input>
        </FormGroup>
        {gameMode === "online" ? (
          <FormGroup>
            <Label for="gameName">Game Name</Label>
            <Input
              id="gameName"
              type="text"
              value={gameName}
              onChange={setGameName}
            />
          </FormGroup>
        ) : (
          ""
        )}
        <FormGroup>
          <Label>Grid Size</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            value={gridSize}
            onChange={setGridSize}
          >
            <option value="3">3 x 3</option>
            <option value="4">4 x 4</option>
            <option value="5">5 x 5</option>
          </Input>
        </FormGroup>
      </div>
    </Col>
  );
};
