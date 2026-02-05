/**
 * Knowledge Vault - Frontend Application
 * 
 * A complete client-side application with demo mode support.
 * In demo mode, all data is stored in localStorage.
 */

// ==========================================
// Configuration
// ==========================================

const API_BASE_URL = '/api/v1';
const DEMO_MODE = false; // Set to false when backend API integration is complete

// ==========================================
// State Management
// ==========================================

const state = {
    user: null,
    token: null,
    notes: [],
    images: [],
    videos: [],
    categories: [],
    tags: [],
    currentView: 'dashboard'
};

// ==========================================
// Demo Data
// ==========================================

const demoData = {
    notes: [
        {
            id: 'n1',
            title: 'Python Decorators Explained',
            content: '# Python Decorators\n\nDecorators are a powerful feature in Python that allows you to modify the behavior of functions or classes.\n\n## Basic Syntax\n\n```python\n@decorator\ndef function():\n    pass\n```\n\n## Common Use Cases\n- Logging\n- Authentication\n- Caching',
            category_id: 'c1',
            tags: [{ id: 't1', name: 'python' }, { id: 't2', name: 'learning' }],
            created_at: new Date(Date.now() - 86400000).toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            id: 'n2',
            title: 'Spanish Verb Conjugations',
            content: '# Spanish Verb Conjugations\n\n## Present Tense - AR verbs\n\n| Pronoun | Hablar |\n|---------|--------|\n| Yo | hablo |\n| Tú | hablas |\n| Él/Ella | habla |',
            category_id: 'c2',
            tags: [{ id: 't3', name: 'spanish' }, { id: 't2', name: 'learning' }],
            created_at: new Date(Date.now() - 172800000).toISOString(),
            updated_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
            id: 'n3',
            title: 'Data Engineering Best Practices',
            content: '# Data Engineering Best Practices\n\n1. **Design for scalability** - Always consider growth\n2. **Data quality first** - Validate early and often\n3. **Document everything** - Future you will thank you\n4. **Monitor religiously** - Know before users do',
            category_id: 'c1',
            tags: [{ id: 't4', name: 'data-engineering' }, { id: 't5', name: 'important' }],
            created_at: new Date(Date.now() - 259200000).toISOString(),
            updated_at: new Date(Date.now() - 172800000).toISOString()
        }
    ],
    images: [
        {
            id: 'i1',
            original_name: 'childhood_photo.jpg',
            description: 'Summer vacation 2020',
            category_id: 'c3',
            tags: [{ id: 't6', name: 'memories' }],
            created_at: new Date(Date.now() - 604800000).toISOString(),
            // Demo placeholder image
            url: 'https://picsum.photos/seed/1/400/300'
        },
        {
            id: 'i2',
            original_name: 'screenshot_code.png',
            description: 'VS Code setup',
            category_id: 'c1',
            tags: [{ id: 't1', name: 'python' }],
            created_at: new Date(Date.now() - 432000000).toISOString(),
            url: 'https://picsum.photos/seed/2/400/300'
        },
        {
            id: 'i3',
            original_name: 'architecture_diagram.png',
            description: 'System architecture for the new project',
            category_id: 'c1',
            tags: [{ id: 't4', name: 'data-engineering' }],
            created_at: new Date(Date.now() - 345600000).toISOString(),
            url: 'https://picsum.photos/seed/3/400/300'
        }
    ],
    videos: [
        {
            id: 'v1',
            url: 'https://www.youtube.com/watch?v=example1',
            title: 'FastAPI Full Course - Build REST APIs',
            description: 'Complete tutorial on building REST APIs with FastAPI, including authentication and database integration.',
            platform: 'youtube',
            category_id: 'c1',
            tags: [{ id: 't1', name: 'python' }],
            created_at: new Date(Date.now() - 518400000).toISOString()
        },
        {
            id: 'v2',
            url: 'https://www.coursera.org/learn/spanish',
            title: 'Spanish for Beginners - Coursera',
            description: 'Learn Spanish from scratch with this comprehensive course.',
            platform: 'coursera',
            category_id: 'c2',
            tags: [{ id: 't3', name: 'spanish' }, { id: 't2', name: 'learning' }],
            created_at: new Date(Date.now() - 691200000).toISOString()
        }
    ],
    categories: [
        { id: 'c1', name: 'Data Engineering', description: 'DE concepts and tools', color: '#6366f1' },
        { id: 'c2', name: 'Spanish Learning', description: 'Language learning resources', color: '#10b981' },
        { id: 'c3', name: 'Personal', description: 'Personal memories and notes', color: '#f59e0b' }
    ],
    tags: [
        { id: 't1', name: 'python' },
        { id: 't2', name: 'learning' },
        { id: 't3', name: 'spanish' },
        { id: 't4', name: 'data-engineering' },
        { id: 't5', name: 'important' },
        { id: 't6', name: 'memories' }
    ]
};

// ==========================================
// Utility Functions
// ==========================================

function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    if (diff < 86400000) { // Less than 1 day
        return 'Today';
    } else if (diff < 172800000) { // Less than 2 days
        return 'Yesterday';
    } else if (diff < 604800000) { // Less than 1 week
        return Math.floor(diff / 86400000) + ' days ago';
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

function stripMarkdown(text) {
    return text
        .replace(/#{1,6}\s/g, '')
        .replace(/\*\*|__/g, '')
        .replace(/\*|_/g, '')
        .replace(/`{1,3}[^`]*`{1,3}/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\n/g, ' ')
        .trim();
}

// ==========================================
// Toast Notifications
// ==========================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// Modal Management
// ==========================================

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// ==========================================
// View Management
// ==========================================

function switchView(viewName) {
    state.currentView = viewName;

    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewName);
    });

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.toggle('active', view.id === viewName + 'View');
    });

    // Load view data
    switch (viewName) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'notes':
            renderNotesList();
            break;
        case 'images':
            renderImagesList();
            break;
        case 'videos':
            renderVideosList();
            break;
        case 'categories':
            renderCategoriesList();
            break;
        case 'tags':
            renderTagsList();
            break;
    }
}

// ==========================================
// Dashboard
// ==========================================

function renderDashboard() {
    // Update stats
    document.getElementById('notesCount').textContent = state.notes.length;
    document.getElementById('imagesCount').textContent = state.images.length;
    document.getElementById('videosCount').textContent = state.videos.length;
    document.getElementById('tagsCount').textContent = state.tags.length;

    // Render recent notes
    const recentNotes = state.notes.slice(0, 3);
    const recentNotesContainer = document.getElementById('recentNotes');

    if (recentNotes.length === 0) {
        recentNotesContainer.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                </svg>
                <h3>No notes yet</h3>
                <p>Create your first note to get started</p>
            </div>
        `;
    } else {
        recentNotesContainer.innerHTML = recentNotes.map(note => createNoteCard(note)).join('');
    }

    // Render recent images
    const recentImages = state.images.slice(0, 4);
    const recentImagesContainer = document.getElementById('recentImages');

    if (recentImages.length === 0) {
        recentImagesContainer.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                </svg>
                <h3>No images yet</h3>
                <p>Upload your first image</p>
            </div>
        `;
    } else {
        recentImagesContainer.innerHTML = recentImages.map(image => createImageCard(image)).join('');
    }
}

// ==========================================
// Notes
// ==========================================

function createNoteCard(note) {
    const category = state.categories.find(c => c.id === note.category_id);
    const content = stripMarkdown(note.content);

    return `
        <div class="note-card" data-id="${note.id}" onclick="editNote('${note.id}')">
            <div class="note-card-header">
                <h3>${note.title}</h3>
                ${category ? `
                    <span class="note-category">
                        <span class="note-category-dot" style="background: ${category.color}"></span>
                        ${category.name}
                    </span>
                ` : ''}
            </div>
            <p class="note-content">${truncateText(content, 150)}</p>
            <div class="note-footer">
                <div class="note-tags">
                    ${note.tags.slice(0, 3).map(tag => `
                        <span class="note-tag">#${tag.name}</span>
                    `).join('')}
                </div>
                <span class="note-date">${formatDate(note.updated_at || note.created_at)}</span>
            </div>
        </div>
    `;
}

function renderNotesList() {
    const container = document.getElementById('notesList');

    // Update category filter
    const categoryFilter = document.getElementById('noteCategoryFilter');
    categoryFilter.innerHTML = '<option value="">All Categories</option>' +
        state.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    // Update tag filter
    const tagFilter = document.getElementById('noteTagFilter');
    tagFilter.innerHTML = '<option value="">All Tags</option>' +
        state.tags.map(t => `<option value="${t.id}">#${t.name}</option>`).join('');

    if (state.notes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                </svg>
                <h3>No notes yet</h3>
                <p>Create your first note to start building your knowledge vault</p>
                <button class="btn btn-primary" onclick="openNoteModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Create Note
                </button>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="notes-grid">
                ${state.notes.map(note => createNoteCard(note)).join('')}
            </div>
        `;
    }
}

function openNoteModal(noteId = null) {
    const modal = document.getElementById('noteModal');
    const form = document.getElementById('noteForm');
    const title = document.getElementById('noteModalTitle');

    // Populate category dropdown
    const categorySelect = document.getElementById('noteCategory');
    categorySelect.innerHTML = '<option value="">No category</option>' +
        state.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    // Populate tags dropdown
    const tagsSelect = document.getElementById('noteTags');
    tagsSelect.innerHTML = state.tags.map(t => `<option value="${t.id}">#${t.name}</option>`).join('');

    if (noteId) {
        const note = state.notes.find(n => n.id === noteId);
        if (note) {
            title.textContent = 'Edit Note';
            document.getElementById('noteId').value = note.id;
            document.getElementById('noteTitle').value = note.title;
            document.getElementById('noteContent').value = note.content;
            document.getElementById('noteCategory').value = note.category_id || '';

            // Select tags
            const tagIds = note.tags.map(t => t.id);
            Array.from(tagsSelect.options).forEach(opt => {
                opt.selected = tagIds.includes(opt.value);
            });
        }
    } else {
        title.textContent = 'New Note';
        form.reset();
        document.getElementById('noteId').value = '';
    }

    openModal('noteModal');
}

function editNote(noteId) {
    openNoteModal(noteId);
}

async function saveNote(event) {
    event.preventDefault();

    const noteId = document.getElementById('noteId').value;
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const categoryId = document.getElementById('noteCategory').value || null;

    // Get selected tags
    const tagsSelect = document.getElementById('noteTags');
    const selectedTagIds = Array.from(tagsSelect.selectedOptions).map(opt => opt.value);

    try {
        if (DEMO_MODE) {
            const selectedTags = state.tags.filter(t => selectedTagIds.includes(t.id));
            if (noteId) {
                const noteIndex = state.notes.findIndex(n => n.id === noteId);
                if (noteIndex !== -1) {
                    state.notes[noteIndex] = { ...state.notes[noteIndex], title, content, category_id: categoryId, tags: selectedTags, updated_at: new Date().toISOString() };
                }
            } else {
                state.notes.unshift({ id: generateId(), title, content, category_id: categoryId, tags: selectedTags, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
            }
            saveToLocalStorage();
        } else {
            const payload = { title, content, category, tags: selectedTagIds };

            if (noteId) {
                // Update
                const updatedNote = await authenticatedFetch(`/notes/${noteId}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
                const index = state.notes.findIndex(n => (n._id || n.id) === noteId);
                if (index !== -1) state.notes[index] = updatedNote;
                showToast('Note updated successfully', 'success');
            } else {
                // Create
                const newNote = await authenticatedFetch('/notes', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                state.notes.unshift(newNote);
                showToast('Note created successfully', 'success');
            }
        }

        closeModal('noteModal');
        if (state.currentView === 'notes') renderNotesList();
        else if (state.currentView === 'dashboard') renderDashboard();

    } catch (error) {
        console.error('Save note failed:', error);
        showToast(error.message, 'error');
    }
}

// ==========================================
// Images
// ==========================================

function createImageCard(image) {
    const imageUrl = image.data ? `data:${image.mimetype};base64,${image.data}` : image.url;
    return `
        <div class="image-card" data-id="${image._id || image.id}">
            <img src="${imageUrl}" alt="${image.description || image.originalName || image.original_name}">
            <div class="image-card-overlay">
                <span class="image-card-info">${image.description || image.originalName || image.original_name}</span>
            </div>
        </div>
    `;
}

function renderImagesList() {
    const container = document.getElementById('imagesList');

    // Update category filter
    const categoryFilter = document.getElementById('imageCategoryFilter');
    categoryFilter.innerHTML = '<option value="">All Categories</option>' +
        state.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    if (state.images.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                </svg>
                <h3>No images yet</h3>
                <p>Upload your first image to start your collection</p>
                <button class="btn btn-primary" onclick="openImageModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Upload Image
                </button>
            </div>
        `;
    } else {
        container.innerHTML = state.images.map(image => createImageCard(image)).join('');
    }
}

function openImageModal() {
    // Reset form
    document.getElementById('imageForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('uploadZone').style.display = 'block';

    // Populate category dropdown
    const categorySelect = document.getElementById('imageCategory');
    categorySelect.innerHTML = '<option value="">No category</option>' +
        state.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    openModal('imageModal');
}

function handleImageUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('previewImg').src = e.target.result;
        document.getElementById('imagePreview').style.display = 'block';
        document.getElementById('uploadZone').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

async function saveImage(event) {
    event.preventDefault();

    const fileInput = document.getElementById('imageFile');
    const description = document.getElementById('imageDescription').value;
    const categoryId = document.getElementById('imageCategory').value || null;

    if (!fileInput.files[0] && !document.getElementById('previewImg').src) {
        showToast('Please select an image to upload', 'error');
        return;
    }

    try {
        if (DEMO_MODE) {
            const newImage = {
                id: generateId(),
                original_name: fileInput.files[0]?.name || 'uploaded_image.jpg',
                description,
                category_id: categoryId,
                tags: [],
                created_at: new Date().toISOString(),
                url: document.getElementById('previewImg').src || `https://picsum.photos/seed/${Date.now()}/400/300`
            };
            state.images.unshift(newImage);
            saveToLocalStorage();
        } else {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            if (description) formData.append('description', description);
            if (categoryId) formData.append('category_id', categoryId);

            const response = await fetch(`${API_BASE_URL}/images/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${state.token}`
                },
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Upload failed');
            }

            const newImage = await response.json();
            state.images.unshift(newImage);
        }

        closeModal('imageModal');
        showToast('Image uploaded successfully', 'success');

        if (state.currentView === 'images') {
            renderImagesList();
        } else if (state.currentView === 'dashboard') {
            renderDashboard();
        }
    } catch (error) {
        console.error('Upload failed:', error);
        showToast(error.message, 'error');
    }
}

// ==========================================
// Videos
// ==========================================

function createVideoCard(video) {
    const category = state.categories.find(c => c.id === video.category_id);

    // Get YouTube thumbnail if available
    let thumbnailUrl = null;
    if (video.platform === 'youtube') {
        const videoId = extractYouTubeId(video.url);
        if (videoId) {
            thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        }
    }

    return `
        <div class="video-card" data-id="${video.id}">
            <div class="video-thumbnail">
                ${thumbnailUrl ?
            `<img src="${thumbnailUrl}" alt="${video.title}">` :
            `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>`
        }
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p class="video-description">${video.description || 'No description'}</p>
                <div class="video-meta">
                    <span class="video-platform">${video.platform}</span>
                    <span class="video-date">${formatDate(video.created_at)}</span>
                </div>
            </div>
        </div>
    `;
}

function extractYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?#]+)/);
    return match ? match[1] : null;
}

function renderVideosList() {
    const container = document.getElementById('videosList');

    if (state.videos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <polygon points="23 7 16 12 23 17 23 7"/>
                    <rect x="1" y="5" width="15" height="14" rx="2"/>
                </svg>
                <h3>No videos yet</h3>
                <p>Save your first video link from YouTube, Coursera, or any platform</p>
                <button class="btn btn-primary" onclick="openVideoModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Video
                </button>
            </div>
        `;
    } else {
        container.innerHTML = state.videos.map(video => createVideoCard(video)).join('');
    }
}

function openVideoModal(videoId = null) {
    const modal = document.getElementById('videoModal');
    const form = document.getElementById('videoForm');
    const title = document.getElementById('videoModalTitle');

    // Populate category dropdown
    const categorySelect = document.getElementById('videoCategory');
    categorySelect.innerHTML = '<option value="">No category</option>' +
        state.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    if (videoId) {
        const video = state.videos.find(v => v.id === videoId);
        if (video) {
            title.textContent = 'Edit Video';
            document.getElementById('videoId').value = video.id;
            document.getElementById('videoUrl').value = video.url;
            document.getElementById('videoTitle').value = video.title;
            document.getElementById('videoDescription').value = video.description || '';
            document.getElementById('videoCategory').value = video.category_id || '';
        }
    } else {
        title.textContent = 'Add Video Link';
        form.reset();
        document.getElementById('videoId').value = '';
    }

    openModal('videoModal');
}

function detectPlatform(url) {
    url = url.toLowerCase();
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('vimeo.com')) return 'vimeo';
    if (url.includes('coursera.org')) return 'coursera';
    if (url.includes('udemy.com')) return 'udemy';
    if (url.includes('linkedin.com/learning')) return 'linkedin';
    return 'other';
}

async function saveVideo(event) {
    event.preventDefault();

    const videoId = document.getElementById('videoId').value;
    const url = document.getElementById('videoUrl').value;
    const title = document.getElementById('videoTitle').value;
    const description = document.getElementById('videoDescription').value;
    const categoryId = document.getElementById('videoCategory').value || null;
    const platform = detectPlatform(url);

    try {
        if (DEMO_MODE) {
            if (videoId) {
                const index = state.videos.findIndex(v => v.id === videoId);
                if (index !== -1) {
                    state.videos[index] = { ...state.videos[index], url, title, description, category_id: categoryId, platform };
                }
            } else {
                state.videos.unshift({ id: generateId(), url, title, description, category_id: categoryId, platform, created_at: new Date().toISOString() });
            }
            saveToLocalStorage();
        } else {
            const payload = { url, title, description, category_id: categoryId, platform };

            if (videoId) {
                const updated = await authenticatedFetch(`/videos/${videoId}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
                const index = state.videos.findIndex(v => v.id === videoId);
                if (index !== -1) state.videos[index] = updated;
                showToast('Video updated successfully', 'success');
            } else {
                const newVideo = await authenticatedFetch('/videos', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                state.videos.unshift(newVideo);
                showToast('Video saved successfully', 'success');
            }
        }

        closeModal('videoModal');

        if (state.currentView === 'videos') {
            renderVideosList();
        }
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// ==========================================
// Categories
// ==========================================

function renderCategoriesList() {
    const container = document.getElementById('categoriesList');

    if (state.categories.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
                <h3>No categories yet</h3>
                <p>Create categories to organize your content</p>
                <button class="btn btn-primary" onclick="openCategoryModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Create Category
                </button>
            </div>
        `;
    } else {
        container.innerHTML = state.categories.map(category => `
            <div class="category-card" data-id="${category.id}">
                <div class="category-color" style="background: ${category.color}"></div>
                <div class="category-info">
                    <h3>${category.name}</h3>
                    <p>${category.description || 'No description'}</p>
                </div>
            </div>
        `).join('');
    }
}

function openCategoryModal(categoryId = null) {
    const form = document.getElementById('categoryForm');
    const title = document.getElementById('categoryModalTitle');

    if (categoryId) {
        const category = state.categories.find(c => c.id === categoryId);
        if (category) {
            title.textContent = 'Edit Category';
            document.getElementById('categoryId').value = category.id;
            document.getElementById('categoryName').value = category.name;
            document.getElementById('categoryDescription').value = category.description || '';
            document.getElementById('categoryColor').value = category.color;
            document.getElementById('colorPreview').style.background = category.color;
        }
    } else {
        title.textContent = 'New Category';
        form.reset();
        document.getElementById('categoryId').value = '';
        document.getElementById('categoryColor').value = '#6366f1';
        document.getElementById('colorPreview').style.background = '#6366f1';
    }

    openModal('categoryModal');
}

async function saveCategory(event) {
    event.preventDefault();

    const categoryId = document.getElementById('categoryId').value;
    const name = document.getElementById('categoryName').value;
    const description = document.getElementById('categoryDescription').value;
    const color = document.getElementById('categoryColor').value;

    try {
        if (DEMO_MODE) {
            if (categoryId) {
                const index = state.categories.findIndex(c => c.id === categoryId);
                if (index !== -1) state.categories[index] = { ...state.categories[index], name, description, color };
            } else {
                state.categories.push({ id: generateId(), name, description, color });
            }
            saveToLocalStorage();
        } else {
            const payload = { name, description, color };
            if (categoryId) {
                const updated = await authenticatedFetch(`/categories/${categoryId}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
                const index = state.categories.findIndex(c => c.id === categoryId);
                if (index !== -1) state.categories[index] = updated;
            } else {
                const newCat = await authenticatedFetch('/categories', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                state.categories.push(newCat);
            }
        }
        showToast('Category saved', 'success');
        closeModal('categoryModal');
        renderCategoriesList();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// ==========================================
// Tags
// ==========================================

function renderTagsList() {
    const container = document.getElementById('tagsList');

    if (state.tags.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
                <h3>No tags yet</h3>
                <p>Create tags to label and filter your content</p>
                <button class="btn btn-primary" onclick="openTagModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Create Tag
                </button>
            </div>
        `;
    } else {
        // Count tag usage
        const tagCounts = {};
        state.tags.forEach(t => tagCounts[t.id] = 0);

        [...state.notes, ...state.images, ...state.videos].forEach(item => {
            if (item.tags) {
                item.tags.forEach(t => {
                    if (tagCounts[t.id] !== undefined) tagCounts[t.id]++;
                });
            }
        });

        container.innerHTML = state.tags.map(tag => `
            <div class="tag-badge" data-id="${tag.id}">
                #${tag.name}
                <span class="tag-count">${tagCounts[tag.id] || 0}</span>
            </div>
        `).join('');
    }
}

function openTagModal() {
    document.getElementById('tagForm').reset();
    openModal('tagModal');
}

async function saveTag(event) {
    event.preventDefault();

    const name = document.getElementById('tagName').value.toLowerCase().trim();

    try {
        if (DEMO_MODE) {
            if (state.tags.some(t => t.name === name)) {
                showToast('Tag already exists', 'error');
                return;
            }
            state.tags.push({ id: generateId(), name });
            saveToLocalStorage();
        } else {
            const newTag = await authenticatedFetch('/tags', {
                method: 'POST',
                body: JSON.stringify({ name })
            });
            state.tags.push(newTag);
        }

        showToast('Tag created', 'success');
        closeModal('tagModal');
        renderTagsList();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// ==========================================
// Authentication
// ==========================================

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // In demo mode, accept any credentials
    if (DEMO_MODE) {
        state.user = { email };
        state.token = 'demo_token';
        localStorage.setItem('vault_user', JSON.stringify(state.user));

        showApp();
        showToast('Welcome to Knowledge Vault!', 'success');
    } else {
        // TODO: Real API call
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(async res => {
                const isJson = res.headers.get('content-type')?.includes('application/json');
                const data = isJson ? await res.json() : null;

                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    throw new Error(error);
                }
                return data;
            })
            .then(data => {
                console.log('Login successful:', data);
                if (data.token) {
                    state.user = { email: data.email, id: data._id };
                    state.token = data.token;
                    localStorage.setItem('vault_user', JSON.stringify(state.user));
                    localStorage.setItem('vault_token', state.token);
                    showApp();
                    showToast('Welcome back!', 'success');
                } else {
                    console.error('No token in response:', data);
                    throw new Error('Invalid response from server');
                }
            })
            .catch(err => {
                console.error('Login failed:', err);
                showToast(err.message || 'Login failed', 'error');
            });
    }
}

function handleRegister(event) {
    event.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (password !== confirm) {
        showToast('Passwords do not match', 'error');
        return;
    }

    // In demo mode
    if (DEMO_MODE) {
        state.user = { email };
        state.token = 'demo_token';
        localStorage.setItem('vault_user', JSON.stringify(state.user));

        showApp();
        showToast('Account created! Welcome!', 'success');
    } else {
        fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(async res => {
                const isJson = res.headers.get('content-type')?.includes('application/json');
                const data = isJson ? await res.json() : null;

                if (!res.ok) {
                    const error = (data && data.detail) || await res.text(); // Get text if no JSON
                    throw new Error(error || 'Registration failed with status ' + res.status);
                }
                return data;
            })
            .then(data => {
                showToast('Account created! Please login.', 'success');
                // Switch to login tab
                document.querySelector('.auth-tab[data-tab="login"]').click();
                document.getElementById('loginEmail').value = email;
                document.getElementById('loginPassword').focus();
            })
            .catch(err => {
                showToast(err.message, 'error');
            });
    }
}

function logout() {
    state.user = null;
    state.token = null;
    localStorage.removeItem('vault_user');
    localStorage.removeItem('vault_token');

    document.getElementById('app').style.display = 'none';
    document.getElementById('authModal').classList.add('active');

    showToast('Logged out successfully', 'info');
}

function showApp() {
    document.getElementById('authModal').classList.remove('active');
    document.getElementById('app').style.display = 'flex';

    // Update user info
    if (state.user) {
        document.getElementById('userEmail').textContent = state.user.email;
        document.getElementById('userInitial').textContent = state.user.email[0].toUpperCase();
    }

    // Load data
    loadData().then(() => {
        switchView('dashboard');
    });
}

// ==========================================
// Local Storage
// ==========================================

function saveToLocalStorage() {
    localStorage.setItem('vault_notes', JSON.stringify(state.notes));
    localStorage.setItem('vault_images', JSON.stringify(state.images));
    localStorage.setItem('vault_videos', JSON.stringify(state.videos));
    localStorage.setItem('vault_categories', JSON.stringify(state.categories));
    localStorage.setItem('vault_tags', JSON.stringify(state.tags));
}

// ==========================================
// API Interaction
// ==========================================

async function authenticatedFetch(endpoint, options = {}) {
    if (!state.user || !state.token) {
        logout();
        throw new Error('Not authenticated');
    }

    const headers = {
        'Authorization': `Bearer ${state.token}`,
        'Content-Type': 'application/json',
        ...options.headers
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (response.status === 401) {
        logout();
        throw new Error('Session expired');
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'API request failed');
    }

    if (response.status === 204) return null;
    return response.json();
}

async function loadData() {
    if (DEMO_MODE) {
        loadFromLocalStorage();
        return;
    }

    try {
        const [notesData, imagesData, videosData, categoriesData, tagsData] = await Promise.all([
            authenticatedFetch('/notes?page_size=100'),
            authenticatedFetch('/images?page_size=100'),
            authenticatedFetch('/videos?page_size=100'),
            authenticatedFetch('/categories'),
            authenticatedFetch('/tags')
        ]);

        state.notes = Array.isArray(notesData) ? notesData : (notesData.items || []);
        state.images = Array.isArray(imagesData) ? imagesData : (imagesData.items || []);
        state.videos = Array.isArray(videosData) ? videosData : (videosData.items || []);
        state.categories = categoriesData || [];
        state.tags = tagsData || [];

    } catch (error) {
        console.error('Failed to load data:', error);
        showToast('Failed to load data from server', 'error');
    }
}

function loadFromLocalStorage() {
    // Try to load from localStorage, fall back to demo data
    const savedNotes = localStorage.getItem('vault_notes');
    const savedImages = localStorage.getItem('vault_images');
    const savedVideos = localStorage.getItem('vault_videos');
    const savedCategories = localStorage.getItem('vault_categories');
    const savedTags = localStorage.getItem('vault_tags');

    state.notes = savedNotes ? JSON.parse(savedNotes) : [...demoData.notes];
    state.images = savedImages ? JSON.parse(savedImages) : [...demoData.images];
    state.videos = savedVideos ? JSON.parse(savedVideos) : [...demoData.videos];
    state.categories = savedCategories ? JSON.parse(savedCategories) : [...demoData.categories];
    state.tags = savedTags ? JSON.parse(savedTags) : [...demoData.tags];

    // Save demo data if nothing was saved
    if (!savedNotes) saveToLocalStorage();
}

// ==========================================
// Event Listeners
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    const savedUser = localStorage.getItem('vault_user');
    if (savedUser) {
        state.user = JSON.parse(savedUser);
        showApp();
    } else {
        document.getElementById('authModal').classList.add('active');
    }

    // Auth tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.getElementById('loginForm').style.display = tab.dataset.tab === 'login' ? 'flex' : 'none';
            document.getElementById('registerForm').style.display = tab.dataset.tab === 'register' ? 'flex' : 'none';
        });
    });

    // Auth forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);

    // Navigation
    document.querySelectorAll('.nav-item, .btn-link[data-view]').forEach(item => {
        item.addEventListener('click', () => {
            if (item.dataset.view) {
                switchView(item.dataset.view);
            }
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Add buttons
    document.getElementById('addNoteBtn').addEventListener('click', () => openNoteModal());
    document.getElementById('uploadImageBtn').addEventListener('click', () => openImageModal());
    document.getElementById('addVideoBtn').addEventListener('click', () => openVideoModal());
    document.getElementById('addCategoryBtn').addEventListener('click', () => openCategoryModal());
    document.getElementById('addTagBtn').addEventListener('click', () => openTagModal());

    // Header add button
    document.getElementById('addNewBtn').addEventListener('click', () => {
        switch (state.currentView) {
            case 'notes':
            case 'dashboard':
                openNoteModal();
                break;
            case 'images':
                openImageModal();
                break;
            case 'videos':
                openVideoModal();
                break;
            case 'categories':
                openCategoryModal();
                break;
            case 'tags':
                openTagModal();
                break;
            default:
                openNoteModal();
        }
    });

    // Form submissions
    document.getElementById('noteForm').addEventListener('submit', saveNote);
    document.getElementById('videoForm').addEventListener('submit', saveVideo);
    document.getElementById('categoryForm').addEventListener('submit', saveCategory);
    document.getElementById('tagForm').addEventListener('submit', saveTag);
    document.getElementById('imageForm').addEventListener('submit', saveImage);

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal && modal.id !== 'authModal') {
                closeAllModals();
            }
        });
    });

    // Image upload
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('imageFile');

    uploadZone.addEventListener('click', () => fileInput.click());

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        handleImageUpload(e.dataTransfer.files[0]);
    });

    fileInput.addEventListener('change', (e) => {
        handleImageUpload(e.target.files[0]);
    });

    document.querySelector('.remove-preview')?.addEventListener('click', () => {
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('uploadZone').style.display = 'block';
        document.getElementById('imageFile').value = '';
    });

    // Color picker preview
    document.getElementById('categoryColor').addEventListener('input', (e) => {
        document.getElementById('colorPreview').style.background = e.target.value;
    });

    // Global search (keyboard shortcut)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('globalSearch').focus();
        }

        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Global search
    document.getElementById('globalSearch').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 0) {
            // Simple search implementation
            const results = state.notes.filter(n =>
                n.title.toLowerCase().includes(query) ||
                n.content.toLowerCase().includes(query)
            );
            // Could show a dropdown with results
            console.log('Search results:', results);
        }
    });
});
