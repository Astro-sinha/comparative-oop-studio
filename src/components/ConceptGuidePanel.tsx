import React, { useState } from 'react';
import { CurriculumModule } from '../types';
import { Lightbulb, CheckCircle2, HelpCircle, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

interface ConceptGuidePanelProps {
  module: CurriculumModule;
}

export const ConceptGuidePanel: React.FC<ConceptGuidePanelProps> = ({ module }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleCheckAnswer = (questionIndex: number) => {
    setShowResults((prev) => ({ ...prev, [questionIndex]: true }));
  };

  return (
    <div className="concept-guide-container">
      {/* Real World Analogy Banner */}
      <div className="analogy-banner-card">
        <div className="analogy-header">
          <Sparkles className="icon-gold" size={22} />
          <h3 className="analogy-title">Real-World Analogy</h3>
        </div>
        <p className="analogy-body">{module.analogy}</p>
      </div>

      {/* Summary Breakdown */}
      <div className="concept-section-card">
        <div className="section-title-group">
          <BookOpen className="icon-burgundy" size={20} />
          <h4>Core Concept Explanation</h4>
        </div>
        <p className="concept-summary-text">{module.summary}</p>

        <div className="takeaways-list">
          <h5 className="takeaways-heading">Key Takeaways:</h5>
          <ul>
            {module.keyTakeaways.map((item, idx) => (
              <li key={idx}>
                <CheckCircle2 className="icon-green" size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Quiz & Knowledge Check */}
      {module.quiz && module.quiz.length > 0 && (
        <div className="quiz-section-card">
          <div className="section-title-group">
            <HelpCircle className="icon-blue" size={20} />
            <h4>Knowledge Check & Self-Test</h4>
          </div>

          {module.quiz.map((q, qIdx) => {
            const selectedOpt = selectedAnswers[qIdx];
            const isChecked = showResults[qIdx];
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div key={qIdx} className="quiz-question-box">
                <p className="quiz-q-text">{qIdx + 1}. {q.question}</p>
                
                <div className="quiz-options-grid">
                  {q.options.map((opt, optIdx) => {
                    let btnClass = 'quiz-opt-btn';
                    if (selectedOpt === optIdx) btnClass += ' selected';
                    if (isChecked && optIdx === q.correctIndex) btnClass += ' correct';
                    if (isChecked && selectedOpt === optIdx && !isCorrect) btnClass += ' wrong';

                    return (
                      <button
                        key={optIdx}
                        className={btnClass}
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                      >
                        <span className="opt-letter">{String.fromCharCode(65 + optIdx)}.</span>
                        <span className="opt-text">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="quiz-actions-row">
                  <button
                    className="btn-check-quiz"
                    disabled={selectedOpt === undefined}
                    onClick={() => handleCheckAnswer(qIdx)}
                  >
                    Check Answer
                  </button>

                  {isChecked && (
                    <div className={`quiz-feedback-box ${isCorrect ? 'fb-correct' : 'fb-wrong'}`}>
                      {isCorrect ? (
                        <div className="fb-content">
                          <CheckCircle2 size={18} />
                          <span><strong>Correct!</strong> {q.explanation}</span>
                        </div>
                      ) : (
                        <div className="fb-content">
                          <AlertCircle size={18} />
                          <span><strong>Not quite.</strong> {q.explanation}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
