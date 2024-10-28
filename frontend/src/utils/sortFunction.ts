/**
 * Sorts an array of objects based on a specified field and order.
 *
 * @template T - The type of objects in the array
 * @param {T[]} data - The array of objects to sort
 * @param {string} orderBy - The field name to sort by
 * @param {'asc' | 'desc'} order - The sort order ('asc' for ascending, 'desc' for descending)
 * @returns {T[]} A new sorted array
 *
 * @example
 * const data = [{name: 'B'}, {name: 'A'}];
 * const sorted = sortData(data, 'name', 'asc');
 * // Returns [{name: 'A'}, {name: 'B'}]
 */
export function sortData<T>(
  data: T[],
  orderBy: string,
  order: 'asc' | 'desc',
): T[] {
  return [...data].sort((a, b) => {
    let aValue = a[orderBy];
    let bValue = b[orderBy];

    if (orderBy === 'dateCreated') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toUpperCase().trim();
      bValue = bValue.toUpperCase().trim();
    }

    if (order === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
}
