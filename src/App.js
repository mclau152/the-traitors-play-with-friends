import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [votes, setVotes] = useState({});

  const addPlayer = () => {
    if (name.trim() === "") return;
    setPlayers([...players, name]);
    setVotes({ ...votes, [name]: 0 });
    setName("");
  };

  const votePlayer = (player) => {
    setVotes({ ...votes, [player]: votes[player] + 1 });
  };

  const removeTopVotedPlayer = () => {
    let topVotedPlayer = null;
    let maxVotes = -1;

    for (let player in votes) {
      if (votes[player] > maxVotes) {
        maxVotes = votes[player];
        topVotedPlayer = player;
      }
    }

    if (topVotedPlayer) {
      setPlayers(players.filter((p) => p !== topVotedPlayer));
      const newVotes = { ...votes };
      delete newVotes[topVotedPlayer];
      setVotes(newVotes);
    }
  };

  return (
    <div className="app">
      <h1>Player Voting Game</h1>
      <div className="add-player">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
        />
        <button onClick={addPlayer}>Add Player</button>
      </div>
      <div className="player-list">
        <h2>Players</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player} - Votes: {votes[player]}
              <button onClick={() => votePlayer(player)}>Vote</button>
            </li>
          ))}
        </ul>
      </div>
      <button className="remove-button" onClick={removeTopVotedPlayer}>
        Remove Top Voted Player
      </button>
    </div>
  );
};

export default App;
