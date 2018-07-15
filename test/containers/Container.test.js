import React from "react";
import ReactDOM from "react-dom";
import Container from "containers/Container";
import renderer from "react-test-renderer";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Container/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("snapshot", () => {
  const component = renderer.create(
    <Container/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
