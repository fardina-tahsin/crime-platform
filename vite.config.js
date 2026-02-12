import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                login: 'frontend/login.html',
                feed: 'frontend/feed.html',
                profile: 'frontend/profile.html',
                editProfile: 'frontend/edit-profile.html'
            }
        }
    }
});
