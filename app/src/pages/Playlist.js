import { useState} from 'react';
import '../css/Playlist.css';
import Canzone from './Canzone.js';

export default function Playlist({ token, email }) {
    const [musiche, setMusica] = useState([]);
    const [titolo, setTitolo] = useState("");
    const [artista, setArtista] = useState("");
    const [feat, setFeat] = useState("");
    const [genere, setGenere] = useState("");
    const [durata, setDurata] = useState("");
    const [errorVuoto, setErrorVuoto] = useState(false);

    const [inCancellazione, setInCancellazione] = useState(false);
    const [paginaStampa, setPaginaStampa] = useState(true);

    function handleChange(e, setter) {
        setter(e.target.value);
    }

    async function Stampa() {
        setInCancellazione(true);
        const response = await fetch(`http://localhost:8080/playlist1`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token })
        });
        const a = await response.json();
        setMusica(a.canzoni);
        setInCancellazione(false);
    };

    async function aggiungi() {
        if (titolo !== "" && artista !== "" && genere !== "" && genere !== "") {
            const response = await fetch(`http://localhost:8080/playlist2`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titolo: titolo, artista: artista, feat: feat, genere: genere, durata: durata, email: email })
            });
            const a = await response.json();
            annulla();
        }
        else {
            setErrorVuoto(true);
        }
    };

    async function annulla() {
        setTitolo("");
        setArtista("");
        setFeat("");
        setGenere("");
        setDurata("");
    };
    async function PStampa() {
        setPaginaStampa(false);
    };
    

    return (
        <>
            <div className='body'>
                { paginaStampa ?
                <>
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
                    <div className='form cards'>
                        <div className="title">Playlist<br></br><span>inserisci i dati di una canzone</span></div>
                        <input className="input" type="text" onChange={(e) => handleChange(e, setTitolo)} value={titolo} placeholder="Titolo" />
                        <input className="input" type="text" onChange={(e) => handleChange(e, setArtista)} value={artista} placeholder="Artista" />
                        <input className="input" type="text" onChange={(e) => handleChange(e, setFeat)} value={feat} placeholder="Featuring" />
                        <select className="input" placeholder="genere" onChange={(e) => handleChange(e, setGenere)} value={genere}>
                            <option value="" disabled selected>Genere</option>
                            <option value="pop">Pop</option>
                            <option value="hip hop">Hip Hop</option>
                            <option value="rap">Rap</option>
                            <option value="altro">Altro</option>
                        </select>
                        <input className="input" type="number" onChange={(e) => handleChange(e, setDurata)} value={durata} placeholder="Durata" />
                        <div className="div">
                            <button className="button-confirm" onClick={aggiungi}>Aggiungi</button>
                            <button className="button-confirm" onClick={annulla}>Annulla</button><br></br>
                            <button class="button-confirm" onClick={PStampa}>Stampa →</button>
                        </div>
                        
                    </div>
                </>
                :
                <>
                <hr />
                <div className="div">
                        {inCancellazione ? (
                            <div className="progress-loader">
                                <div className="progress"></div>
                            </div>
                        ) : (
                            Array.isArray(musiche) && musiche.map((musica) => (
                                <Canzone musica={musica} Stampa={Stampa} setPaginaStampa={setPaginaStampa}></Canzone>
                            ))
                        )}
                    </div>
                    </>
}
            </div>
            
        </>
    )
}