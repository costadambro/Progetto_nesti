import { useState } from 'react';

export default function Canzone({ musica, Stampa }) {

    const [inCancellazione, setInCancellazione] = useState(false);
    const [inModifica, setInModifica] = useState(false);
    const [inConfermaC, setInConfermaC] = useState(false);
    const [inConfermaM, setInConfermaM] = useState(false);
    const [canc, setCanc] = useState(true);

    const [titolo, setTitolo] = useState("");
    const [artista, setArtista] = useState("");
    const [feat, setFeat] = useState("");
    const [genere, setGenere] = useState("");
    const [durata, setDurata] = useState("");

    function handleChange(e, setter) {
        setter(e.target.value);
    }
    async function cancellaAlunno() {
        setInCancellazione(true);
        await fetch(`http://localhost:8080/playlist1/${musica.codice}`, { method: "DELETE" });
        Stampa();
        setInCancellazione(false);

    }
    async function modificaAlunno() {
        setInModifica(true);
        await fetch(`http://localhost:8080/playlist1/${musica.codice}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titolo: titolo, artista: artista, feat: feat, genere: genere, durata: durata }),
        });
    }
    function RichiestaCancella() {
        setInConfermaC(true);
    }
    function annullaCancella() {
        setInConfermaC(false);
    }
    function richiediConfermaM() {
        setCanc(false);
        setInConfermaM(true);
    }
    function annullaM() {
        setInConfermaM(false);
        setCanc(true);
    }
    return (
        <div>
            {musica.titolo} - {musica.artista} - {musica.feat} - {musica.genere} - {musica.durata}
            {inCancellazione ?
                <> in cancellazione... </>
                :
                <>{canc &&
                    <>
                    {inConfermaC ?
                        <> Sei sicuro?
                            <button onClick={cancellaAlunno}>si</button>
                            <button onClick={annullaCancella}>no</button>
                        </>
                        :
                        <button onClick={RichiestaCancella}>Cancella </button>
                    }
                    </>
                }
                </>
            }
            {inModifica ?
                <> in modifica... </>
                :
                <>
                    {inConfermaM ?
                        <><br></br>
                            <input type="text" onChange={(e) => handleChange(e, setTitolo)} value={titolo} placeholder="Titolo" /><br></br>
                            <input type="text" onChange={(e) => handleChange(e, setArtista)} value={artista} placeholder="Artista" /><br></br>
                            <input type="text" onChange={(e) => handleChange(e, setFeat)} value={feat} placeholder="Featuring" /><br></br>
                            <select placeholder="genere" onChange={(e) => handleChange(e, setGenere)} value={genere}>
                                <option value="" disabled selected>Genere</option>
                                <option value="pop">Pop</option>
                                <option value="hip hop">Hip Hop</option>
                                <option value="rap">Rap</option>
                                <option value="altro">Altro</option>
                            </select><br></br>
                            <input type="number" onChange={(e) => handleChange(e, setDurata)} value={durata} placeholder="Durata" /><br></br>

                            <button onClick={modificaAlunno}>modifica</button>
                            <button onClick={annullaM}>annulla</button>
                        </>
                        :
                        <button onClick={richiediConfermaM}>Modifica </button>
                    }
                </>
            }
            <hr />
        </div>
    );
}