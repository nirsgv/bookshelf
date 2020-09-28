export const getAllItems = () => {
  return fetch(window.location.origin + '/api/books').then((response) =>
    response.json()
  );
};

export const removeItemRemote = async (id, cb, token) => {
  await fetch(window.location.origin + '/api/remove/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => getAllItems(cb));
};

export const editItemRemote = async (itemData, cb) => {
  await fetch(window.location.origin + '/api/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${itemData.token}`,
    },
    body: JSON.stringify(itemData),
  })
    .then((response) => response.json())
    .then((data) => getAllItems(cb));
};
