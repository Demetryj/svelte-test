<script>
    import { posts, selectedPostId } from '../store/store.js';
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    function togglePost(postId) {
        dispatch('open', postId);
    }
</script>

<div class="posts-list">
    {#each $posts as post}
        <div class="post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p><strong>Author:</strong> {post.name}, {post.city}</p>
            <button on:click={() => togglePost(post.id)}>
                { $selectedPostId === post.id ? 'Close' : 'Open' }
            </button>
        </div>
    {/each}
</div>

<style>
    .posts-list {
        width: 70%;
        padding-right: 20px;
    }
    .post {
        border: 1px solid #ccc;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 5px;
    }
    button {
        padding: 5px 10px;
        cursor: pointer;
    }
</style>