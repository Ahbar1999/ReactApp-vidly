import React from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, selectedItem, handleGenre } =
    props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => handleGenre(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

// defining default properties so we dont have to pass them
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
