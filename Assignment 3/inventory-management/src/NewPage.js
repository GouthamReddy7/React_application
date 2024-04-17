import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewPage.css';

const NewPage = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get('https://api.apis.guru/v2/list.json');
        // Extracting the first 10 entries
        const entries = Object.entries(response.data).slice(0, 10);
        // Extracting required data (provider, title, added, and link) for each entry
        const formattedData = entries.map(([key, value]) => ({
          provider: key,
          title: value.versions[value.preferred].info.title,
          added: value.added.split('T')[0],
          link: value.versions[value.preferred].link,
        }));
        setApiData(formattedData);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };

    fetchApiData();
  }, []);

  return (
    <div className="container">
      <h1>Tabular Data from Third party API</h1>
      <table className="api-table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Title</th>
            <th>Added</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.provider}</td>
              <td>{entry.title}</td>
              <td>{entry.added}</td>
              <td><a href={entry.link}>{entry.link}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewPage;
