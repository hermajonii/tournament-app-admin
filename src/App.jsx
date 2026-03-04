import { useState } from 'react'

function App() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [key, setKey] = useState("");
  const [key2, setKey2] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [Player1, setPlayer1] = useState("");
  const [Player2, setPlayer2] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sadržaj koji će se upisati u fajl
    const content = { key:key, first:team1, second:team2, firstScore:score1, secondScore:score2 };
    try {
      const res = await fetch("https://tournament-backend-app.onrender.com/add-score", {
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
      const res = await fetch("https://tournament-backend-app.onrender.com/change-players", {
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


  return (
    
    <>
       
    <div className="d-flex align-items-center justify-content-center bg-black">
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
    </div>
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
    </>
  )
}

export default App
