import React, { Component } from "react";
import PropTypes from "prop-types";

export const DisplayResults = ({ barCode }) => (
  <span>{barCode}</span>
);

DisplayResults.propTypes = {
  barCode: PropTypes.string.isRequired,
};

