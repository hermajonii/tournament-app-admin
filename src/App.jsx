import { useState, useEffect } from 'react'

function App() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [key, setKey] = useState("");
  const [key2, setKey2] = useState("");
  const [key3, setKey3] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [Player1, setPlayer1] = useState("");
  const [Player2, setPlayer2] = useState("");
  const [activeTab, setActiveTab] = useState("r");
  const [players, setPlayers] = useState({});
  const [newName, setNewName] = useState("");
  const [newScore, setNewScore] = useState(1);  
  const [signups, setSignups] = useState("");
  const handleAddPlayer = () => {
  if (!newName.trim()) return;
  setPlayers(prev => ({ ...prev, [newName]: newScore }));
  setNewName("");
  setNewScore(0);
};
  const fetchPlayers = async () => {
    try {
      const res = await fetch(`http://localhost:5000/players`);
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      console.error("Greška prilikom učitavanja rezultata:", err);
    }
  };
  
  const fetchSignups = async () => {
    try {
      const res = await fetch(`http://localhost:5000/signups`);
      const data = await res.json();
      setSignups(data);
    } catch (err) {
      console.error("Greška prilikom učitavanja rezultata:", err);
    }
  };
  useEffect(() => {
    fetchSignups();
    fetchPlayers();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sadržaj koji će se upisati u fajl
    const content = { key:key, first:team1, second:team2, firstScore:score1, secondScore:score2 };
    try { 
      const res = await fetch("http://localhost:5000/add-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      setMessage(data.message)
    } catch (err) {
      console.error("Greška:", err.message);
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    // Sadržaj koji će se upisati u fajl
    const content = { first: Player1, second: Player2, key:key2};
    try {
      const res = await fetch("http://localhost:5000/change-players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      setMessage2(data.message)
    } catch (err) {
      console.error("Greška:", err.message);
    }
  };
  const handleSubmit3 = async (e) => {
    e.preventDefault();
    try {
      const content ={players:players, key:key3};
      const res = await fetch("http://localhost:5000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      setMessage3(data.message)
    } catch (err) {
      console.error("Greška:", err.message);
    }
  };

  return (
    
    <>
    <div className='bg-black'>
      <ul className="nav nav-tabs border-evergreen p-0 m-0">
        <li className="nav-item bg-evergreen border-black rounded-start ">
        <button
            className={`nav-link ${activeTab === "r" ? "active bg-evergreen text-light border-evergreen px-1" : "text-evergreen px-1 bg-black border-evergreen border-bottom"}`}
            onClick={() => setActiveTab("r")}
        >
          Rezultati
        </button>
        </li>
        <li className="nav-item text-light bg-evergreen rounded-end">
        <button
            className={`nav-link  ${activeTab === "z" ? "active bg-evergreen text-light border-evergreen px-1" : "text-evergreen px-1 bg-black border-evergreen border-bottom"}`}
            onClick={() => {setActiveTab("z");}}
        >
          Zamena
        </button>
        </li>
        <li className="nav-item text-light bg-evergreen rounded-end">
        <button
            className={`nav-link  ${activeTab === "players" ? "active bg-evergreen text-light border-evergreen px-1" : "text-evergreen px-1 bg-black border-evergreen border-bottom"}`}
            onClick={() => {setActiveTab("players");}}
        >
          Pobede
        </button>
        </li>
       
          <li className="nav-item text-light bg-evergreen rounded-end">
            <button
                className={`nav-link  ${activeTab === "prijave" ? "active bg-evergreen text-light border-evergreen px-1" : "text-evergreen px-1 bg-black border-evergreen border-bottom"}`}
                onClick={() => {setActiveTab("prijave");}}
            >
              Prijave
            </button>
          </li>
        
        
      </ul>
    </div>
    <div className="d-flex align-items-center justify-content-center bg-black">
      {activeTab === "r" && (
        <div className="card shadow-lg bg-black text-light p-4 rounded border-evergreen">
        <h1 className="text-center mb-4 text-light bg-gradient rounded p-3">Rezultat utakmice</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3 text-light text-center">
            <div className="col">
              <label className="form-label">Tim 1</label>
              <input
                type="number"
                className="form-control text-center"
                placeholder=""
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
                required
                min = "0" 
              />
            </div>
            -
            <div className="col">
              <label className="form-label">Tim 2</label>
              <input
                type="number"
                className="form-control text-center"
                placeholder=""
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
                required
                min = "0" 
              />
            </div>
          </div>

          <div className="row mb-3  text-light text-center">
            <div className="col">
              <label className="form-label">Score 1</label>
              <input
                type="number"
                className="form-control text-center"
                placeholder=""
                value={score1}
                onChange={(e) => setScore1(e.target.value)}
                required
                min = "0" 
              />
            </div>
            -
            <div className="col">
              <label className="form-label">Score 2</label>
              <input
                type="number"
                className="form-control text-center"
                placeholder=""
                value={score2}
                onChange={(e) => setScore2(e.target.value)}
                required
                min = "0" 
              />
            </div>
          </div>

          <div className="my-4">
            <input
              type="password"
              className="form-control bg-dark border-0"
              placeholder="very secret key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <p className="text-info text-center">{message}</p>
          <button type="submit" className="btn btn-outline-light w-100 btn-lg assign-btn">
            POŠALJI REZULTAT
          </button>
        </form>
      </div>
      )}
      
      {activeTab === "z" && (
        <div className="d-flex align-items-center justify-content-center bg-black pt-3">
          <div className="card shadow-lg bg-black text-light p-4 rounded border-evergreen">
            <h1 className="text-center mb-4 text-light bg-gradient rounded p-3"> Zamena mesta: </h1>
            <form onSubmit={handleSubmit2}>
              <div className="row mb-3 text-light text-center">
                <div className="col">
                  <label className="form-label">Igrač 1</label>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder=""
                    value={Player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                    required
                    min = "0" 
                  />
                </div>
                sa
                <div className="col">
                  <label className="form-label">Igrač 2</label>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder=""
                    value={Player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                    required
                    min = "0" 
                  />
                </div>
              </div>
              <div className="my-4">
                <input
                  type="password"
                  className="form-control bg-dark border-0"
                  placeholder="very secret key"
                  value={key2}
                  onChange={(e) => setKey2(e.target.value)}
                />
              </div>
            
              <p className="text-info text-center">{message2}</p>
              <button type="submit" className="btn btn-outline-light w-100 btn-lg assign-btn">
                ZAMENI
              </button>
            </form>
          </div>
        </div>
      )}  
    
    {activeTab === "players" && (
      <div className="m-2">
        <form onSubmit={handleSubmit3}>
          <table className="table table-bordered border-0">
            <thead>
              <tr>
                <td className="bg-black text-orange text-center pb-1 align-middle border-dark form-subtitle">Osoba</td>
                <td className="bg-black text-orange text-center pb-1 align-middle border-dark form-subtitle">Pobede</td>
                <td className="bg-black border-dark"></td>
              </tr>
            </thead>
            <tbody>
              {Object.entries(players).map(([name, score]) => (
                <tr key={name}>
                  <td className="bg-black text-light text-center pb-1 align-middle border-dark">{name}</td>
                  <td className="bg-black text-light text-center pb-1 align-middle border-dark">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setPlayers(prev => ({ ...prev, [name]: parseInt(prev[name]) - 1 }))}
                      >▼</button>
                      <span>{score}</span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setPlayers(prev => ({ ...prev, [name]: parseInt(prev[name]) + 1 }))}
                      >▲</button>
                    </div>
                  </td>
                  <td className="bg-black text-center align-middle border-dark">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setPlayers(prev => {
                        const updated = { ...prev };
                        delete updated[name];
                        return updated;
                      })}
                    >✕</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="bg-black border-dark">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ime igrača"
                    className="form-control bg-dark text-light border-0 text-center"
                  />
                </td>
                <td className="bg-black border-dark">
                  <input
                    type="number"
                    value={newScore}
                    onChange={(e) => setNewScore(Number(e.target.value))}
                    className="form-control bg-dark text-light border-0 text-center"
                    style={{ width: "80px", margin: "0 auto" }}
                  />
                </td>
                <td className="bg-black text-center align-middle border-dark">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-light"
                    onClick={handleAddPlayer}
                  >+</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="my-4">
            <input
              type="password"
              className="form-control bg-dark border-0"
              placeholder="very secret key"
              value={key3}
              onChange={(e) => setKey3(e.target.value)}
            />
          </div>
          <p className="text-info text-center">{message3}</p>
          <button type="submit" className="btn btn-outline-light w-100 btn-lg assign-btn">
            SAČUVAJ
          </button>
        </form>
      </div>
    )}
    {activeTab === "prijave" && (
      <table className="table table-bordered border-0">
      <thead>
        <tr>
          <td className="bg-black text-orange text-center pb-1 align-middle border-dark form-subtitle">Ime</td>
          <td className="bg-black text-orange text-center pb-1 align-middle border-dark form-subtitle">Pol</td>
        </tr>
      </thead>
      <tbody>
        {Object.entries(signups).map(([key, player]) => (
          <tr key={key}>
            <td className="bg-black text-light text-center pb-1 align-middle border-dark">
              {player.firstName} {player.lastName}
            </td>
            <td className="bg-black text-light text-center pb-1 align-middle border-dark">
              {player.gender}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    )}
    </div>
    
    </>
  )
}

export default App
