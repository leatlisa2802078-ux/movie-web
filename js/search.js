/**
 * ==========================================================
 * MOVIESTREAM — LIVE SEARCH ENGINE
 * Debounced instant search, live dropdown results, and query routing.
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initGlobalSearch();
});

function initGlobalSearch() {
    const searchWrapper = document.getElementById('search-wrapper');
    const searchInput = document.getElementById('global-search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchDropdownList = document.getElementById('search-dropdown-list');
    const searchDropdownCount = document.getElementById('search-dropdown-count');
    const searchToggleBtn = document.getElementById('search-toggle-btn');
    const searchViewAllBtn = document.getElementById('search-view-all');

    if (!searchInput || !searchDropdown) return;

    let debounceTimer = null;
    const isInsidePages = window.location.pathname.includes('/pages/');
    const basePath = isInsidePages ? '' : 'pages/';

    // Toggle Mobile Search
    if (searchToggleBtn && searchWrapper) {
        searchToggleBtn.addEventListener('click', () => {
            searchWrapper.classList.toggle('mobile-active');
            if (searchWrapper.classList.contains('mobile-active')) {
                searchInput.focus();
            }
        });
    }

    // Input listener with 280ms debounce
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        // Show/hide clear button
        if (searchClearBtn) {
            searchClearBtn.style.display = query.length > 0 ? 'block' : 'none';
        }

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            executeLiveSearch(query);
        }, 280);
    });

    // Clear button action
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchClearBtn.style.display = 'none';
            searchDropdown.classList.remove('open');
            searchInput.focus();
        });
    }

    // Execute live search
    function executeLiveSearch(query) {
        if (!query || query.length < 2) {
            searchDropdown.classList.remove('open');
            return;
        }

        const results = MovieService.filterAndSort({ query });
        renderDropdownResults(results, query);
    }

    // Render dropdown list
    function renderDropdownResults(movies, query) {
        searchDropdownList.innerHTML = '';

        if (movies.length === 0) {
            searchDropdownCount.textContent = '0 results';
            searchDropdownList.innerHTML = `
                <div style="padding: 1.5rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
                    No movies found matching "<strong>${escapeHtml(query)}</strong>"
                </div>
            `;
            searchDropdown.classList.add('open');
            return;
        }

        searchDropdownCount.textContent = `${movies.length} found`;

        // Display top 5 matches in dropdown
        const previewMatches = movies.slice(0, 5);
        previewMatches.forEach(movie => {
            const item = document.createElement('div');
            item.className = 'search-item';
            item.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="search-item-thumb">
                <div class="search-item-info">
                    <div class="search-item-title">${highlightText(movie.title, query)}</div>
                    <div class="search-item-meta">
                        <span><i class="fa-solid fa-star text-gold"></i> ${movie.rating}</span>
                        <span>•</span>
                        <span>${movie.year}</span>
                        <span>•</span>
                        <span>${movie.genres[0]}</span>
                    </div>
                </div>
            `;

            item.addEventListener('click', () => {
                searchDropdown.classList.remove('open');
                if (typeof openMovieDetailsModal === 'function') {
                    openMovieDetailsModal(movie.id);
                } else {
                    window.location.href = `${basePath}watch.html?id=${movie.id}`;
                }
            });

            searchDropdownList.appendChild(item);
        });

        // Update "View all results" link
        if (searchViewAllBtn) {
            searchViewAllBtn.href = `${basePath}movies.html?search=${encodeURIComponent(query)}`;
        }

        searchDropdown.classList.add('open');
    }

    // Enter key submits search to movies.html
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchDropdown.classList.remove('open');
                window.location.href = `${basePath}movies.html?search=${encodeURIComponent(query)}`;
            }
        }
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
        if (!searchWrapper.contains(e.target)) {
            searchDropdown.classList.remove('open');
        }
    });
}

// Helpers
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span style="color: var(--accent-red); font-weight: 700;">$1</span>');
}
