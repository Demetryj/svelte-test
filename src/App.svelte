<script>
    import { onMount } from 'svelte';
    import PostsList from './components/PostsList.svelte';
    import UserSelect from './components/UserSelect.svelte';
    import Sidebar from './components/Sidebar.svelte';
    import PostDetails from './components/PostDetails.svelte';
    import { getAllPosts, getUserPosts } from './api/posts.js';
    import { posts, selectedPostId, selectedUserId, users } from './store/store.js';
    
    onMount(async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('Error fetching users');
            const usersData = await response.json();
            users.set(usersData);
        } catch (error) {
            console.error(error);
        }
    });
    
    
    async function loadAllPosts() {
        try {
            const allPosts = await getAllPosts();
            posts.set(allPosts);
            selectedUserId.set(null); 
            selectedPostId.set(null); 
        } catch (error) {
            console.error(error);
        }
    }
    
    async function loadUserPosts(userId) {
        try {
            const userPosts = await getUserPosts(userId);
            posts.set(userPosts);
            selectedUserId.set(userId);
            selectedPostId.set(null); 
        } catch (error) {
            console.error(error);
        }
    }
    
    function handleOpen(postId) {
        selectedPostId.update(current => (current === postId ? null : postId));
    }
</script>

<main>
    <h1>Post Comments Management</h1>
    <div class="controls">
        <button on:click={loadAllPosts}>Show All Posts</button>
        <UserSelect on:selectUser="{e => loadUserPosts(e.detail)}" />
    </div>
    <div class="content">
        <PostsList on:open="{e => handleOpen(e.detail)}" />
        <Sidebar />
    </div>
    {#if $selectedPostId}
        <PostDetails />
    {/if}
</main>

<style>
    main {
        padding: 20px;
        font-family: Arial, sans-serif;
    }
    .controls {
        margin-bottom: 20px;
    }
    .content {
        display: flex;
    }
    button {
        padding: 10px 20px;
        margin-right: 10px;
        cursor: pointer;
    }
</style>