import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('Posts').select('*');
    if (error) console.error(error);
    else setPosts(data);
  };

  const addPost = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('Posts').insert([{ title, body }]).select('*');
    
    if (error) {
      console.error('Error adding post:', error);
      return;
    }
  
    if (data && data.length > 0) {
      setPosts([...posts, data[0]]); // Agrega el nuevo post a la lista
    } else {
      console.error('No data returned after insert');
    }
  
    // Limpiar el formulario después de agregar
    setTitle('');
    setBody('');
  };
  

  const updatePost = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('Posts')
      .update({ title, body })
      .eq('id', editingPost.id);
    if (error) console.error(error);
    else {
      setPosts(posts.map(post => (post.id === editingPost.id ? data[0] : post)));
      setEditingPost(null);
      setTitle('');
      setBody('');
    }
  };

  const deletePost = async (id) => {
    const { error } = await supabase.from('Posts').delete().eq('id', id);
    if (error) console.error(error);
    else setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="App">
      <h1>Supabase CRUD Posts</h1>

      <form onSubmit={editingPost ? updatePost : addPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">{editingPost ? 'Update' : 'Add'} Post</button>
      </form>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => {
              setEditingPost(post);
              setTitle(post.title);
              setBody(post.body);
            }}>Edit</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
