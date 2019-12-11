import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Glass from './images/glass.png';
import MetalPlastic from './images/metal-and-plastic.png';
import Mixed from './images/mixed.png';
import Paper from './images/paper.png';

const CategoryIcon = ({ category }) => {
  const imagesMapping = {
    1: Glass,
    2: MetalPlastic,
  };

  const categoryImage = imagesMapping[category] ? imagesMapping[category] : '';

  return (
    <img className="CategoryImage" src={categoryImage} />
  );
};

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
            <div className="List">
            {instructions.map(({
              itemName,
              category: {
                binColor,
                IdCategory,
                categoryDescription,
                categoryName,
              },
            }, idx) => (
              <div className="ListItem" key={`instruction-${idx}`}>
                <CategoryIcon category={IdCategory} />
                <div className="Description">
                  <h2>{itemName}</h2>
                  <p style={{color: binColor}}>{categoryName}</p>
                  <p className="DescriptionText">{categoryDescription}</p>
                </div>
              </div>
            ))}
            </div>
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

