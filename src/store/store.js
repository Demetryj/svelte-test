import { writable } from "svelte/store";

export const posts = writable([]);

export const selectedPostId = writable(null);

export const selectedUserId = writable(null);

export const users = writable([]);

export const comments = writable([]);

export const showComments = writable(false);
