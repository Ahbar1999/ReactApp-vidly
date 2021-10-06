import React from "react";

class TableHeader extends React.Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    // if the category is same then reverse the order
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    // else change the path/category and set the order to ascending
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    // Now raise the onSort method and pass the sortColumn object
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    // if this is not the currently active column then dont render the icon
    if (column.path !== this.props.sortColumn.path) return null;

    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path ? column.path : column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
