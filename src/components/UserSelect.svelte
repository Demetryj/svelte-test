<script>
    import { users } from '../store/store.js';
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
  
    function selectUser(event) {
        const userId = parseInt(event.target.value);
        dispatch('selectUser', userId);
    }
</script>

<select on:change="{selectUser}">
    <option value="">-- Select User --</option>
    {#each $users as user}
        <option value="{user.id}">{user.name}</option>
    {/each}
</select>

<style>
    select {
        padding: 10px;
        font-size: 16px;
    }
</style>