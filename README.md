
# TVmaze Show Gallery (React)

## 1. Description and How to Run

This project is a React version of my Assignment 4 TV show gallery, built using React and Vite. It uses the TVmaze API to search for TV shows and display information about them.

The app has two main pages:
- **Gallery (`/`):** Search for TV shows and view up to 10 results with details such as ratings, genres, cast members, and posters.
- **Show Details (`/shows/:id`):** View more information about a selected show, including its full cast, status, and network.

### How to Run

First, install the dependencies:

```bash
npm install
```

Then, start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal to view the app.

## 2. Required React Concepts

| # | Concept | Where It Appears in the Code |
|---|---|---|
| 1 | **Components and Props** | `App.jsx` and `src/components/` — Components pass data using props, such as `shows` and `show`. |
| 2 | **Lists and Keys** | `ShowList.jsx` and `CastList.jsx` — Use `.map()` to display lists with unique keys. |
| 3 | **Conditional Rendering** | `ResultsStatus.jsx`, `CastList.jsx`, and `ShowDetail.jsx` — Display loading, error, and empty states. |
| 4 | **Controlled Form** | `SearchForm.jsx` — Uses `value`, `onChange`, and `onSubmit` to manage the search input. |
| 5 | **State** | `Gallery.jsx`, `ShowCard.jsx`, and `ShowDetail.jsx` — Use `useState` to manage results, cast, and loading status. |
| 6 | **Effects and Fetch** | `Gallery.jsx` and `ShowCard.jsx` — Use `useEffect` and `fetch` to load data from the API. |
| 7 | **Lifted State** | `Gallery.jsx` — Keeps search state in the parent component and shares it through props. |
| 8 | **Routing** | `App.jsx`, `ShowCard.jsx`, and `ShowDetail.jsx` — Use React Router, `Link`, and `useParams` to navigate between pages. |

## 3. Reflection

Rebuilding my TV show gallery in React was easier in some ways, but it also came with a few challenges.

In my previous assignment using vanilla JavaScript, I had to create HTML elements manually and update the DOM whenever the data changed. With React, I could use JSX to describe what I wanted to display, and React handled the updates for me. Using components also made my code more organized, especially when displaying shows, cast members, and search results.

The hardest part was understanding where to keep the state. I used `useState` in `Gallery` because the search form, results list, and status message all needed to share the same information. By keeping the state in the parent component, I could pass it down through props instead of managing it separately in each component.

I also had to learn how to use `useEffect` correctly when fetching data from the API and managing dependencies.

Overall, React made my code cleaner and easier to manage compared to vanilla JavaScript, although understanding state and hooks took some practice.
