import React from 'react'
import {Button} from "reactstrap";
import firebase from "../../../config/firebase";

export default ({link, logout}:{link: (ref:string) => void, logout: () => void}) => {
  return (
    <div
      style={{
        color: "white",
        position: "absolute",
        top: "15px",
        right: "15px"
      }}
    >
      {firebase.auth().currentUser.displayName}
      <Button
        className="ml-3"
        color="light"
        onClick={() => link("Settings")}
      >
        Settings
            </Button>
      <Button
        className="ml-3"
        color="dark"
        onClick={logout}
      >
        Log Out
            </Button>
    </div>
  )
}
