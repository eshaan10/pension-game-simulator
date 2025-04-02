// PensionGame.jsx
import React, { useState } from "react";
import '../App.css';
import MayaImg from '../assets/maya.png';
import SamImg from '../assets/sam.png';
import AvaImg from '../assets/ava.png';
import LeoImg from '../assets/leo.png';

const PensionQuest = () => {
  const [step, setStep] = useState(0);
  const [strategyPoints, setStrategyPoints] = useState(100);
  const [score, setScore] = useState(0);
  const [advisor, setAdvisor] = useState(null);
  const [riskProfile, setRiskProfile] = useState(null);
  const [decisionLog, setDecisionLog] = useState([]);

  const handleChoice = (cost, gain, label) => {
    setStrategyPoints(prev => prev - cost);
    setScore(prev => prev + gain);
    setDecisionLog(prev => [...prev, { step, label, cost, gain }]);
    setStep(prev => prev + 1);
  };

  const skipChoice = () => {
    setDecisionLog(prev => [...prev, { step, label: "Skipped", cost: 0, gain: 0, skipped: true }]);
    setStep(prev => prev + 1);
  };

  const restartGame = () => {
    setStep(0);
    setStrategyPoints(100);
    setScore(0);
    setAdvisor(null);
    setRiskProfile(null);
    setDecisionLog([]);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="step-card">
            <h2>Welcome to PensionQuest!</h2>
            <p>Let’s figure out your financial style.</p>
            <button onClick={() => setStep(1)}>Start</button>
          </div>
        );
      case 1:
        return (
          <div className="step-card">
            <h2>How confident are you in managing your finances?</h2>
            <button onClick={() => { setRiskProfile("low"); setStep(2); }}>Not confident</button>
            <button onClick={() => { setRiskProfile("medium"); setStep(2); }}>Somewhat confident</button>
            <button onClick={() => { setRiskProfile("high"); setStep(2); }}>Very confident</button>
          </div>
        );
      case 2:
        return (
          <div className="step-card">
            <h2>Pick your Retirement Coach</h2>
            <div className="advisor-grid">
              <div className="advisor-card" onClick={() => { setAdvisor("Diana"); setStep(3); }}>
                <img src={MayaImg} alt="Diana" />
                <p><strong>Diana the Cautious Planner</strong></p>
                <p>Stable & cautious | Weak vs. inflation</p>
              </div>
              <div className="advisor-card" onClick={() => { setAdvisor("Marcus"); setStep(3); }}>
                <img src={SamImg} alt="Marcus" />
                <p><strong>Marcus the Optimist</strong></p>
                <p>High-growth | Weak vs. volatility</p>
              </div>
              <div className="advisor-card" onClick={() => { setAdvisor("Elena"); setStep(3); }}>
                <img src={AvaImg} alt="Elena" />
                <p><strong>Elena the Caregiver</strong></p>
                <p>Balanced & caring | Policy sensitive</p>
              </div>
              <div className="advisor-card" onClick={() => { setAdvisor("Tyler"); setStep(3); }}>
                <img src={LeoImg} alt="Tyler" />
                <p><strong>Tyler the Hustler</strong></p>
                <p>Adaptable | Weak vs. inflation</p>
              </div>
            </div>
          </div>
        );
      case 3:
        return <StartRound title="Round 1: Market Volatility" onStart={() => setStep(4)} />;
      case 4:
        return <DecisionCard title="Choosing Your Growth Strategy"
          options={[
            { label: "Go all-in on stocks", cost: 10, gain: 10 },
            { label: "60/40 stock-bond split", cost: 5, gain: 5 },
            { label: "Fixed income funds", cost: 2, gain: 3 }
          ]} />;
      case 5:
        return <DecisionCard title="Do You Chase the Bull Market?"
          options={[
            { label: "Ride the market", cost: 5, gain: 5 },
            { label: "Take profits", cost: 4, gain: 4 },
            { label: "Move to safe assets", cost: 2, gain: 2 }
          ]} />;
      case 6:
        return <DecisionCard title="Warning Signs Appear"
          options={[
            { label: "Ignore & stay invested", cost: 0, gain: 0 },
            { label: "Shift 20% to cash", cost: 3, gain: 3 },
            { label: "Reallocate 40% to stable", cost: 4, gain: 4 }
          ]} />;
      case 7:
        return <StartRound title="Round 2: Inflation & Purchasing Power" onStart={() => setStep(8)} />;
      case 8:
        return <DecisionCard title="You got a raise — what now?"
          options={[
            { label: "Upgrade lifestyle", cost: 0, gain: 0 },
            { label: "Split lifestyle + savings", cost: 3, gain: 4 },
            { label: "Max out retirement savings", cost: 5, gain: 6 }
          ]} />;
      case 9:
        return <DecisionCard title="Inflation Creeps In"
          options={[
            { label: "Adjust projections", cost: 4, gain: 3 },
            { label: "Move to TIPS", cost: 3, gain: 4 },
            { label: "Assume it will settle", cost: 0, gain: -2 }
          ]} />;
      case 10:
        return <DecisionCard title="Healthcare Premium Spike"
          options={[
            { label: "Revise planning", cost: 5, gain: 5 },
            { label: "Cut costs", cost: 3, gain: 2 },
            { label: "Keep assumptions", cost: 0, gain: -2 }
          ]} />;
      case 11:
        return <StartRound title="Round 3: Health & Care Costs" onStart={() => setStep(12)} />;
      case 12:
        return <DecisionCard title="Your Father’s Diagnosis"
          options={[
            { label: "Buy LTC insurance", cost: 5, gain: 5 },
            { label: "Save for medical", cost: 4, gain: 4 },
            { label: "Hope for the best", cost: 0, gain: -2 }
          ]} />;
      case 13:
        return <DecisionCard title="Employer Insurance Offer"
          options={[
            { label: "Enroll", cost: 6, gain: 6 },
            { label: "Decline", cost: 0, gain: -3 },
            { label: "Research alternatives", cost: 2, gain: 1 }
          ]} />;
      case 14:
        return <DecisionCard title="Health Risk Detected"
          options={[
            { label: "Open HSA", cost: 6, gain: 6 },
            { label: "Lifestyle changes", cost: 3, gain: 3 },
            { label: "Ignore it", cost: 0, gain: -2 }
          ]} />;
      case 15:
        return (
          <div className="results-summary">
            <h3>📊 Your Results</h3>
            <p><strong>Advisor:</strong> {advisor}</p>
            <p><strong>Risk Profile:</strong> {riskProfile}</p>
            <p><strong>Final Score:</strong> {score}</p>
            <p><strong>Strategy Points Left:</strong> {strategyPoints}</p>
            <h4>📜 Decision History:</h4>
            <ul>
              {decisionLog.map((entry, i) => (
                <li key={i}>Step {entry.step}: {entry.label} (Cost: -{entry.cost}, Gain: +{entry.gain}) {entry.skipped && "(Skipped)"}</li>
              ))}
            </ul>
            <button onClick={restartGame}>Restart Game</button>
          </div>
        );
      default:
        return null;
    }
  };

  const StartRound = ({ title, onStart }) => (
    <div className="step-card">
      <h2>{title}</h2>
      <button onClick={onStart}>Start Round</button>
    </div>
  );

  const DecisionCard = ({ title, options }) => (
    <div className="step-card">
      <h2>{title}</h2>
      {options.map(({ label, cost, gain }, idx) => (
        <button key={idx} onClick={() => handleChoice(cost, gain, label)}>
          {label} (−{cost} pts / +{gain})
        </button>
      ))}
      <br />
      <button onClick={skipChoice}>Skip Question</button>
    </div>
  );

  return (
    <div className="game-container">
      <h1>🧠 PensionQuest Simulation</h1>
      <div className="text-sm info-bar">
        <p>Strategy Points: {strategyPoints}</p>
        {advisor && <p>Advisor: {advisor}</p>}
        <p>Score: {score}</p>
      </div>
      {renderStep()}
    </div>
  );
};

export default PensionQuest;
