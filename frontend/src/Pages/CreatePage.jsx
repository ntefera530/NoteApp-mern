import React, { use } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import instance from '../lib/axios'



const CreatePage = () => {

  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    setLoading(true);
    try {
      await instance.post('/notes', {
        title,
        content
      });

      toast.success('Note created successfully');

      navigate("/");

    } catch (error) {
      console.error('Error creating note:', error);
      if(error.response.status === 429) {
        toast.error('Too many requests, please try again later');
        return;
      }else{
        toast.error('Failed to create note');
      }
    } finally {
      setLoading(false);
    }
  }

  return <div className= "min-h-screen bg-base-200">CreatePage
    <div className= "container mx-auto px-4 py-8">
      <div className= "max-w-2xl mx-auto">
        <Link to="/" className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5"/>
          Back to Home
        </Link>
        <div className="card bg-base-100 shadow-xl">
          <div className= "card-body">
            <h2 className="card-title text-2xl mb-4"> Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className= "label-text"> Title</span>
                </label>
                <input type="text"
                  placeholder='Note Title'
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className= "label-text"> Content</span>
                </label>
                <input type="text"
                  placeholder='Note Content'
                  className="input input-bordered"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className= "card-actions justify-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
}

export default CreatePage