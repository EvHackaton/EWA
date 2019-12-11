import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Batteries from './images/batteries.png';
import Bio from './images/bio.png';
import Construction from './images/construction.png';
import Clothes from './images/clothes.png';
import Electro from './images/electro.png';
import ExtraLarge from './images/extra-large.png';
import Glass from './images/glass.png';
import Green from './images/green.png';
import Meds from './images/meds.png';
import MetalPlastic from './images/metal-and-plastic.png';
import Mixed from './images/mixed.png';
import Other from './images/other.png';
import Paper from './images/paper.png';
import Tire from './images/tire.png';

const CategoryIcon = ({ categoryIcon }) => {
  const imagesMapping = {
    'batteries': Batteries,
    'bio': Bio,
    'clothes': Clothes,
    'construction': Construction,
    'electro': Electro,
    'extra-large': ExtraLarge,
    'glass': Glass,
    'green': Green,
    'meds': Meds,
    'metal-and-plastic': MetalPlastic,
    'mixed': Mixed,
    'other': Other,
    'paper': Paper,
    'tire': Tire,
  };

  const categoryImage = imagesMapping[categoryIcon] ? imagesMapping[categoryIcon] : '';

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
                categoryIcon,
                IdCategory,
                categoryDescription,
                categoryName,
              },
            }, idx) => (
              <div className="ListItem" key={`instruction-${idx}`}>
                <CategoryIcon categoryIcon={categoryIcon} />
                <div className="Description">
                  <h2>{itemName}</h2>
                  <p className="CategoryName" style={{color: binColor}}>{categoryName}</p>
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

