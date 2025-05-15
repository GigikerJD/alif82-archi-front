INSERT INTO Acteur (lastname, firstname, DOB) VALUES
('Pitt', 'Brad', '1963-12-18'),
('Johansson', 'Scarlett', '1984-11-22'),
('DiCaprio', 'Leonardo', '1974-11-11'),
('Lawrence', 'Jennifer', '1990-08-15'),
('Clooney', 'George', '1961-05-06'),
('Portman', 'Natalie', '1981-06-09'),
('Damon', 'Matt', '1970-10-08'),
('Stone', 'Emma', '1988-11-06'),
('Bale', 'Christian', '1974-01-30'),
('Streep', 'Meryl', '1949-06-22');

-- Insertion de données dans la table Movie
INSERT INTO Movie (title, duration, language, subtitles, minimumAge, director, startingDate, endDate, showDay) VALUES
('Inception', 148, 'Anglais', 'Français', 12, 'Christopher Nolan', '2023-01-15', '2023-02-15', '19:30:00'),
('La La Land', 128, 'Anglais', 'Français', 8, 'Damien Chazelle', '2023-02-01', '2023-03-01', '21:00:00'),
('Le Parrain', 175, 'Anglais', 'Français', 16, 'Francis Ford Coppola', '2023-03-10', '2023-04-10', '20:00:00'),
('Amélie', 122, 'Français', 'Anglais', 10, 'Jean-Pierre Jeunet', '2023-04-01', '2023-05-01', '18:45:00'),
('Parasite', 132, 'Coréen', 'Français, Anglais', 14, 'Bong Joon-ho', '2023-05-15', '2023-06-15', '20:30:00'),
('Interstellar', 169, 'Anglais', 'Français', 10, 'Christopher Nolan', '2023-06-01', '2023-07-01', '19:00:00'),
('Le Voyage de Chihiro', 125, 'Japonais', 'Français, Anglais', 8, 'Hayao Miyazaki', '2023-07-15', '2023-08-15', '17:15:00'),
('The Dark Knight', 152, 'Anglais', 'Français', 12, 'Christopher Nolan', '2023-08-01', '2023-09-01', '20:15:00');

-- Insertion de données dans la table Days
INSERT INTO Days (day) VALUES
('Lundi'),
('Mardi'),
('Mercredi'),
('Jeudi'),
('Vendredi'),
('Samedi'),
('Dimanche');

-- Insertion de données dans la table Owner
INSERT INTO Owner (email, password, adresse, lastname, firstname, DOB, movieTheatre) VALUES
('martin.dupont@cinema.fr', 'hash_password123', '10 rue du Cinéma, Paris', 'Dupont', 'Martin', '1975-05-12', 'Cinéma Paradiso'),
('julie.durand@cinema.fr', 'hash_password456', '25 avenue des Films, Lyon', 'Durand', 'Julie', '1982-11-08', 'Le Grand Écran'),
('pierre.laurent@cinema.fr', 'hash_password789', '5 boulevard des Stars, Marseille', 'Laurent', 'Pierre', '1968-03-21', 'CinéVille'),
('sophie.bernard@cinema.fr', 'hash_password101', '15 rue du Festival, Cannes', 'Bernard', 'Sophie', '1979-07-30', 'Lumière Cinéma');

-- Insertion de données dans la table Jouer (acteurs dans les films)
INSERT INTO Jouer (id_acteur, id_movie) VALUES
(3, 'Inception'),
(7, 'Inception'),
(2, 'La La Land'),
(8, 'La La Land'),
(1, 'Le Parrain'),
(5, 'Le Parrain'),
(6, 'Amélie'),
(4, 'Parasite'),
(3, 'Interstellar'),
(10, 'Interstellar'),
(8, 'Le Voyage de Chihiro'),
(9, 'The Dark Knight');

-- Insertion de données dans la table Visionner (jours de projection des films)
INSERT INTO Visionner (id_movie, id_day) VALUES
('Inception', 1),
('Inception', 4),
('Inception', 6),
('La La Land', 2),
('La La Land', 5),
('La La Land', 7),
('Le Parrain', 3),
('Le Parrain', 6),
('Amélie', 1),
('Amélie', 5),
('Parasite', 2),
('Parasite', 7),
('Interstellar', 4),
('Interstellar', 6),
('Le Voyage de Chihiro', 3),
('Le Voyage de Chihiro', 7),
('The Dark Knight', 1),
('The Dark Knight', 5);

-- Insertion de données dans la table Posseder (propriétaires des films)
INSERT INTO Posseder (id_owner, id_movie) VALUES
('martin.dupont@cinema.fr', 'Inception'),
('martin.dupont@cinema.fr', 'Le Parrain'),
('julie.durand@cinema.fr', 'La La Land'),
('julie.durand@cinema.fr', 'Amélie'),
('pierre.laurent@cinema.fr', 'Parasite'),
('pierre.laurent@cinema.fr', 'Interstellar'),
('sophie.bernard@cinema.fr', 'Le Voyage de Chihiro'),
('sophie.bernard@cinema.fr', 'The Dark Knight');