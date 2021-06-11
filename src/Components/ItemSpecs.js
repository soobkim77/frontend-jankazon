import React from "react";

const ItemSpecs = props => {
  return (
    <div className="ui segment">
      <div className="ui two column centered grid">
        <div className="row">
          <div className="eight wide column">
            <img
              alt="oh no!"
              className="ui large rectangular image bordered"
              src={props.item.imageUrl}
            />
          </div>
          <div className="four wide column">
            <h2>{props.item.name}</h2>
            <p>
              <strong>
                Price: {props.item.price}
              </strong>
              <br />
              <strong>
                Condition: {props.item.condition}
              </strong>
              <br />
              <strong>Description: </strong>
              {props.item.description}
              <br />
              <strong>
                Category: {props.item.category}
              </strong>
            </p>
            {props.myPage ?
            <button
              className="ui button fluid"
              onClick={() => props.editItem()}
            >
              Edit Item
            </button>
            :
            <button
              className="ui button fluid"
              onClick={(e) => props.buy(e, props.item)}
            >
              Buy Item
            </button>}
            <br />
            <button
              className="ui button fluid"
              onClick={() => props.goBack()}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSpecs;
