<script>
    import { selectedPostId } from '../store/store.js';
    import { getPostComments, deleteComment, addComment } from '../api/posts.js';
    import { onDestroy } from 'svelte';
    
    let post = {};
    let currentComments = [];
    let showComm = false;
    let newComment = { name: '', email: '', body: '' };
    
  
    const unsubscribe = selectedPostId.subscribe(async value => {
        if (value) {
            try {
            const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${value}`);
                if (!postResponse.ok) throw new Error('Error fetching post');
                post = await postResponse.json();
            } catch (error) {
                console.error(error);
            }
        } else {
            post = {};
            currentComments = [];
            showComm = false;
        }
    });
    
    async function toggleComments() {
        showComm = !showComm;
        if (showComm && currentComments.length === 0) {
            try {
                const fetchedComments = await getPostComments($selectedPostId);
                currentComments = fetchedComments;
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    async function handleDelete(commentId) {
        try {
            await deleteComment(commentId);
            currentComments = currentComments.filter(c => c.id !== commentId);
        } catch (error) {
            console.error(error);
        }
    }
    
    async function handleAddComment() {
        if (newComment.name && newComment.email && newComment.body) {
            try {
                const addedComment = await addComment($selectedPostId, newComment);
                currentComments = [...currentComments, addedComment];
                newComment = { name: '', email: '', body: '' };
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="post-details">
    <h2>Post Details</h2>
    <p>{post.body}</p>
    <button on:click={toggleComments}>
        {showComm ? 'Hide Comments' : 'Show Comments'}
    </button>
    {#if showComm}
        <div class="comments">
            <h3>Comments</h3>
            {#each currentComments as comment}
                <div class="comment">
                    <p><strong>{comment.name}</strong> ({comment.email})</p>
                    <p>{comment.body}</p>
                    <button on:click={() => handleDelete(comment.id)}>X</button>
                </div>
            {/each}
            <form on:submit|preventDefault={handleAddComment}>
                <h4>Add a Comment</h4>
                <input type="text" placeholder="Name" bind:value={newComment.name} required />
                <input type="email" placeholder="Email" bind:value={newComment.email} required />
                <textarea placeholder="Comment" bind:value={newComment.body} required></textarea>
                <button type="submit">Add</button>
            </form>
        </div>
    {/if}
</div>

<style>
    .post-details {
        margin-top: 20px;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .comments {
        margin-top: 20px;
    }
    .comment {
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
        position: relative;
    }
    .comment button {
        position: absolute;
        right: 0;
        top: 10px;
        background: red;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
    }
    form {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }
    form input, form textarea {
        margin-bottom: 10px;
        padding: 8px;
        font-size: 14px;
    }
    form button {
        width: 100px;
        padding: 8px;
        cursor: pointer;
    }
</style>