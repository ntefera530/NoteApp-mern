import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import RateLimit from '../Components/RateLimit';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../Components/NoteCard';
import instance from '../lib/axios';
import NotesNotFound from '../Components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await instance.get('/notes');
        console.log(response.data);
        setNotes(response.data);
        //console.log(notes.length); THIS IS INCORRECT, IT WILL ALWAYS RETURN 0
        setIsRateLimited(false);
      } 
      catch (error) { 
        console.error('An error occurred while fetching notes:', error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to fetch notes. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  },[]);

  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimit />}

      <div className= "max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound/>}
        {notes.length > 0 &&  !isRateLimited && (
          <div className= " grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
            {notes.map((note) => (
              <div>
                <NoteCard key= {note._id} note={note} setNotes={setNotes}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage