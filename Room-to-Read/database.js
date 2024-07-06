import * as SQLite from 'expo-sqlite';

export const openDatabaseAsync = async () => {
  const db = await SQLite.openDatabaseAsync('SchoolDB.db');
  return db;
};

export const initializeDatabase = async () => {
  const db = await openDatabaseAsync();

  // await db.execAsync(`
  //   PRAGMA foreign_keys = ON;
  //   PRAGMA journal_mode = WAL;

  //   -- Drop tables if they exist
  //   DROP TABLE IF EXISTS TransactionsCheckOut;
  //   DROP TABLE IF EXISTS TransactionsCheckIn;
  //   DROP TABLE IF EXISTS Students;
  //   DROP TABLE IF EXISTS Books;
  //   DROP TABLE IF EXISTS Stock;
  //   DROP TABLE IF EXISTS Teachers;

  //   -- Create Teachers table
  //   CREATE TABLE IF NOT EXISTS Teachers (
  //     TeacherID INTEGER PRIMARY KEY AUTOINCREMENT,
  //     TeacherName TEXT NOT NULL,
  //     SchoolID INTEGER NOT NULL,
  //     Password TEXT NOT NULL
  //   );

  //   -- Insert dummy data into Teachers table
  //   INSERT INTO Teachers (TeacherName, SchoolID, Password) VALUES ('Teacher1', 1, 'password1');
  //   INSERT INTO Teachers (TeacherName, SchoolID, Password) VALUES ('Teacher2', 2, 'password2');
  //   INSERT INTO Teachers (TeacherName, SchoolID, Password) VALUES ('Teacher3', 3, 'password3');

  //   -- Create Books table
  //   CREATE TABLE IF NOT EXISTS Books (
  //     Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  //     Book_Name TEXT NOT NULL,
  //     Level INTEGER NOT NULL,
  //     Language TEXT NOT NULL,
  //     Genres TEXT NOT NULL,
  //     Last_TID INTEGER NOT NULL,
  //     Available BOOLEAN DEFAULT 1
  //   );

  //   -- Insert data into Books table if empty (ensure unique Book_ID)
  //   INSERT OR IGNORE INTO Books (Book_Name, Level, Language, Genres, Last_TID)
  //   VALUES 
  //     ('Panchatantra', 1, 'Hindi', 'Fables, Classic', 101),
  //     ('Malgudi Days', 2, 'Kannada', 'Fiction, Drama', 102),
  //     ('Chandamama', 3, 'Telugu', 'Fantasy, Adventure', 103),
  //     ('Aithihyamala', 4, 'Malayalam', 'Mythology, Classic', 104),
  //     ('Thirukkural', 5, 'Tamil', 'Ethics, Classic', 105),
  //     ('Pather Panchali', 6, 'Bengali', 'Drama, Classic', 106),
  //     ('Chandrakanta', 1, 'Hindi', 'Fantasy, Romance', 107),
  //     ('Gitanjali', 2, 'Bengali', 'Poetry, Classic', 108),
  //     ('Shivaji The Great', 3, 'Marathi', 'Historical, Classic', 109),
  //     ('Godaan', 4, 'Hindi', 'Drama, Classic', 110);

  //   -- Create Stock table
  //   CREATE TABLE IF NOT EXISTS Stock (
  //     Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  //     Book_Name TEXT NOT NULL,
  //     Level INTEGER NOT NULL,
  //     Language TEXT NOT NULL,
  //     Genres TEXT NOT NULL,
  //     Last_TID INTEGER NOT NULL
  //   );

  //   -- Insert data into Stock table if empty (ensure unique Book_ID)
  //   INSERT OR IGNORE INTO Stock (Book_Name, Level, Language, Genres, Last_TID)
  //   VALUES 
  //     ('Panchatantra', 1, 'Hindi', 'Fables, Classic', 101),
  //     ('Malgudi Days', 2, 'Kannada', 'Fiction, Drama', 102),
  //     ('Chandamama', 3, 'Telugu', 'Fantasy, Adventure', 103),
  //     ('Aithihyamala', 4, 'Malayalam', 'Mythology, Classic', 104),
  //     ('Thirukkural', 5, 'Tamil', 'Ethics, Classic', 105),
  //     ('Pather Panchali', 6, 'Bengali', 'Drama, Classic', 106),
  //     ('Chandrakanta', 1, 'Hindi', 'Fantasy, Romance', 107),
  //     ('Gitanjali', 2, 'Bengali', 'Poetry, Classic', 108),
  //     ('Shivaji The Great', 3, 'Marathi', 'Historical, Classic', 109),
  //     ('Godaan', 4, 'Hindi', 'Drama, Classic', 110);

  //   -- Create Students table
  //   CREATE TABLE IF NOT EXISTS Students (
  //     StudentID INTEGER PRIMARY KEY AUTOINCREMENT,
  //     Name TEXT NOT NULL,
  //     DateOfBirth DATE NOT NULL,
  //     Books_Read TEXT NOT NULL,
  //     Current_Level INTEGER NOT NULL
  //   );

  //   -- Insert data into Students table if empty (ensure unique StudentID)
  //   INSERT OR IGNORE INTO Students (Name, DateOfBirth, Books_Read, Current_Level)
  //   VALUES 
  //     ('Aarav', '2010-01-01', '{"1": 5, "2": 3, "3": 0, "4": 0, "5": 0, "6": 0}', 2),
  //     ('Vivaan', '2011-02-01', '{"1": 4, "2": 4, "3": 2, "4": 0, "5": 0, "6": 0}', 3),
  //     ('Aditya', '2012-03-01', '{"1": 6, "2": 5, "3": 3, "4": 1, "5": 0, "6": 0}', 4),
  //     ('Ananya', '2013-04-01', '{"1": 3, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0}', 1),
  //     ('Diya', '2014-05-01', '{"1": 5, "2": 4, "3": 2, "4": 0, "5": 0, "6": 0}', 3),
  //     ('Ishaan', '2015-06-01', '{"1": 6, "2": 6, "3": 6, "4": 6, "5": 5, "6": 1}', 6),
  //     ('Kabir', '2016-07-01', '{"1": 6, "2": 5, "3": 5, "4": 3, "5": 0, "6": 0}', 4),
  //     ('Aditi', '2017-08-01', '{"1": 2, "2": 1, "3": 0, "4": 0, "5": 0, "6": 0}', 2),
  //     ('Reyansh', '2018-09-01', '{"1": 4, "2": 4, "3": 4, "4": 3, "5": 2, "6": 0}', 5),
  //     ('Saanvi', '2019-10-01', '{"1": 6, "2": 6, "3": 6, "4": 5, "5": 4, "6": 3}', 6);

  //   -- Create TransactionsCheckOut table
  //   CREATE TABLE IF NOT EXISTS TransactionsCheckOut (
  //     TID TEXT PRIMARY KEY,
  //     Student TEXT NOT NULL,
  //     Book TEXT NOT NULL,
  //     Date TEXT NOT NULL
  //   );

  //   -- Create TransactionsCheckIn table
  //   CREATE TABLE IF NOT EXISTS TransactionsCheckIn (
  //     TID TEXT PRIMARY KEY,
  //     Student TEXT NOT NULL,
  //     Book TEXT NOT NULL,
  //     Date TEXT NOT NULL,
  //     Feedback TEXT NOT NULL,
  //     FineAmount INTEGER DEFAULT 0
  //   );
  // `);
  
};
