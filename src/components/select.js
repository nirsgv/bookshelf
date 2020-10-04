import React, { useEffect, useState } from 'react';

export function SelectPublisher({ selectCb }) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    getPublishers();
  }, []);

  const getPublishers = () => {
    return fetch(window.location.origin + '/api/getpublishers')
      .then((response) => response.json())
      .then((data) => setOptions(data.result));
  };

  return (
    <select onChange={selectCb}>
      {options.map((publisher) => (
        <option value={publisher.PUBLISHER_ID} key={publisher.PUBLISHER_ID}>
          {publisher.PUBLISHER_NAME}
        </option>
      ))}
    </select>
  );
}

export function SelectWriter({ selectCb }) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    getWriters();
  }, []);

  const getWriters = () => {
    return fetch(window.location.origin + '/api/getwriters')
      .then((response) => response.json())
      .then((data) => setOptions(data.result));
  };

  return (
    <select onChange={selectCb}>
      {options.map((writer) => (
        <option value={writer.WRITER_ID} key={writer.WRITER_ID}>
          {writer.WRITER_NAME}
        </option>
      ))}
    </select>
  );
}
