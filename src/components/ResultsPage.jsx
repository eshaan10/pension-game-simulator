import React from "react";

const ResultsPage = ({ advisor, score, strategyPoints, choices, restartGame }) => {
  return (
    <div className="step-card">
      <h2>🎉 Results Summary</h2>
      <p><strong>Advisor Chosen:</strong> {advisor}</p>
      <p><strong>Final Strategy Score:</strong> {strategyPoints}</p>
      <p><strong>Knowledge Points:</strong> {score}</p>

      <h3 className="mt-4">🧾 Choices You Made:</h3>
      <ul className="choices-log">
        {choices.map((c, i) => (
          <li key={i}>
            <strong>Step {i + 1}:</strong> {c.label} <br />
            <small>Cost: {c.cost} pts | Gain: {c.gain} pts</small>
          </li>
        ))}
      </ul>

      <button onClick={restartGame}>🔁 Play Again</button>
    </div>
  );
};

export default ResultsPage;
