import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Root from "containers/Root";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Root/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("snapshot", () => {
  const component = renderer.create(
    <Root/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
