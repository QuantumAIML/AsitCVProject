import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import axios from "axios";

export default function ResumeQnA() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const response = await axios.post("https://api.askasit.in/ask", {
        question: question,
      });
      /*const response = await axios.post("https://zaixyz19sb.execute-api.us-east-1.amazonaws.com/Prod/ask", {
        question: question,
      });*/
      setAnswer(response.data.answer);
    } catch (error) {
      setAnswer("Error getting answer. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>AskAsit</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about your resume..."
          rows="4"
          style={{ width: "100%", padding: "10px" }}
        />
        <button type="submit" style={{ marginTop: "10px" }}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
      {answer && (
        <div style={{ marginTop: "20px" }}>
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
