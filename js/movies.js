// js/movies.js
import { debounce, createMovieCard } from './utils.js';

// ទិន្នន័យភាពយន្តគំរូ (អាចជំនួសដោយការ fetch ពី ./data/movies.json របស់ក្រុម)
const sampleMovies = [
    { id: 1, title: "Inception", year: 2010, rating: 8.8, genres: ["Action", "Sci-Fi"], overview: "ចោរលួចការសម្ងាត់តាមរយៈការចូលទៅក្នុងសុបិនរបស់មនុស្ស ត្រូវបានផ្តល់ភារកិច្ចដាំគំនិតថ្មីចូលក្នុងចិត្តគោលដៅ។", poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
    { id: 2, title: "Interstellar", year: 2014, rating: 8.7, genres: ["Sci-Fi", "Drama"], overview: "ក្រុមអ្នករុករកធ្វើដំណើរឆ្លងកាត់ប្រហោងខ្មៅក្នុងអវកាសដើម្បីស្វែងរកភពថ្មីសម្រាប់សង្គ្រោះមនុស្សជាតិ។", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
    { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, genres: ["Action", "Drama"], overview: "Batman ត្រូវប្រឈមមុខនឹងឧក្រិដ្ឋជនដ៏គ្រោះថ្នាក់ Joker ដែលបង្កភាពវឹកវរពេញទីក្រុង Gotham។", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
    { id: 4, title: "Parasite", year: 2019, rating: 8.5, genres: ["Drama", "Comedy"], overview: "គ្រួសារក្រីក្រមួយបានបន្លំខ្លួនចូលធ្វើការក្នុងគ្រួសារអ្នកមានស្តុកស្តម្ភ រហូតបង្កជារឿងរ៉ាវនឹកស្មានមិនដល់។", poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
    { id: 5, title: "Get Out", year: 2017, rating: 7.8, genres: ["Horror", "Sci-Fi"], overview: "បុរសស្បែកខ្មៅម្នាក់បានដឹងការពិតដ៏គួរឱ្យរន្ធត់ពេលទៅលេងផ្ទះគ្រួសារមិត្តស្រីនៅចុងសប្តាហ៍។", poster: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg" },
    { id: 6, title: "Avengers: Endgame", year: 2019, rating: 8.4, genres: ["Action", "Sci-Fi"], overview: "ក្រុមវីរបុរសដែលនៅសេសសល់រួមដៃគ្នាដើម្បីកែប្រែទង្វើរបស់ Thanos និងនាំមនុស្សគ្រប់គ្នាត្រឡប់មកវិញ។", poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
    { id: 7, title: "The Hangover", year: 2009, rating: 7.7, genres: ["Comedy"], overview: "មិត្តភក្តិ ៣ នាក់ភ្ញាក់ពីដំណេកដោយបាត់កូនកំលោះ និងមិនចាំអ្វីទាំងអស់កាលពីយប់មិញនៅទីក្រុង Las Vegas។", poster: "https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg" },
    { id: 8, title: "A Quiet Place", year: 2018, rating: 7.5, genres: ["Horror", "Drama"], overview: "គ្រួសារមួយត្រូវរស់នៅក្នុងភាពស្ងៀមស្ងាត់បំផុតដើម្បីគេចពីសត្វចម្លែកដែលតាមប្រមាញ់តាមសំឡេង។", poster: "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg" }
];

// ចាប់យក DOM Elements
const movieGrid = document.getElementById('movieGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const genreBtns = document.querySelectorAll('.btn-genre');
const showMoreBtn = document.getElementById('showMoreBtn');
const emptyState = document.getElementById('emptyState');
const resultCount = document.getElementById('resultCount');

// State គ្រប់គ្រងទិន្នន័យ និងការចម្រោះ
let allMovies = [];
let filteredMovies = [];
let currentGenre = 'All';
let searchQuery = '';
let currentSort = 'default';

// កំណត់ចំនួនរឿងដែលត្រូវបង្ហាញក្នុង ១ ទំព័រ (Pagination)
const ITEMS_PER_PAGE = 4;
let visibleCount = ITEMS_PER_PAGE;

/**
 * ១. ចាប់ផ្តើមទាញទិន្នន័យរឿង
 */
async function init() {
    try {
        // ប្រសិនបើក្រុមមានឯកសារ data/movies.json សូមបើក comment ខាងក្រោម៖
        // const response = await fetch('./data/movies.json');
        // allMovies = await response.json();

        allMovies = sampleMovies;
        applyFiltersAndSort();
    } catch (error) {
        console.error("មានបញ្ហាក្នុងការទាញទិន្នន័យភាពយន្ត៖", error);
    }
}

/**
 * ២. មុខងារចម្រោះ (Search + Genre) និងតម្រៀប (Sort) រួមគ្នា
 */
function applyFiltersAndSort() {
    // ជំហានទី ១៖ ចម្រោះតាម Genre និងពាក្យស្វែងរក (Title ឬ Overview)
    filteredMovies = allMovies.filter(movie => {
        const matchesGenre = currentGenre === 'All' || movie.genres.includes(currentGenre);
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = movie.title.toLowerCase().includes(query) || 
                              movie.overview.toLowerCase().includes(query);
        return matchesGenre && matchesSearch;
    });

    // ជំហានទី ២៖ តម្រៀបតាមជម្រើសក្នុង Dropdown
    if (currentSort === 'rating-desc') {
        filteredMovies.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === 'rating-asc') {
        filteredMovies.sort((a, b) => a.rating - b.rating);
    } else if (currentSort === 'year-desc') {
        filteredMovies.sort((a, b) => b.year - a.year);
    } else if (currentSort === 'year-asc') {
        filteredMovies.sort((a, b) => a.year - b.year);
    }

    // កំណត់ចំនួនបង្ហាញមកត្រឹម ៤ វិញរាល់ពេលមានការស្វែងរក ឬប្តូរ Filter ថ្មី
    visibleCount = ITEMS_PER_PAGE;
    renderMovies();
}

/**
 * ៣. បង្ហាញបញ្ជីរឿងលើអេក្រង់
 */
function renderMovies() {
    resultCount.textContent = `បង្ហាញលទ្ធផល៖ ${filteredMovies.length} រឿង`;

    // ករណីរកមិនឃើញរឿង
    if (filteredMovies.length === 0) {
        movieGrid.innerHTML = '';
        emptyState.classList.remove('d-none');
        showMoreBtn.classList.add('d-none');
        return;
    }

    emptyState.classList.add('d-none');

    // កាត់យកតែចំនួនរឿងតាម visibleCount មកបង្ហាញ
    const moviesToShow = filteredMovies.slice(0, visibleCount);
    movieGrid.innerHTML = moviesToShow.map(movie => createMovieCard(movie)).join('');

    // បង្ហាញ ឬលាក់ប៊ូតុង "បង្ហាញបន្ថែម (Show More)"
    if (visibleCount < filteredMovies.length) {
        showMoreBtn.classList.remove('d-none');
    } else {
        showMoreBtn.classList.add('d-none');
    }
}

/**
 * ៤. Event Listeners សម្រាប់គ្រប់ Controls
 */
// Live Search ជាមួយ Debounce (300ms)
searchInput.addEventListener('input', debounce((e) => {
    searchQuery = e.target.value;
    applyFiltersAndSort();
}, 300));

// Genre Filter Buttons
genreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        genreBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentGenre = btn.dataset.genre;
        applyFiltersAndSort();
    });
});

// Sort Dropdown
sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    applyFiltersAndSort();
});

// ប៊ូតុង Show More (បន្ថែម ៤ រឿងម្តង)
showMoreBtn.addEventListener('click', () => {
    visibleCount += ITEMS_PER_PAGE;
    renderMovies();
});

// ចាប់ផ្តើមដំណើរការកូដ
init();