import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "containers/AppContainer";
import renderer from "react-test-renderer";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AppContainer/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("snapshot", () => {
  const component = renderer.create(
    <AppContainer/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
