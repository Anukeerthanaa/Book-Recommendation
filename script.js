const ageCategories = [
  { min: 0, max: 12, genre: "children" },
  { min: 13, max: 17, genre: "young adult" },
  { min: 18, max: 30, genre: "fiction" },
  { min: 31, max: 50, genre: "non-fiction" },
  { min: 51, max: 100, genre: "biography" }
];

async function getBookSuggestions() {
  const age = document.getElementById("ageInput").value;
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  if (!age || age < 0 || age > 100) {
      alert("Please enter a valid age.");
      return;
  }

  const category = ageCategories.find(c => age >= c.min && age <= c.max);
  if (!category) return;

  try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category.genre}&orderBy=newest&maxResults=5`);
      const data = await response.json();

      data.items.forEach(book => {
          const bookCard = document.createElement("div");
          bookCard.classList.add("book-card");
          bookCard.innerHTML = `<h3>${book.volumeInfo.title}</h3>
                                <p>Author: ${book.volumeInfo.authors?.join(", ") || "Unknown"}</p>`;
          bookList.appendChild(bookCard);
      });

  } catch (error) {
      alert("Failed to fetch book suggestions.");
  }
}
