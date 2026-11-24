// js/utils.js

/**
 * ពន្យារពេលការហៅ Function ដើម្បីកុំឱ្យ Live Search ដើរញឹកញាប់ពេកពេលកំពុងវាយអក្សរ
 * @param {Function} func - មុខងារដែលត្រូវដំណើរការ
 * @param {number} delay - រយៈពេលរង់ចាំគិតជាមីលីវិនាទី (លំនាំដើម 300ms)
 */
export function debounce(func, delay = 300) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
}

/**
 * បង្កើតកូដ HTML សម្រាប់ Movie Card បែប Netflix (Bootstrap 5 Grid)
 * @param {Object} movie - ទិន្នន័យរឿងនីមួយៗ
 * @returns {string} HTML String
 */
export function createMovieCard(movie) {
    // គណនាភាគរយ Match ពីពិន្ទុ Rating (ឧទាហរណ៍៖ 8.8 -> 88% Match)
    const matchPercent = Math.round(movie.rating * 10);

    return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="netflix-card">
                <!-- ផ្នែករូបភាព Poster និង Rating Badge -->
                <div class="poster-wrapper">
                    <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
                    <div class="poster-gradient"></div>
                    <span class="netflix-rating-badge position-absolute top-0 end-0 m-2">
                        ★ ${movie.rating}
                    </span>
                </div>
                
                <!-- ផ្នែកព័ត៌មានលម្អិតខាងក្រោម -->
                <div class="p-3 pt-1 d-flex flex-column justify-content-between flex-grow-1">
                    <div>
                        <h5 class="text-heading fw-bold text-truncate mb-1" title="${movie.title}">
                            ${movie.title}
                        </h5>
                        
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <span class="netflix-match">${matchPercent}% Match</span>
                            <span class="small text-secondary">• ${movie.year}</span>
                            <span class="badge border border-secondary text-light" style="font-size: 0.65rem;">HD</span>
                        </div>

                        <p class="small mb-2" style="color: #e50914; font-weight: 500;">
                            ${movie.genres.join(' • ')}
                        </p>

                        <p class="overview-truncate mb-3">
                            ${movie.overview}
                        </p>
                    </div>

                    <!-- ប៊ូតុងភ្ជាប់ទៅទំព័រលម្អិតរបស់ Member 3 -->
                    <a href="movie-detail.html?id=${movie.id}" class="btn btn-netflix btn-sm w-100 py-2">
                        ▶ មើលលម្អិត
                    </a>
                </div>
            </div>
        </div>
    `;
}