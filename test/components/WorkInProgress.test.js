import React from "react";
import ReactDOM from "react-dom";
import WIP from "components/MenuBar/MenuBar";
import renderer from "react-test-renderer";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<WIP/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("snapshot", () => {
  const component = renderer.create(
    <WIP/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
