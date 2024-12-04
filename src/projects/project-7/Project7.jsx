import React, { useState } from "react";
import './Project7.css'

const InterviewScheduler = () => {
  const [interviewers, setInterviewers] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviewPairs, setInterviewPairs] = useState([]);
  const [maxInterviews, setMaxInterviews] = useState(0);

  const generateRandomPairs = () => {
    if (!interviewers.length || !candidates.length) {
      alert("Please enter both interviewers and candidates!");
      return;
    }

    let availableInterviewers = [...interviewers];
    const pairs = [];

    candidates.forEach((candidate) => {
      if (availableInterviewers.length === 0) {
        availableInterviewers = [...interviewers]; 
      }
      const randomInterviewerIndex = Math.floor(
        Math.random() * availableInterviewers.length
      );
      const interviewer = availableInterviewers[randomInterviewerIndex];

      pairs.push({ candidate, interviewer });

      availableInterviewers.splice(randomInterviewerIndex, 1);
    });

    setInterviewPairs(pairs);
    calculateMaxInterviews(pairs);
  };

  const calculateMaxInterviews = (pairs) => {
    const uniqueInterviewers = new Set(pairs.map((pair) => pair.interviewer));
    const uniqueCandidates = new Set(pairs.map((pair) => pair.candidate));

    setMaxInterviews(Math.min(uniqueInterviewers.size, uniqueCandidates.size));
  };

  return (
    <div>
      <h1>Interview Scheduling</h1>

      <div className="entering">
        <div>
          <h2>Enter Interviewers</h2>
          <textarea
            className="textarea"
            placeholder="Enter Interviewers (comma separated)"
            onBlur={(e) =>
              setInterviewers(
                e.target.value.split(",").map((item) => item.trim())
              )
            }
            rows={10}
          />
        </div>
        <div>
          <h2>Enter Candidates</h2>
          <textarea
            className="textarea"
            placeholder="Enter Candidates (comma separated)"
            onBlur={(e) =>
              setCandidates(
                e.target.value.split(",").map((item) => item.trim())
              )
            }
            rows={10}
          />
        </div>
      </div>

      <div className="buttonBlock">
        <button onClick={generateRandomPairs}>Generate Interview Pairs</button>
      </div>
      <div className="outText">
        {interviewPairs.length > 0 && (
          <div>
            <h2>Generated Interview Pairs</h2>
            <ul>
              {interviewPairs.map((pair, index) => (
                <li key={index}>
                  Interviewer: {pair.interviewer} - Candidate: {pair.candidate}
                </li>
              ))}
            </ul>
          </div>
        )}

        {maxInterviews > 0 && (
          <div>
            <h2>Maximal Number of Interviews: {maxInterviews}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewScheduler;
