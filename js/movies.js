/**
 * ==========================================================
 * MOVIESTREAM — MOVIES DATA & SERVICE LAYER
 * Comprehensive movie catalog, filtering, and watchlist store.
 * ==========================================================
 */

const MOVIE_CATALOG = [
    {
        id: 1,
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        duration: "2h 49m",
        ageRating: "PG-13",
        genres: ["Sci-Fi", "Adventure", "Drama"],
        director: "Christopher Nolan",
        cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine",
        synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        trailerEmbed: "https://www.youtube.com/embed/zSWdZVtXT7E",
        isTrending: true,
        isPopular: true,
        isTopRated: true,
        popularityScore: 99
    },
    {
        id: 2,
        title: "Cyberpunk: Neon Edge",
        year: 2024,
        rating: 8.4,
        duration: "2h 12m",
        ageRating: "R",
        genres: ["Action", "Sci-Fi", "Crime"],
        director: "Denis Villeneuve",
        cast: "Ryan Gosling, Ana de Armas, Harrison Ford, Sylvia Hoeks",
        synopsis: "In a rain-drenched dystopian metropolis dominated by rogue AI syndicates, an augmented detective uncovers a long-buried conspiracy that threatens the fragile equilibrium of humanity.",
        poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        trailerEmbed: "https://www.youtube.com/embed/gCcx85zbxz4",
        isTrending: true,
        isPopular: true,
        isTopRated: false,
        popularityScore: 98
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        duration: "2h 32m",
        ageRating: "PG-13",
        genres: ["Action", "Crime", "Drama"],
        director: "Christopher Nolan",
        cast: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
        synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        trailerEmbed: "https://www.youtube.com/embed/EXeTwQWrcwY",
        isTrending: false,
        isPopular: true,
        isTopRated: true,
        popularityScore: 95
    },
    {
        id: 4,
        title: "Dune: Part Two",
        year: 2024,
        rating: 8.6,
        duration: "2h 46m",
        ageRating: "PG-13",
        genres: ["Sci-Fi", "Adventure", "Action"],
        director: "Denis Villeneuve",
        cast: "Timothée Chalamet, Zendaya, Rebecca Ferguson, Javier Bardem",
        synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe.",
        poster: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        trailerEmbed: "https://www.youtube.com/embed/Way9Dexny3w",
        isTrending: true,
        isPopular: true,
        isTopRated: true,
        popularityScore: 97
    },
    {
        id: 5,
        title: "Gladiator: Blood & Honor",
        year: 2024,
        rating: 8.2,
        duration: "2h 28m",
        ageRating: "R",
        genres: ["Action", "Drama", "Adventure"],
        director: "Ridley Scott",
        cast: "Paul Mescal, Pedro Pascal, Denzel Washington, Connie Nielsen",
        synopsis: "Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after the powerful emperors of Rome conquer his home.",
        poster: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        trailerEmbed: "https://www.youtube.com/embed/4rgYUipGJNo",
        isTrending: true,
        isPopular: true,
        isTopRated: false,
        popularityScore: 92
    },
    {
        id: 6,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        duration: "2h 28m",
        ageRating: "PG-13",
        genres: ["Sci-Fi", "Action", "Adventure"],
        director: "Christopher Nolan",
        cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
        synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the mission.",
        poster: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        trailerEmbed: "https://www.youtube.com/embed/YoHD9XEInc0",
        isTrending: false,
        isPopular: true,
        isTopRated: true,
        popularityScore: 94
    },
    {
        id: 7,
        title: "Oppenheimer",
        year: 2023,
        rating: 8.9,
        duration: "3h 00m",
        ageRating: "R",
        genres: ["Drama", "History"],
        director: "Christopher Nolan",
        cast: "Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.",
        synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
        poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        trailerEmbed: "https://www.youtube.com/embed/uYPbbksJxIg",
        isTrending: true,
        isPopular: true,
        isTopRated: true,
        popularityScore: 96
    },
    {
        id: 8,
        title: "Spider-Man: Across the Spider-Verse",
        year: 2023,
        rating: 8.7,
        duration: "2h 20m",
        ageRating: "PG",
        genres: ["Animation", "Action", "Adventure"],
        director: "Joaquim Dos Santos, Kemp Powers",
        cast: "Shameik Moore, Hailee Steinfeld, Oscar Isaac, Jake Johnson",
        synopsis: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash, Miles finds himself pitted against the other Spiders.",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        trailerEmbed: "https://www.youtube.com/embed/cqGjhVJWtEg",
        isTrending: true,
        isPopular: true,
        isTopRated: true,
        popularityScore: 95
    },
    {
        id: 9,
        title: "Shadows in the Abyss",
        year: 2024,
        rating: 7.9,
        duration: "1h 58m",
        ageRating: "R",
        genres: ["Horror", "Mystery", "Sci-Fi"],
        director: "Ari Aster",
        cast: "Florence Pugh, Jack Reynor, William Jackson Harper",
        synopsis: "A team of deep-sea oceanographers unearths a dormant extraterrestrial monolith resting in the Mariana Trench, awakening an ancient cosmic entity with psychological consequences.",
        poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        trailerEmbed: "https://www.youtube.com/embed/zSWdZVtXT7E",
        isTrending: false,
        isPopular: true,
        isTopRated: false,
        popularityScore: 84
    },
    {
        id: 10,
        title: "The Grand Escape",
        year: 2023,
        rating: 8.1,
        duration: "1h 48m",
        ageRating: "PG-13",
        genres: ["Comedy", "Adventure", "Crime"],
        director: "Wes Anderson",
        cast: "Bill Murray, Ralph Fiennes, Willem Dafoe, Adrien Brody",
        synopsis: "A whimsical recount of an audacious prison break organized by a refined pastry chef and an eclectic gang of poetic outlaws across 1930s Eastern Europe.",
        poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        trailerEmbed: "https://www.youtube.com/embed/YoHD9XEInc0",
        isTrending: false,
        isPopular: false,
        isTopRated: false,
        popularityScore: 81
    },
    {
        id: 11,
        title: "Chronicles of Starlight",
        year: 2022,
        rating: 8.3,
        duration: "2h 15m",
        ageRating: "PG-13",
        genres: ["Romance", "Sci-Fi", "Drama"],
        director: "Spike Jonze",
        cast: "Joaquin Phoenix, Rooney Mara, Amy Adams",
        synopsis: "Two interstellar astronauts stationed on opposite sides of a wormhole communicate through encrypted light beams, sparking a profound love story spanning decades.",
        poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        trailerEmbed: "https://www.youtube.com/embed/zSWdZVtXT7E",
        isTrending: false,
        isPopular: true,
        isTopRated: false,
        popularityScore: 86
    },
    {
        id: 12,
        title: "Pulp Fiction",
        year: 1994,
        rating: 8.9,
        duration: "2h 34m",
        ageRating: "R",
        genres: ["Crime", "Drama"],
        director: "Quentin Tarantino",
        cast: "John Travolta, Uma Thurman, Samuel L. Jackson, Bruce Willis",
        synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&q=80",
        backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        trailerEmbed: "https://www.youtube.com/embed/s7EdQ4FqbhY",
        isTrending: false,
        isPopular: true,
        isTopRated: true,
        popularityScore: 91
    }
];

// --- DATA ACCESS & QUERY API ---

const MovieService = {
    getAll: () => MOVIE_CATALOG,

    getById: (id) => MOVIE_CATALOG.find(m => m.id === parseInt(id)),

    getTrending: () => MOVIE_CATALOG.filter(m => m.isTrending),

    getPopular: () => MOVIE_CATALOG.filter(m => m.isPopular),

    getTopRated: () => [...MOVIE_CATALOG].sort((a, b) => b.rating - a.rating),

    getByGenre: (genre) => {
        if (!genre || genre.toLowerCase() === 'all') return MOVIE_CATALOG;
        return MOVIE_CATALOG.filter(m => 
            m.genres.some(g => g.toLowerCase() === genre.toLowerCase())
        );
    },

    getSimilar: (movieId, count = 4) => {
        const current = MovieService.getById(movieId);
        if (!current) return MOVIE_CATALOG.slice(0, count);
        return MOVIE_CATALOG
            .filter(m => m.id !== current.id)
            .sort((a, b) => {
                const aShared = a.genres.filter(g => current.genres.includes(g)).length;
                const bShared = b.genres.filter(g => current.genres.includes(g)).length;
                return bShared - aShared;
            })
            .slice(0, count);
    },

    filterAndSort: ({ genre = 'all', year = 'all', sortBy = 'popularity', query = '' }) => {
        let results = [...MOVIE_CATALOG];

        // 1. Search filter
        if (query.trim()) {
            const q = query.toLowerCase().trim();
            results = results.filter(m => 
                m.title.toLowerCase().includes(q) ||
                m.director.toLowerCase().includes(q) ||
                m.cast.toLowerCase().includes(q) ||
                m.genres.some(g => g.toLowerCase().includes(q))
            );
        }

        // 2. Genre filter
        if (genre && genre.toLowerCase() !== 'all') {
            results = results.filter(m => 
                m.genres.some(g => g.toLowerCase() === genre.toLowerCase())
            );
        }

        // 3. Year filter
        if (year && year !== 'all') {
            if (year === 'classic') {
                results = results.filter(m => m.year < 2020);
            } else if (year === '2020-2021') {
                results = results.filter(m => m.year === 2020 || m.year === 2021);
            } else {
                results = results.filter(m => m.year === parseInt(year));
            }
        }

        // 4. Sort
        switch (sortBy) {
            case 'rating-desc':
                results.sort((a, b) => b.rating - a.rating);
                break;
            case 'year-desc':
                results.sort((a, b) => b.year - a.year);
                break;
            case 'title-asc':
                results.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'popularity':
            default:
                results.sort((a, b) => b.popularityScore - a.popularityScore);
                break;
        }

        return results;
    }
};

// --- WATCHLIST & LOCALSTORAGE SERVICE ---

const WatchlistStore = {
    KEY: 'moviestream_watchlist',

    getIds: () => {
        try {
            return JSON.parse(localStorage.getItem(WatchlistStore.KEY)) || [1, 2];
        } catch {
            return [1, 2];
        }
    },

    has: (id) => {
        const ids = WatchlistStore.getIds();
        return ids.includes(parseInt(id));
    },

    toggle: (id) => {
        const parsedId = parseInt(id);
        let ids = WatchlistStore.getIds();
        const exists = ids.includes(parsedId);

        if (exists) {
            ids = ids.filter(i => i !== parsedId);
        } else {
            ids.push(parsedId);
        }

        localStorage.setItem(WatchlistStore.KEY, JSON.stringify(ids));
        window.dispatchEvent(new CustomEvent('watchlistUpdated', { detail: { id: parsedId, added: !exists } }));
        return !exists;
    },

    clear: () => {
        localStorage.removeItem(WatchlistStore.KEY);
        window.dispatchEvent(new CustomEvent('watchlistUpdated', { detail: { cleared: true } }));
    },

    getMovies: () => {
        const ids = WatchlistStore.getIds();
        return MOVIE_CATALOG.filter(m => ids.includes(m.id));
    }
};

// --- COMPONENT FACTORY: RENDER MOVIE CARD ---

function createMovieCard(movie, options = {}) {
    const isWatchlisted = WatchlistStore.has(movie.id);
    const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';

    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('data-id', movie.id);

    card.innerHTML = `
        <div class="card-poster-wrapper">
            <img src="${movie.poster}" alt="${movie.title}" class="card-poster-img" loading="lazy">
            <div class="card-overlay"></div>
            
            <div class="card-top-badges">
                <span class="card-rating-badge">
                    <i class="fa-solid fa-star text-gold"></i> ${movie.rating}
                </span>
                ${options.rank ? `<span class="card-rank-badge">#${options.rank}</span>` : ''}
            </div>

            <div class="card-hover-actions">
                <a href="${basePath}watch.html?id=${movie.id}" class="card-play-btn" title="Watch Now" onclick="event.stopPropagation()">
                    <i class="fa-solid fa-play"></i>
                </a>
            </div>
        </div>

        <div class="card-info">
            <h4 class="card-title" title="${movie.title}">${movie.title}</h4>
            <div class="card-meta">
                <span>${movie.year} • ${movie.duration}</span>
                <span class="card-genres">${movie.genres[0]}</span>
            </div>
        </div>
    `;

    // Click on entire card opens modal
    card.addEventListener('click', () => {
        if (typeof openMovieDetailsModal === 'function') {
            openMovieDetailsModal(movie.id);
        }
    });

    return card;
}
