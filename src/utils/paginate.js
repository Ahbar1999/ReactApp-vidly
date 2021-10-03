import _ from "lodash";

// a simple method for getting appropriate items for a page number and a page size
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
