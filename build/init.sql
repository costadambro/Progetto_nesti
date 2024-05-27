CREATE TABLE utente(
  id_utente int PRIMARY KEY auto_increment,
  email varchar(20) NOT NULL,
  nome varchar(64) NOT NULL,
  cognome varchar(64) NOT NULL,
  pass char(128) NOT NULL,
  token varchar(128) NOT NULL
);
CREATE TABLE canzone(
  id_canzone int not null PRIMARY KEY auto_increment,
  titolo varchar(64) NOT NULL,
  artista varchar(64) NOT NULL,
  feat varchar(64),
  genere varchar(64) NOT NULL,
  durata varchar(64) NOT NULL,
  id_utente int NOT NULL,
  FOREIGN KEY (id_utente) REFERENCES utente(id_utente)
);