# What are some ways to prevent unnecessary re-renders in React, and when would you use each technique?

- To prevent unnecessary re-renders in React, we can use the following techniques:

- React.memo:
    Wrap functional components in React.memo to prevent re-renders when the props have not changed. Useful for optimizing performance in functional components.

- useCallback:
    Memoize callback functions with useCallback to avoid creating new function instances on each render, which can help prevent unnecessary re-renders of child components that depend on these callbacks.

- useMemo:
    Use useMemo to memoize expensive calculations and avoid recalculating them on every render. This can help optimize performance for components that rely on complex calculations.

# What are some practical uses of React Context and React Hooks?

React Context:

- Global State Management:
    Provide a way to pass data through the component tree without manually passing props at every level. Useful for themes, user authentication, and application settings.

- Avoid Prop Drilling:
    Simplify state management by avoiding the need to pass props through many layers of components.

- Custom Context Providers:
    Create custom providers for managing specific pieces of state or functionality that are used across multiple components.

React Hooks:

- useState:
    Manage local component state in functional components.
- useEffect:
    Perform side effects like data fetching or subscriptions in functional components.
- useCustomHook:
    Create reusable hooks for encapsulating and sharing logic between components.
- useReducer:
    Manage more complex state logic in functional components, similar to how we might use reducers in Redux.

# What are some other ways caching could be implemented for Part I? What are the differences and why might you choose one over the other?

- In-Memory Caching:
    Store data in memory for fast access. Simple to implement but may not be suitable for large amounts of data or long-term persistence.

- Local Storage:
    Use browser local storage to persist data across sessions. Suitable for non-sensitive data but has size limitations and is less secure.

- SWR (Stale-While-Revalidate)
    SWR is a library developed by Vercel for data fetching that implements the stale-while-revalidate strategy. It keeps the data fresh by revalidating in the background while serving stale data instantly.

# Difference

- Performance:
    In-memory caching is the fastest but limited by memory. Local Storage and IndexedDB offer persistence but may be slower.

- Capacity:
    IndexedDB and server-side caching handle larger volumes of data compared to local storage.

- SWR offers a simpler API compared to react-query and focuses on the revalidation strategy. It is lighter and more flexible, but it may require more manual configuration for complex scenarios.

# What are some practical steps to prevent XSS and CSRF?

Preventing XSS (Cross-Site Scripting):

- Sanitizing user input with libraries like DOMPurify
- Avoiding innerHTML when possible, using textContent instead
- Implementing a Content Security Policy

Preventing CSRF (Cross-Site Request Forgery):

- Use CSRF tokens in all forms and API requests
- Ensure our backend sets SameSite cookie attributes
- Use custom headers in API requests

# When using traditional session cookies, what are the primary security concerns and mitigation techniques you might use for common attacks?

Security Concerns:

- Cookie Theft:
    Someone stealing the cookie to pretend to be you.

- Eavesdropping:
    Someone spying on your internet traffic.

- Old Sessions:
    Cookies that don't expire, leaving accounts open.

Mitigation Techniques:

- Use HTTPS: This encrypts all communication.
- Set Cookie Flags:
    HttpOnly: Stops JavaScript from reading cookies.
    Secure: Only sends cookies over HTTPS.
    SameSite: Limits cookies to your website.
- Timeout Sessions: Make cookies expire after a while.
- New Session on Login: Create a fresh session when users log in.

# What are some advantages and disadvantages to using JWT for authorization and authentication in a web application?

Advantages:

Stateless:
    The server doesn't need to store session information.
    Easier to scale across multiple servers.

Mobile-friendly:
    Works well for native mobile apps and single-page applications.

Cross-domain / CORS:
    Easy to use across different domains.

Performance:
    Can reduce database lookups for user info.

Flexibility:
    Can include custom data in the token.

Disadvantages:

- Size:
    JWTs can be larger than session IDs, increasing payload size and bandwidth.
- Revocation:
    Revoking JWTs before they expire can be challenging, as they are not stored on the server.
- Security Risks:
    Needs careful handling of secret keys.
    Proper token storage on client-side is crucial.

# What are some new/interesting Web (browser), React, or Node.js features you are interested in, or have used recently for the first time?

Web (Browser):

- WebAssembly:
    Allows running high-performance code in the browser, enabling more complex applications to run client-side.
- Web Vitals:
    A set of metrics that measure user experience and performance, helping developers optimize their applications.

React:

- Concurrent Mode:
    Provides a way to improve the responsiveness of React applications by allowing React to interrupt and resume rendering work.
- React Server Components:
    Enable server-side rendering of components to optimize loading times and improve performance.

Node.js:

- ESM (ECMAScript Modules):
    Native support for ES modules in Node.js, allowing the use of import and export statements.