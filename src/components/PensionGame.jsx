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
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleChoice = (cost, gain = 0) => {
    setStrategyPoints(prev => prev - cost + gain);
    setScore(prev => prev + gain);
    setStep(prev => prev + 1);
  };

  const restartGame = () => {
    setStep(0);
    setStrategyPoints(100);
    setScore(0);
    setAdvisor(null);
    setChatHistory([]);
  };

  const renderTooltip = (text) => (
    <span className="tooltip-container">
      ℹ️
      <span className="tooltip-text">{text}</span>
    </span>
  );

  const sendChat = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: "user", content: chatInput };
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a friendly pension advisor helping users understand retirement finance." },
            ...chatHistory,
            userMessage,
          ],
        }),
      });

      const data = await response.json();
      console.log("🧠 OpenAI API Response:", data);
      const botMessage = data?.choices?.[0]?.message;

      if (botMessage) {
        setChatHistory(prev => [...prev, userMessage, botMessage]);
      } else {
        setChatHistory(prev => [...prev, userMessage, { role: "assistant", content: "⚠️ Sorry, something went wrong. Please try again later." }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setChatHistory(prev => [...prev, userMessage, { role: "assistant", content: "⚠️ An error occurred. Check your internet connection or API key." }]);
    }

    setChatInput("");
  };

  const renderChatBox = () => (
    <div className="chat-box sleek">
      <div className="chat-header" onClick={() => setShowChat(!showChat)}>
        💬 PensionBot
      </div>
      {showChat && (
        <div className="chat-content">
          <div className="chat-messages">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role}`}>
                <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a question about pensions..."
            />
            <button onClick={sendChat}>Send</button>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="step-card">
            <h2>Welcome to PensionQuest! {renderTooltip("A guided game to help you learn pension finance strategies.")}</h2>
            <p>You've been appointed the Retirement Strategy Advisor for the Silver Generation. Help guide citizens through real-world decisions and prepare them for a financially secure retirement by 2040.</p>
            <button onClick={() => setStep(1)}>Let's Begin</button>
          </div>
        );
      case 1:
        return (
          <div className="step-card">
            <h2>Your Mission</h2>
            <p>Make smart pension, healthcare, and savings decisions. You’ll start in 2024 and go through three rounds: 2024–2029, 2030–2035, and 2036–2040.</p>
            <button onClick={() => setStep(2)}>Next</button>
          </div>
        );
      case 2:
        return (
          <div className="step-card">
            <h2>Quick Tip 💡</h2>
            <p>Think long-term. Saving early and choosing smart benefits can make a big difference down the road.</p>
            <button onClick={() => setStep(3)}>Show Me the Game Mechanics</button>
          </div>
        );
      case 3:
        return (
          <div className="step-card">
            <h2>Game Mechanics</h2>
            <p>You have 100 Strategy Points. Each choice you make will cost points—but smart moves can earn them back. Ready?</p>
            <button onClick={() => setStep(4)}>Choose Your Advisor</button>
          </div>
        );
      case 4:
        return (
          <div className="step-card">
            <h2>Choose Your Advisor</h2>
            <div className="advisor-grid">
              <div className="advisor-card" onClick={() => { setAdvisor("Maya"); setStep(5); }}>
                <img src={MayaImg} alt="Maya" className="advisor-img" />
                <h3>Maya the Planner</h3>
                <p>Specialist Skill: Budget Optimization</p>
              </div>
              <div className="advisor-card" onClick={() => { setAdvisor("Sam"); setStep(5); }}>
                <img src={SamImg} alt="Sam" className="advisor-img" />
                <h3>Sam the Supporter</h3>
                <p>Specialist Skill: Healthcare Navigation</p>
              </div>
              <div className="advisor-card" onClick={() => { setAdvisor("Ava"); setStep(5); }}>
                <img src={AvaImg} alt="Ava" className="advisor-img" />
                <h3>Ava the Analyst</h3>
                <p>Specialist Skill: Policy Forecasting</p>
              </div>
              <div className="advisor-card" onClick={() => { setAdvisor("Leo"); setStep(5); }}>
                <img src={LeoImg} alt="Leo" className="advisor-img" />
                <h3>Leo the Risk Manager</h3>
                <p>Specialist Skill: Contingency Planning</p>
              </div>
            </div>
          </div>
        );
      case 5:
        if (advisor === "Leo") {
          return (
            <div className="step-card">
              <h2>You're facing a financial risk scenario. What do you do?</h2>
              <div className="space-y-2">
                <button onClick={() => handleChoice(4, 3)}>Reallocate to safer assets (Cost: 4 pts, Gain: 3 pts)</button>
                <button onClick={() => handleChoice(2, 2)}>Hold and monitor market (Cost: 2 pts, Gain: 2 pts)</button>
                <button onClick={() => handleChoice(6, 1)}>Withdraw quickly (Cost: 6 pts, Gain: 1 pt)</button>
              </div>
            </div>
          );
        }
        return (
          <div className="step-card">
            <h2>Healthcare costs rise sharply. Do you? {renderTooltip("Consider options that reduce future risk while maintaining affordability.")}</h2>
            <div className="space-y-2">
              <button onClick={() => handleChoice(5, 2)}>Increase HSA contributions (Cost: 5 pts, Gain: 2 pts)</button>
              <button onClick={() => handleChoice(2, 1)}>Drop to a high-deductible plan (Cost: 2 pts, Gain: 1 pt)</button>
              <button onClick={() => handleChoice(0, 0)}>Do nothing (Cost: 0 pts, Gain: 0 pts)</button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="step-card">
            <h2>You’re offered early access to your pension at age 55. Do you? {renderTooltip("Early access offers liquidity, but delays may yield higher benefits.")}</h2>
            <div className="space-y-2">
              <button onClick={() => handleChoice(10, 4)}>Take it now and invest (Cost: 10 pts, Gain: 4 pts)</button>
              <button onClick={() => handleChoice(5, 7)}>Wait until 65 for full benefits (Cost: 5 pts, Gain: 7 pts)</button>
              <button onClick={() => handleChoice(7, 5)}>Split the difference and semi-retire at 60 (Cost: 7 pts, Gain: 5 pts)</button>
            </div>
          </div>
        );
      default:
        return (
          <div className="step-card">
            <h2>Simulation Complete</h2>
            <p>Your final Strategy Score: {strategyPoints}</p>
            <p>Final Knowledge Score: {score}</p>
            <p>Thanks for playing PensionQuest! Share your results and reflect on your financial journey.</p>
            <button onClick={restartGame}>🔁 Restart</button>
          </div>
        );
    }
  };

  return (
    <div className="game-container">
      <h1>🧠 PensionQuest Simulation</h1>
      <div className="text-sm info-bar">
        <p>Strategy Points: {strategyPoints}</p>
        {advisor && <p>Advisor: {advisor}</p>}
        <p>Score: {score}</p>
      </div>
      {renderStep()}
      {renderChatBox()}
    </div>
  );
};

export default PensionQuest;
