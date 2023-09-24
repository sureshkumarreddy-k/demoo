function searchBooks() {
    const searchQuery = document.getElementById('searchInput').value;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}`;

    // Clear previous search results
    document.getElementById('results').innerHTML = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const bookInfo = item.volumeInfo;
                    const title = bookInfo.title;
                    const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';
                    const description = bookInfo.description || 'No description available';
                    
                    const resultDiv = document.createElement('div');
                    resultDiv.innerHTML = `
                        <h2>${title}</h2>
                        <p>Author(s): ${authors}</p>
                        <p>${description}</p>
                    `;

                    document.getElementById('results').appendChild(resultDiv);
                });
            } else {
                document.getElementById('results').innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('results').innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
}
