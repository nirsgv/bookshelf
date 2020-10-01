export const getAllItems = () => {
  return fetch(window.location.origin + '/api/books').then((response) =>
    response.json()
  );
};

export const removeItemRemote = ({ id, token }) => {
  return fetch(window.location.origin + '/api/remove/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => getAllItems());
};

export const purchaseItem = ({ id, token }) => {
  return fetch(window.location.origin + '/api/purchase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, token }),
  })
    .then((response) => response.json())
    .then((data) => getAllItems());
};

export const editItemRemote = (itemData) => {
  return fetch(window.location.origin + '/api/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${itemData.token}`,
    },
    body: JSON.stringify(itemData),
  })
    .then((response) => response.json())
    .then((data) => {
      return getAllItems();
    });
};

export const getBookById = (bookId) => {
  return fetch(window.location.origin + '/api/bookbyid/' + bookId)
    .then((response) => response.json())
    .then((book) => {
      return book;
    });
};
