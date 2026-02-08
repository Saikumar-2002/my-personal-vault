import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const DataContext = createContext();

const DEMO_MODE = false; // Real project integration

export const DataProvider = ({ children }) => {
    const { token, user } = useAuth();
    const [data, setData] = useState({
        notes: [],
        images: [],
        videos: [],
        categories: [],
        tags: []
    });
    const [loading, setLoading] = useState(false);

    // Map MongoDB _id to id for frontend parity
    const mapData = (items) => {
        return items.map(item => ({
            ...item,
            id: item._id
        }));
    };

    const fetchInitialData = async () => {
        if (!token) return;

        setLoading(true);
        try {
            const [notesRes, imagesRes, videosRes, categoriesRes, tagsRes] = await Promise.all([
                axios.get('/api/v1/notes'),
                axios.get('/api/v1/images'),
                axios.get('/api/v1/videos'),
                axios.get('/api/v1/categories'),
                axios.get('/api/v1/tags')
            ]);

            setData({
                notes: mapData(notesRes.data),
                images: mapData(imagesRes.data),
                videos: mapData(videosRes.data),
                categories: mapData(categoriesRes.data),
                tags: mapData(tagsRes.data)
            });
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && token) {
            fetchInitialData();
        } else {
            setData({
                notes: [],
                images: [],
                videos: [],
                categories: [],
                tags: []
            });
        }
    }, [user, token]);

    const addNote = async (note) => {
        try {
            const response = await axios.post('/api/v1/notes', note);
            const newNote = { ...response.data, id: response.data._id };
            setData(prev => ({
                ...prev,
                notes: [newNote, ...prev.notes]
            }));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to add note' };
        }
    };

    const updateNote = async (id, note) => {
        try {
            const response = await axios.put(`/api/v1/notes/${id}`, note);
            const updatedNote = { ...response.data, id: response.data._id };
            setData(prev => ({
                ...prev,
                notes: prev.notes.map(n => n.id === id ? updatedNote : n)
            }));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to update note' };
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`/api/v1/notes/${id}`);
            setData(prev => ({
                ...prev,
                notes: prev.notes.filter(n => n.id !== id)
            }));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to delete note' };
        }
    };

    const uploadImage = async (formData) => {
        try {
            const response = await axios.post('/api/v1/images', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const newImage = { ...response.data, id: response.data._id };
            setData(prev => ({
                ...prev,
                images: [newImage, ...prev.images]
            }));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to upload image' };
        }
    };

    const addVideo = async (video) => {
        try {
            const response = await axios.post('/api/v1/videos', video);
            const newVideo = { ...response.data, id: response.data._id };
            setData(prev => ({
                ...prev,
                videos: [newVideo, ...prev.videos]
            }));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to add video' };
        }
    };

    return (
        <DataContext.Provider value={{
            data,
            loading,
            addNote,
            updateNote,
            deleteNote,
            uploadImage,
            addVideo,
            fetchInitialData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
