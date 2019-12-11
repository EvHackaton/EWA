import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const DisplayResults = ({ barCode, queryResult }) => {
  if (!queryResult) return <div>Waiting for response...</div>
  else {
    const { name, instructions } = queryResult;
    return (
      <Fragment>
        {queryResult && (
          <div className="Results">
            <h1>{name}</h1>
            <p>Barcode number: {barCode}</p>
            <ul>
            {instructions.map(({
              itemName,
              category: {
                binColorRgb,
                description,
                name: categoryName,
              },
            }, idx) => (
              <li key={`instruction-${idx}`}>
                <p>{itemName}</p>
                <p>{categoryName}</p>
                <p>{description}</p>
              </li>
            ))}
            </ul>
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

