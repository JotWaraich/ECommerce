{/*import React, { useState } from "react";
import Card from "../components/Cards";

const Search = () => {
  const [item, setItem] = useState([]);
  const [name, setName] = useState("");
  const getItems = async (e) => {
    e.preventDefault();
    if (!name) {
      return (
        <div>
          <p>Please enter the name of the item</p>
        </div>
      );
    }
    try {
      const response = await fetch("/api/items/getByName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      setItem(data);
      console.log(data);
    } catch (error) {
      console.log("error getting items", error);
    }
  };
  return (
    <div>
      <form onSubmit={getItems}>
        <input
          type="text"
          placeholder="Enter the name of the item"
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md border-gray-300 p-2 m-2"
        />
        <button type="submit">Search</button>
      </form>
      <Card items={item} />
    </div>
  );
};
export default Search; */}



// dependency to install : npm install react-speech-recognition
// npm install @babel/polyfill
// npm install framer-motion
// import '@babel/polyfill';


// reference: https://www.youtube.com/watch?v=W0-hJ-9YG3I

/*

import 'regenerator-runtime/runtime';
import React, { useState } from "react";
import Card from "../components/Cards";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const [item, setItem] = useState([]);
  const [name, setName] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleVoiceStart = () => {
    SpeechRecognition.startListening(); // Start listening for voice input
  };

  const handleVoiceEnd = () => {
    SpeechRecognition.stopListening(); // Stop listening for voice input
    if (transcript) {
      setName(transcript); // Set the recognized text as the search input value
    }
  };

  const getItems = async (e) => {
    e.preventDefault();
    if (!name && !transcript) {
      alert("Please enter the name of the item or use voice input");
      return;
    }

    const searchName = transcript || name; // Use transcript if available, else use input field

    try {
      const response = await fetch("/api/items/getByName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: searchName }),
      });

      const data = await response.json();
      setItem(data);
      console.log(data);
    } catch (error) {
      console.log("error getting items", error);
    }

    resetTranscript(); // Reset transcript after searching
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSearch}
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        {isSearchOpen ? "Close Search" : "Open Search"}
      </button>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ x: '-100%' }} // Slide in from left
            animate={{ x: 0 }}
            exit={{ x: '-100%' }} // Slide out to left
            transition={{ duration: 0.5 }} // Slower animation duration
            className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 rounded-t-md z-10 overflow-y-auto"
            style={{ maxHeight: "80vh" }} // Limit height and enable scrolling
          >
            <form onSubmit={getItems} className="flex items-center justify-center ">
              <input
                type="text"
                placeholder="Ask me"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 border rounded-md  border-gray-300 p-2 mt-0 mr-4 max-w-xs"
                style={{ maxWidth: "450px" }} // Adjust width as needed
              />
              <button
                type="button"
                onClick={handleVoiceStart}
                className="bg-red-900  hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <VscDebugStart />
              </button>
              <button
                type="button"
                onClick={handleVoiceEnd}
                className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              >
                <VscDebugStop />
              </button>
              <button
                type="submit"
                className="bg-black hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              >
                Search
              </button>
            </form>
            
            <Card items={item} />
      
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search; 

*/

import 'regenerator-runtime/runtime';
import React, { useState } from "react";
import Card from "../components/Cards";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";

const Search = () => {
  const [item, setItem] = useState([]);
  const [name, setName] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false); // State to control showing close button

  const handleVoiceStart = () => {
    SpeechRecognition.startListening(); // Start listening for voice input
  };

  const handleVoiceEnd = () => {
    SpeechRecognition.stopListening(); // Stop listening for voice input
    if (transcript) {
      setName(transcript); // Set the recognized text as the search input value
    }
  };

  const getItems = async (e) => {
    e.preventDefault();
    if (!name && !transcript) {
      alert("Please enter the name of the item or use voice input");
      return;
    }

    const searchName = transcript || name; // Use transcript if available, else use input field

    try {
      const response = await fetch("/api/items/getByName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: searchName }),
      });

      const data = await response.json();
      setItem(data);
      console.log(data);

      setShowCloseButton(true); // Show close button when items are found
    } catch (error) {
      console.log("error getting items", error);
    }

    resetTranscript(); // Reset transcript after searching
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setItem([]); // Clear items when toggling search
    setShowCloseButton(false); // Hide close button when toggling search
  };

  const handleClose = () => {
    setIsSearchOpen(false); // Close the search modal
    setItem([]); // Clear search results when closing
    setShowCloseButton(false); // Hide close button when closing
  };

  return (
    <div>
      <button
        onClick={toggleSearch}
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        {isSearchOpen ? "Close Search" : "Open Search"}
      </button>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ x: '-100%' }} // Slide in from left
            animate={{ x: 0 }}
            exit={{ x: '-100%' }} // Slide out to left
            transition={{ duration: 0.5 }} // Slower animation duration
            className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 rounded-t-md z-10 overflow-y-auto"
            style={{ maxHeight: "80vh" }} // Limit height and enable scrolling
          >
            <form onSubmit={getItems} className="flex items-center justify-center ">
              <input
                type="text"
                placeholder="Ask me"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 border rounded-md  border-gray-300 p-2 mt-0 mr-4 max-w-xs"
                style={{ maxWidth: "450px" }} // Adjust width as needed
              />
              <button
                type="button"
                onClick={handleVoiceStart}
                className="bg-red-900  hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <VscDebugStart />
              </button>
              <button
                type="button"
                onClick={handleVoiceEnd}
                className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              >
                <VscDebugStop />
              </button>
              <button
                type="submit"
                className="bg-black hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              >
                Search
              </button>
            </form>
            
            {item.length > 0 ? (
              <Card items={item} />
            ) : (
              <p>No items found</p>
            )}

            {showCloseButton && (
              <button
                onClick={handleClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              >
                <CgClose/>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
