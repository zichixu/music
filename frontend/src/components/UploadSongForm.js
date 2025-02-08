import React, { useState } from 'react';
import axios from 'axios';

const UploadSongForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload_song', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading song');
    }
  };

  return (
    <div>
      <h2>Upload Song</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="file">Upload MP3:</label>
          <input
            type="file"
            id="file"
            accept=".mp3"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Upload Song</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadSongForm;