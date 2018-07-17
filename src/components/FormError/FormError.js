import React from "react";
import styles from "./FormError.scss";

export const FormError = ({ errors }) => {
  const message = errors ? Object.values(errors) : "";
  console.warn(message);
  return <div className={styles.formError}>{message}</div>;
};
