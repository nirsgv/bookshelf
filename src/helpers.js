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

export const editItemRemote = (itemData) => {
  return fetch(window.location.origin + '/api/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${itemData.token}`,
    },
    body: JSON.stringify(itemData),
  })
    .then((response) => response.json())
    .then(() => getAllItems());
};

export const getBookById = (bookId) => {
  return fetch(window.location.origin + '/api/bookbyid/' + bookId)
    .then((response) => response.json())
    .then((book) => {
      return book;
    });
};

export const addBookRemote = (itemData) => {
  return fetch(window.location.origin + '/api/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${itemData.token}`,
    },
    body: JSON.stringify(itemData),
  })
    .then((response) => response.json())
    .then(() => getAllItems());
};

export const purchaseItem = ({ bookId, userId, token, purchased }) => {
  return fetch(window.location.origin + '/api/purchase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId, userId, token, purchased }),
  }).then((response) => response.json());
};

export const removePurchase = ({ bookId, userId, token, purchased }) => {
  return fetch(window.location.origin + '/api/removepurchaseditem', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId, userId, token, purchased }),
  }).then((response) => response.json());
};

export const getPublisher = (publisherId) => {
  return fetch(
    window.location.origin + '/api/publisher/' + publisherId
  ).then((response) => response.json());
};

export const getWriter = (writerId) => {
  return fetch(
    window.location.origin + '/api/writer/' + writerId
  ).then((response) => response.json());
};
