<?php
session_start();
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Controller{

  public function loginning(Request $request, Response $response, $args){
    if(isset($_COOKIE['login'])){
      $risultato=1;
      $token=$_COOKIE['login'];
      $conn = new MySQLi('my_mariadb', 'root', 'ciccio', 'playlist');
      $result = $conn->query( "SELECT email FROM accesso a INNER JOIN tokenn t on a.id_accesso=t.id_accesso WHERE token='$token'");
      $email = $result->fetch_array(MYSQLI_NUM);
      $response->getBody()->write(json_encode(array("risultato"=>$risultato, "id_accesso"=>$email)));
      return $response->withHeader("Content-type", "application/json")->withStatus(200);  
    }else{
      $risultato=0;
      $response->getBody()->write(json_encode(array("risultato"=>$risultato)));
      return $response->withHeader("Content-type", "application/json")->withStatus(200);  
    }
  }

  public function login(Request $request, Response $response, $args){
    
    $params = json_decode($request->getBody()->getContents(), true);
    $email = $params['email'];
    $pass = $params['pass'];
    $pass=hash("sha256",$pass);

    $conn = new MySQLi('my_mariadb', 'root', 'ciccio', 'playlist');
    $result = $conn->query("SELECT id_accesso FROM accesso WHERE email='$email' AND pass='$pass'");
    $row=$result->fetch_array(MYSQLI_NUM);
    if($result->num_rows > 0){
      $id_accesso = $row["id_accesso"];
      $token=bin2hex(random_bytes(48));
      setcookie("login", $token, time() + 86400 , "/");
      $result = $conn->query("INSERT INTO tokenn (token, id_accesso) 
      VALUES ('$token', '$id_accesso')");
      $risultato=1;
    }
    else{
      $risultato=0;
    }
    $response->getBody()->write(json_encode(array("token"=>$token, "email"=>$email, "risultato"=>$risultato)));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function signin(Request $request, Response $response, $args){
    
    $params = json_decode($request->getBody()->getContents(), true);
    $nome = $params['nome'];
    $cognome = $params['cognome'];
    $email = $params['email'];
    $pass = $params['pass'];
    $pass=hash("sha256",$pass);

    $conn = new MySQLi('my_mariadb', 'root', 'ciccio', 'playlist');
    $result = $conn->query("SELECT * FROM accesso WHERE email='$email'");
    
    if($result->num_rows == 1){
      $risultato=1;
    }
    else{
      $result = $conn->query("INSERT INTO accesso (nome, cognome, email, pass) 
      VALUES ('$nome', '$cognome', '$email', '$pass')");    
      $risultato=0;
    }
    $response->getBody()->write(json_encode(array("email"=>$email, "risultato"=>$risultato)));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function get_playlist(Request $request, Response $response, $args){
    $params = json_decode($request->getBody()->getContents(), true);
    $token = $params['token'];
    $conn = new MySQLi('my_mariadb', 'root', 'ciccio', 'playlist');

    $result = $conn->query("SELECT id_accesso FROM tokenn WHERE token='$token'");
    $results = $result->fetch_all(MYSQLI_ASSOC);
    foreach ($results as $row) {
      $id_accesso = $row['id_accesso'];
    }
    $result = $conn->query("SELECT * FROM canzone WHERE id_accesso='$id_accesso'");
    if($result->num_rows > 0){
      $canzoni = $result->fetch_all(MYSQLI_ASSOC);
    } else {
      $canzoni = [];
    }
    $response_data = [
      'canzoni' => $canzoni
    ];
    $response->getBody()->write(json_encode($response_data, JSON_NUMERIC_CHECK));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
}

  public function post_playlist(Request $request, Response $response, $args){
    
    $params = json_decode($request->getBody()->getContents(), true);
    $titolo = $params['titolo'];
    $artista = $params['artista'];
    $feat = $params['feat'];
    $genere = $params['genere'];
    $durata = $params['durata'];
    $email = $params['email'];

    $conn = new MySQLi('my_mariadb', 'root', 'ciccio', 'playlist');
    $conn->query("INSERT INTO canzone (titolo, artista, feat, genere, durata, email) 
    VALUES ('$titolo', '$artista', '$feat', '$genere', '$durata', '$email')");
    $risultato=1;
    $response->getBody()->write(json_encode(array("titolo"=>$titolo, "artista"=>$artista, "feat"=>$feat, "genere"=>$genere, "durata" => $durata, "risultato"=>$risultato)));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }
  public function delate(Request $request, Response $response, $args){
    sleep(2);
    $codice=$args["id"];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'playlist');
    $mysqli_connection->query("DELETE FROM canzone WHERE codice = '$codice'");
    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }
}