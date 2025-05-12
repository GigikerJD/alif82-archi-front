-- Create the Acteur table
CREATE TABLE Acteur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(255),
    firstname VARCHAR(255),
    DOB DATE
);

-- Create the Movie table
CREATE TABLE Movie (
    title VARCHAR(255) PRIMARY KEY,
    duration INT,
    language VARCHAR(255),
    subtitles VARCHAR(255),
    minimumAge INT,
    director VARCHAR(255),
    startingDate DATE,
    endDate DATE,
    showDay DATE
);

-- Create the Days table
CREATE TABLE Days (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day VARCHAR(255)
);

-- Create the Owner table
CREATE TABLE Owner (
    email VARCHAR(255) PRIMARY KEY,
    adresse VARCHAR(255),
    lastname VARCHAR(255),
    firstname VARCHAR(255),
    DOB DATE,
    movieTheatre VARCHAR(255)
);

-- Create the Jouer table
CREATE TABLE Jouer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_acteur INT,
    id_movie VARCHAR(255),
    FOREIGN KEY (id_acteur) REFERENCES Acteur(id),
    FOREIGN KEY (id_movie) REFERENCES Movie(title)
);

-- Create the Visionner table
CREATE TABLE Visionner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_movie VARCHAR(255),
    id_day INT,
    FOREIGN KEY (id_movie) REFERENCES Movie(title),
    FOREIGN KEY (id_day) REFERENCES Days(id)
);

-- Create the Posseder table
CREATE TABLE Posseder (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_owner VARCHAR(255),
    id_movie VARCHAR(255),
    FOREIGN KEY (id_owner) REFERENCES Owner(email),
    FOREIGN KEY (id_movie) REFERENCES Movie(title)
);
