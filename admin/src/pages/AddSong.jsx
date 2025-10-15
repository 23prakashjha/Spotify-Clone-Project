import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  // ✅ use a safe port for backend
  const url = "http://localhost:5000";  

  // (Optional) Fetch albums if available
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get(`${url}/api/album/list`);
        if (res.data.success) setAlbumData(res.data.albums);
      } catch (err) {
        console.error("Failed to fetch albums", err);
      }
    };
    fetchAlbums();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image || !song) {
      toast.error("Please upload both song and image!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);

      const response = await axios.post(`${url}/api/song/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("✅ Song added successfully!");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while adding song");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex gap-8">
        {/* Upload Song */}
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => setSong(e.target.files[0])}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              className="w-24 cursor-pointer"
              alt="Upload Song"
            />
          </label>
        </div>

        {/* Upload Image */}
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-24 cursor-pointer"
              alt="Upload"
            />
          </label>
        </div>
      </div>

      {/* Song Name */}
      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
          type="text"
          required
        />
      </div>

      {/* Song Description */}
      <div className="flex flex-col gap-2.5">
        <p>Singer Name</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
          type="text"
          required
        />
      </div>

      {/* Album */}
      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]"
        >
          <option value="none">None</option>
          {albumData.map((item) => (
            <option key={item._id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddSong;
