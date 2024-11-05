# Simple Todo Application

## Technologies Used

**Supabase**: For backend services and real-time database capabilities.
**Next.js**: For server-side rendering and routing.
**TanStack Query**: For data fetching, caching, and state management.
**React.js**: For building the user interface.

## Key Features

### Real-Time Updates
Utilizes Supabase's real-time capabilities to reflect changes in the todo list instantly across all clients.
Users can see updates made by others without needing to refresh the page.

### Optimistic Updates
Implements optimistic UI updates to enhance user experience.
When a user adds or removes a todo, the UI updates immediately, providing instant feedback while the request is processed in the background.
