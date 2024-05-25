
import { useState } from 'react';
import '../css/App.css';

export default function Signin({setPagina}) {
  const [error, setError] = useState(false);
  const [errorVuoto, setErrorVuoto] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [Load, setLoad] = useState(true);

  function gestisciCambioNome(e){
      setNome(e.target.value);
    }
    function gestisciCambioCognome(e){
      setCognome(e.target.value);
    }
    function gestisciCambioEmail(e){
      setEmail(e.target.value);
    }
    function gestisciCambioPass(e){
      setPass(e.target.value);
    }
    function ControllerPass(e){
      setPass2(e.target.value);
    }

  async function signin() {
    setLoad(false);
    if(nome!="" && cognome!="" && email!="" && pass!=""){
      if(pass==pass2){
          const response = await fetch(`http://localhost:8080/signin`, { 
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: nome, cognome: cognome, email: email, pass: pass }),
        });
        const a = await response.json();
        
        if(a.risultato==0){
          setPagina(true);
        }else{
          setError(true);
        }
      }
      else{

      }
    }
    else{
      setErrorVuoto(true);
    }
    setLoad(true);
  };
  async function login() {
    setPagina(true);
  };

  return(
      <>
      {
      Load ?
      <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
      <div className="dfs"></div>
      <div className="page-background">
          <p>×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜× ×͜×</p>
      </div>
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
                    {
                      error &&
                      <>                            
                      <div className="error">
                          <div className="error__icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
                          </div>
                          <div className="error__title">E-Mail già in uso</div>
                          <div className="error__close"><svg xmlns="https://www.w3.org/TR/SVG2/" width="20" viewBox="0 0 20 20" height="20"><path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path></svg></div>
                      </div>
                      </>
                    }
                    {
                      errorVuoto &&
                      <>                            
                      <div className="error">
                          <div className="error__icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
                          </div>
                          <div className="error__title">Riempire tutti i campi</div>
                          <div className="error__close"><svg xmlns="https://www.w3.org/TR/SVG2/" width="20" viewBox="0 0 20 20" height="20"><path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path></svg></div>
                      </div>
                      </>
                    }
                        <div className="card  text-white">
                            <div className="card-body p-5 text-center mb-md-5 mt-md-4 pb-5">
                              <h2 className="fw-bold mb-2 text-uppercase rnbw">Sign-in</h2>
                              <div className="form-outline form-white mb-4">
                                  <input type="text" onChange={gestisciCambioNome} value={nome} className="form-control form-control-lg"  placeholder="Nome"/>
                              </div>
                              <div className="form-outline form-white mb-4">
                                  <input type="text" onChange={gestisciCambioCognome} value={cognome} className="form-control form-control-lg"  placeholder="Cognome"/>
                              </div>
                              <div className="form-outline form-white mb-4">
                                  <input type="email" onChange={gestisciCambioEmail} value={email} className="form-control form-control-lg"  placeholder="Email"/>
                              </div>
                              <div className="form-outline form-white mb-4">
                                  <input type="password" onChange={gestisciCambioPass} value={pass} className="form-control form-control-lg"  placeholder="Password"/>
                              </div>
                              <div className="form-outline form-white mb-4">
                                  <input type="password" onChange={ControllerPass} value={pass2} className="form-control form-control-lg"  placeholder="Contollo Password"/>
                              </div>
                              <div className="login-buttons">
                                <button  onClick={signin} className="fw-bold mb-2 text-uppercase qqq btn btn-outline-light btn-lg px-5" type="submit">
                                    Sign in
                                </button>
                                <button onClick={login} className="fw-bold mb-2 text-uppercase qqq btn btn-outline-light btn-lg px-5" type="submit">
                                    Log in
                                </button>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        <p></p>
        </>
        :
        <>
        <div className="loader">Loading
        <span></span>
        </div>
        </>
        }
      </>
    )
}