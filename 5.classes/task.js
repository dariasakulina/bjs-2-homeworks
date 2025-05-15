class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  fix() {
    this.state = this._state * 1.5;
  }

  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

const sherlock = new PrintEditionItem(
  "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
  2019,
  1008
);

console.log(sherlock.releaseDate);
console.log(sherlock.state);
sherlock.fix();
console.log(sherlock.state);

const picknick = new FantasticBook(
  "Аркадий и Борис Стругацкие",
  "Пикник на обочине",
  1972,
  168
);

console.log(picknick.author);
picknick.state = 10;
console.log(picknick.state);
picknick.fix();
console.log(picknick.state);

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    for (let book of this.books) {
      if (book[type] === value) {
        return book;
      }
    }
    return null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex(book => book.name === bookName);
    if (index !== -1) {
      return this.books.splice(index, 1)[0];
    }
    return null;
  }
}

const library = new Library("Библиотека имени Ленина");

library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);
library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(library.findBookBy("name", "Властелин колец"));
console.log(library.findBookBy("releaseDate", 1924).name);

console.log("Количество книг до выдачи: " + library.books.length);

const givenBook = library.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library.books.length);

givenBook.state = 10;
console.log("Состояние после повреждения:", givenBook.state);

givenBook.fix();
console.log("Состояние после восстановления:", givenBook.state);

library.addBook(givenBook);
console.log("Количество книг после возврата поврежденной книги:", library.books.length);

givenBook.fix();
givenBook.fix();

library.addBook(givenBook);
console.log("Количество книг после полного восстановления и возврата:", library.books.length);

const testLibrary = new Library("Библиотека имени Маяковского");

testLibrary.addBook(new DetectiveBook("Агата Кристи", "Убийство в Восточном экспрессе", 1934, 256));
testLibrary.addBook(new FantasticBook("Дуглас Адамс", "Автостопом по Галактике", 1979, 640));
testLibrary.addBook(new NovelBook("Лев Толстой", "Война и мир", 1869, 1225));
testLibrary.addBook(new Magazine("Наука и жизнь", 2023, 98));

let found1919 = testLibrary.findBookBy("releaseDate", 1919);

if (!found1919) {
  const oldBook = new Book("Уильям Сомерсет Моэм", "Луна и грош", 1919, 288);
  testLibrary.addBook(oldBook);
  found1919 = oldBook;
}

console.log("Найдена книга 1919 года:", found1919.name);

const issuedBook = testLibrary.giveBookByName("Автостопом по Галактике");
console.log("Выдана книга:", issuedBook.name);
console.log("Количество книг в библиотеке после выдачи:", testLibrary.books.length);

issuedBook.state = 10;
console.log("Состояние после повреждения:", issuedBook.state);

issuedBook.fix(); 
issuedBook.fix(); 
issuedBook.fix(); 
console.log("Состояние после восстановления:", issuedBook.state);

testLibrary.addBook(issuedBook);
console.log("Количество книг после возврата:", testLibrary.books.length);

const isReturned = testLibrary.findBookBy("name", "Автостопом по Галактике") !== null;
console.log("Книга возвращена в библиотеку:", isReturned ? "Да" : "Нет");