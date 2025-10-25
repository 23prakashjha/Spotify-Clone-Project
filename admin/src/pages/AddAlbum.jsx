import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [colour, setColour] = useState("#ffffff");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const url = import.meta.env.VITE_API_URL || "https://spotify-clone-project-dkiv.vercel.app/"; // ✅ Replace with your backend base URL

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // ✅ Corrected typo (was e.preventDeafult)
    setLoading(true);

    try {
      const formData = new FormData(); // ✅ Capitalized "FormData"
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColour", colour);

      const response = await axios.post(`${url}/api/album/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Album added successfully!");
        setDesc("");
        setImage(null);
        setName("");
        setColour("#ffffff");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the album.");
    }

    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
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
            className="w-24 cursor-pointer border rounded"
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="Upload Preview"
          />
        </label>
      </div>

      {/* Album Name */}
      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Enter album name"
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2.5">
        <p>Description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Enter description"
          required
        />
      </div>

      {/* Background Colour */}
      <div className="flex flex-col gap-3">
        <p>Background Colour</p>
        <input
          onChange={(e) => setColour(e.target.value)}
          value={colour}
          type="color"
          className="w-16 h-10 border rounded"
        />
      </div>

      <button
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer rounded"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
