<script>
    import { selectedPostId } from '../store/store.js';
    import { onDestroy } from 'svelte';

    let selectedPost = null;
    let user = null;

    const unsubscribe = selectedPostId.subscribe(async value => {
        if (value) {
            try {
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${value}`);
                if (!postResponse.ok) throw new Error('Error fetching post');
                selectedPost = await postResponse.json();

                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedPost.userId}`);
                if (!userResponse.ok) throw new Error('Error fetching user');
                user = await userResponse.json();
            } catch (error) {
                console.error(error);
            }
        } else {
            user = null;
        }
    });

     onDestroy(() => {
        unsubscribe();
    });
</script>

{#if user}
    <div class="sidebar">
        <h2>User Information</h2>
        <div class="user-card">
            <div class="block">
                <h3>Contact</h3>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>
            </div>
            <div class="block">
                <h3>Address</h3>
                <p><strong>Street:</strong> {user.address.street}</p>
                <p><strong>City:</strong> {user.address.city}</p>
            </div>
            <div class="block">
                <h3>Company</h3>
                <p><strong>Name:</strong> {user.company.name}</p>
                <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
                <p><strong>BS:</strong> {user.company.bs}</p>
            </div>
        </div>
    </div>
{/if}

<style>
    .sidebar {
        width: 30%;
        border-left: 1px solid #ccc;
        padding-left: 20px;
    }
    .user-card {
        display: flex;
        flex-direction: column;
    }
    .block {
        margin-bottom: 15px;
    }
    h3 {
        margin-bottom: 5px;
    }
</style>