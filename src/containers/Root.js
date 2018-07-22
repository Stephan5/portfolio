import React from "react";
import AppContainer from "containers/AppContainer";
import { CookiesProvider } from "react-cookie";

export default function Root () {
  return (
    <CookiesProvider>
      <AppContainer/>
    </CookiesProvider>
  );
}
