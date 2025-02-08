import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadSongForm from './components/UploadSongForm';

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get('/api/songs')
      .then((response) => {
        console.log('Fetched songs:', response.data);
        setSongs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching songs:', error);
      });
  }, []);

  return (
    <div>
      <h1>Music Sharing App</h1>
      <UploadSongForm />
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            {song.title} by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;