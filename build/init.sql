CREATE TABLE accesso(
  id_accesso int PRIMARY KEY auto_increment,
  email varchar(20) NOT NULL,
  nome varchar(64) NOT NULL,
  cognome varchar(64) NOT NULL,
  pass char(128) NOT NULL
);
CREATE TABLE tokenn(
  id_token int not null PRIMARY KEY auto_increment,
  token varchar(128) NOT NULL,
  id_accesso int NOT NULL,
  FOREIGN KEY (id_accesso) REFERENCES accesso(id_accesso)
);
CREATE TABLE canzone(
  id_canzone int not null PRIMARY KEY auto_increment,
  titolo varchar(64) NOT NULL,
  artista varchar(64) NOT NULL,
  feat varchar(64),
  genere varchar(64) NOT NULL,
  durata varchar(64) NOT NULL,
  id_accesso int NOT NULL,
  FOREIGN KEY (id_accesso) REFERENCES accesso(id_accesso)
);