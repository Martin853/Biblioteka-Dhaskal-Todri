import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BOOKS } from './Books';
import { BookCard } from './components/BookCard';

export const App = () => {
  const [query, setQuery] = useState('');

  const filteredBooks = BOOKS.filter((book) => {
    if (query === '') {
      return true;
    }

    return book.Emërtimi.toLowerCase().includes(query.toLowerCase().trim());
  });

  return (
    <div>
      <Navbar setQuery={setQuery} />
      <div className="mt-4 pb-4 w-full px-8 mx-auto grid grid-cols-1 grid-rows-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-4">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.Nr}
            title={book.Emërtimi}
            author={book.Autori}
            publisher={book.ShtëpiaBotuese}
            year={book.VitiIBotimit}
          />
        ))}
      </div>
    </div>
  );
};
