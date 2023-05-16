import React from 'react';
import { Navbar } from './components/Navbar';
import { BOOKS } from './Books';
import { BookCard } from './components/BookCard';

export const App = () => {
  console.log(BOOKS);

  return (
    <div>
      <Navbar />
      <div className="mt-4 pb-4 w-full px-8 mx-auto grid grid-cols-1 grid-rows-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-4">
        {BOOKS.map((book) => (
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
