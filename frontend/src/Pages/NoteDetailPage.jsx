import React, { useEffect } from 'react'
import { useNavigate , useParams, Link} from 'react-router';
import instance from '../lib/axios';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';


const NoteDetailPage = () => {

  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const navigate = useNavigate();
  const {id} = useParams();
  //console.log({id});


  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await instance.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error('Error fetching note:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  console.log({note});

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try{
      await instance.delete(`/notes/${id}`);
      toast.success('Note deleted successfully');
      navigate('/');
    }
    catch (error) {
      console.error('Error deleting note:', error);
      if(error.response.status === 429) {
        toast.error('Too many requests, please try again later');
        return;
      } else {
        toast.error('Failed to delete note');
      }
    }
  }

  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setSaving(true);
      
    try{
      await instance.put(`/notes/${id}`, note)
      navigate('/');
    }
    catch (error) {
      console.error('Error saving note:', error);
      if(error.response.status === 429) {
        toast.error('Too many requests, please try again later');
        return;
      } else {
        toast.error('Failed to save note');
      }
    }
    finally {
      setSaving(false);
      toast.success('Note saved successfully');
    } 
  }

  if(loading) {
    return <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10" />
    </div>;
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className= "container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">  
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5"/>
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="bth btn-error btn-outline ml-4">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card-bg-base-100">
            <div className="card-body">

              <div className="form-control mb-4">
                <label className="label">
                  <span className= "label-text"> Title</span>
                </label>
                <input 
                  type="text"
                  placeholder='Note Title'
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value})}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className= "label-text"> Content</span>
                </label>
                <input type="text"
                  placeholder='Write your note here...'
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value})}
                />
              </div>

              <div className="card-actions">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>         

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage