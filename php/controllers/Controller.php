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
      $result = $conn->query( "SELECT email FROM utente a INNER JOIN tokenn t on a.id_utente=t.id_utente WHERE token='$token'");
      $email = $result->fetch_array(MYSQLI_NUM);
      $response->getBody()->write(json_encode(array("risultato"=>$risultato, "id_utente"=>$email)));
      return $response->withHeader("Content-type", "application/json")->withStatus(200);  
    }else{
      $risultato=0;
      $response->getBody()->write(json_encode(array("risultato"=>$risultato)));
      return $response->withHeader("Content-type", "application/json")->withStatus(200);  
    }
  }

  public function login(Request $request, Response $response, $args){
    
    $params = json_decode($request->getBody()->getContents(), true);
    $stm = Database::getInstance()->prepare("SELECT id_utente, token FROM utene WHERE email = :email AND pass = :pass");
    $stm->bindParam(':email', $params['email'], PDO::PARAM_STR);
    $stm->bindParam(':pass', hash("sha256", $params['pass']), PDO::PARAM_STR);
    $stm->execute();
    if($stm['id_utente']!=null){
      $token = $row["token"];
      $id_utente = $row["id_utente"];
      $risultato=1;
    }
    else{
      $risultato=0;
    }
    $response->getBody()->write(json_encode(array("token"=>$token, "id_utente"=>$id_utente, "risultato"=>$risultato)));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function signin(Request $request, Response $response, $args){
    
    $params = json_decode($request->getBody()->getContents(), true);
    $stm = Database::getInstance()->prepare("SELECT id_utente FROM utene WHERE email = :email");
    $stm->bindParam(':email', $params['email'], PDO::PARAM_STR);
    
    $stm->execute();
    $stm=$stm->fetch(PDO::FETCH_ASSOC);

    if($stm['id_utente']!=null){
      $risultato=1;
    }
    else{
      $token=bin2hex(random_bytes(48));
      $stm = Database::getInstance()->prepare("INSERT INTO utente (nome, cognome, email, pass, token) 
      VALUES (:nome, :cognome, :email, :pass, :token)");    
      $stm->bindParam(':nome', $params['nome'], PDO::PARAM_STR);
      $stm->bindParam(':cognome', $params['cognome'], PDO::PARAM_STR);
      $stm->bindParam(':email', $params['email'], PDO::PARAM_STR);
      $stm->bindParam(':pass', hash("sha256", $params['pass']), PDO::PARAM_STR);
      $stm->bindParam(':token', $token, PDO::PARAM_STR);
      $stm->execute();
      $risultato=0;
    }
    $response->getBody()->write(json_encode(array("risultato"=>$risultato)));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function get_playlist(Request $request, Response $response, $args){
    $params = json_decode($request->getBody()->getContents(), true);
    $token = $params['token'];
    $conn = new MySQLi('my_mariadb', 'root', 'ciccio', 'playlist');

    $result = $conn->query("SELECT id_utente FROM tokenn WHERE token='$token'");
    $results = $result->fetch_all(MYSQLI_ASSOC);
    foreach ($results as $row) {
      $id_utente = $row['id_utente'];
    }
    $result = $conn->query("SELECT * FROM canzone WHERE id_utente='$id_utente'");
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