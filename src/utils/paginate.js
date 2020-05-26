import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  const startNumber = (pageNumber - 1) * pageSize;

  return _(items)
    .slice(startNumber)
    .take(pageSize)
    .value();
}
