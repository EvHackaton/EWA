import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const DisplayResults = ({ barCode, queryResult }) => {
  if (!queryResult) return <span>Waiting for response...</span>
  else {
    const { name, instructions } = queryResult;
    return (
      <Fragment>
        {queryResult && (
          <div className="Results">
            <h1>{name}</h1>
            <ul>
            {instructions.map(instruction => (
              <li kay={instruction.instuctionId}>
                {instruction.itemName} (material type: {instruction.material})
              </li>
            ))}
            </ul>
            <span>Barcode number: {barCode}</span>
          </div>
        )}
      </Fragment>
    );
  }
}

DisplayResults.propTypes = {
  barCode: PropTypes.string.isRequired,
  queryResult: PropTypes.object,
};

DisplayResults.defaultProps = {
  queryResult: null,
};

