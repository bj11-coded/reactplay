import { useState } from "react";
import { Award, Check, RefreshCw, ChevronRight, CheckCircle2, XCircle, ArrowLeft, Brain } from "lucide-react";
import { QuizQuestion } from "../../types";
import { quizzesData } from "../../data/quizzes";

type QuizProps = {
  saveQuizScore: (topic: string, score: number) => void;
  getBestQuizScore: (topic: string) => number;
};

const QUIZ_TOPICS = [
  "JSX Quiz",
  "Components Quiz",
  "Props Quiz",
  "State Quiz",
  "Hooks Quiz",
  "Routing Quiz",
  "Advanced React Quiz"
];

export default function Quiz({ saveQuizScore, getBestQuizScore }: QuizProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  
  // Running state trackers
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chosenOption, setChosenOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showFinishedCard, setShowFinishedCard] = useState(false);

  // Filter topics based on active selections
  const topicQuestions = activeTopic 
    ? quizzesData.filter((q) => q.topic === activeTopic) 
    : [];

  const handleStartQuiz = (topic: string) => {
    setActiveTopic(topic);
    setCurrentIndex(0);
    setChosenOption(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setShowFinishedCard(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setChosenOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (chosenOption === null || isAnswered) return;
    
    const activeQuestion = topicQuestions[currentIndex];
    const correct = chosenOption === activeQuestion.answerIndex;
    
    if (correct) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
    
    setIsAnswered(true);
  };

  const handleNextStep = () => {
    if (currentIndex < topicQuestions.length - 1) {
      setCurrentIndex((p) => p + 1);
      setChosenOption(null);
      setIsAnswered(false);
    } else {
      // Finished all calculations
      const totalCorrect = correctAnswersCount + (chosenOption === topicQuestions[currentIndex].answerIndex ? 1 : 0);
      saveQuizScore(activeTopic!, correctAnswersCount);
      setShowFinishedCard(true);
    }
  };

  const handleSkipOrRetake = () => {
    if (activeTopic) {
      handleStartQuiz(activeTopic);
    }
  };

  const activeQuestion = topicQuestions[currentIndex];

  return (
    <div className="min-h-screen text-black font-mono animate-fade-in py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      {!activeTopic ? (
        <div className="space-y-4 border-b-4 border-black pb-8 mb-10">
          <h1 className="font-display font-black text-3xl sm:text-5xl text-black uppercase tracking-tight flex items-center gap-3">
            <Brain className="text-black fill-[#00FF00] stroke-[3]" size={32} />
            <span>DIAGNOSTIC QUIZ LABS</span>
          </h1>
          <p className="font-sans text-xs text-neutral-700 max-w-xl font-black tracking-wide leading-relaxed">
            Test and diagnose your comprehension of React components, state lifecycles, and advanced performance tricks. Complete modules to score highmarks.
          </p>
        </div>
      ) : (
        <button
          onClick={() => setActiveTopic(null)}
          className="mb-8 border-2 border-black bg-white hover:bg-neutral-50 text-xs text-black uppercase flex items-center space-x-1.5 p-2 px-3 transition-all cursor-pointer font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <ArrowLeft size={13} className="stroke-[3]" />
          <span>BACK TO ALL LABS</span>
        </button>
      )}

      {/* Main flow branches */}
      {!activeTopic ? (
        /* View 1: Quiz selector dashboard listing user's historical best scores */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUIZ_TOPICS.map((topic) => {
            const bestScore = getBestQuizScore(topic);
            const topicQuestionsCount = quizzesData.filter((q) => q.topic === topic).length;
            const hasStarted = bestScore > 0;

            return (
              <div 
                key={topic}
                className={`border-4 p-6 flex flex-col justify-between transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                  hasStarted 
                    ? "border-black bg-[#00FF00]/5" 
                    : "border-black bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest font-mono">REACTOR UNIT</span>
                    {hasStarted && (
                      <span className="text-[10px] bg-[#00FF00] text-black px-2.5 py-0.5 border-2 border-black font-black uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        Mastered
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-display font-black text-sm uppercase text-black tracking-tight mb-2">
                    {topic}
                  </h3>
                  
                  <p className="font-sans text-xs text-neutral-800 leading-relaxed font-bold">
                    Covers crucial {topic.replace(" Quiz", "")} definitions, syntax pitfalls, and best engineering approaches.
                  </p>
                </div>

                <div className="flex items-center justify-between border-t-2 border-black pt-4 mt-6">
                  {/* Historical best score markers */}
                  <span className="text-[10px] text-black font-black uppercase">
                    BEST RECORD:{" "}
                    <span className={hasStarted ? "text-[#00FF00] bg-black border border-black px-1 py-0.5 font-bold" : "text-neutral-500 font-bold"}>
                      {bestScore} / {topicQuestionsCount || 3} PTS
                    </span>
                  </span>

                  <button
                    onClick={() => handleStartQuiz(topic)}
                    className={`text-[10px] uppercase font-black tracking-wider border-2 border-black px-3.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-colors cursor-pointer ${
                      hasStarted 
                        ? "bg-yellow-300 text-black hover:bg-black hover:text-white" 
                        : "bg-[#00FF00] text-black hover:bg-black hover:text-[#00FF00]"
                    }`}
                  >
                    <span>{hasStarted ? "RETAKE TEST" : "LAUNCH LAB"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* View 2: Specific active quiz process viewport controller */
        <div className="max-w-2xl mx-auto">
          {showFinishedCard ? (
            /* View 2.1: Final scorecard slide */
            <div className="border-4 border-dashed border-black bg-white p-8 text-center space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-black bg-yellow-300 text-black mb-2 animate-bounce shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Award size={36} className="stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase text-neutral-500 font-black block">COMPLETED TARGET FOR:</span>
                <h2 className="font-display font-black text-xl text-black uppercase tracking-tight">{activeTopic}</h2>
              </div>

              {/* Progress final percent labels */}
              <div className="max-w-xs mx-auto py-2">
                <div className="text-black text-xs font-black font-mono mb-2.5">
                  FINAL CARD: <span className="bg-[#00FF00] border border-black px-1 text-black font-extrabold">{correctAnswersCount} OF {topicQuestions.length} CORRECT</span>
                </div>
                <div className="w-full bg-white h-5 border-3 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <div 
                    className="bg-[#00FF00] h-full border-r-2 border-black" 
                    style={{ width: `${(correctAnswersCount / topicQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3.5 pt-4">
                <button
                  onClick={handleSkipOrRetake}
                  className="px-5 py-2.5 bg-yellow-300 hover:bg-neutral-50 border-3 border-black text-black text-xs font-black uppercase cursor-pointer flex items-center justify-center gap-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <RefreshCw size={12} className="mr-1 stroke-[3]" />
                  <span>RETAKE TEST</span>
                </button>
                <button
                  onClick={() => setActiveTopic(null)}
                  className="px-5 py-2.5 bg-[#00FF00] text-black border-3 border-black text-xs font-black uppercase cursor-pointer flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#00FF00] transition-all"
                >
                  <span>RETURN TO DIRECTORY</span>
                </button>
              </div>
            </div>
          ) : (
            /* View 2.2: Standard questionnaire card */
            <div className="border-4 border-black bg-white p-6 md:p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              {/* Question progress and topic layout */}
              <div className="flex justify-between items-center border-b-3 border-black pb-3">
                <span className="text-[10px] text-neutral-600 uppercase font-black tracking-widest bg-neutral-100 border border-neutral-300 px-1.5 py-0.5">{activeTopic}</span>
                <span className="text-[10px] text-black font-black bg-yellow-300 border border-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  QUESTION {currentIndex + 1} OF {topicQuestions.length}
                </span>
              </div>

              {/* Core question */}
              {activeQuestion ? (
                <div className="space-y-6">
                  <h3 className="font-sans font-black text-base text-black leading-normal">
                    {activeQuestion.question}
                  </h3>

                  {/* Options blocks */}
                  <div className="space-y-2.5">
                    {activeQuestion.options.map((option, idx) => {
                      const isChosen = chosenOption === idx;
                      const isCorrect = idx === activeQuestion.answerIndex;

                      let btnStyle = "border-2 border-black bg-white text-black hover:bg-neutral-100 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]";
                      
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = "border-3 border-black bg-[#00FF00] text-black font-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)]";
                        } else if (isChosen) {
                          btnStyle = "border-3 border-black bg-red-300 text-black font-bold shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)]";
                        } else {
                          btnStyle = "border-2 border-black bg-white text-neutral-400 opacity-60 cursor-not-allowed";
                        }
                      } else if (isChosen) {
                        btnStyle = "border-3 border-black bg-yellow-300 text-black font-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)]";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full flex items-start text-left p-3.5 text-xs tracking-tight border rounded-none font-sans transition-all duration-100 ${btnStyle} ${
                            !isAnswered ? "cursor-pointer" : ""
                          }`}
                        >
                          <span className="font-mono text-[9px] text-black font-black bg-neutral-100 border border-neutral-300 px-1 py-0.5 mr-2.5 uppercase">[{String.fromCharCode(65 + idx)}]</span>
                          <span className="font-bold">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Next drawer layout */}
                  <div className="pt-4 flex justify-end">
                    {chosenOption !== null && !isAnswered && (
                      <button
                        onClick={handleSubmitAnswer}
                        className="bg-yellow-300 text-black border-3 border-black p-2.5 px-6 text-xs font-black uppercase transition-all cursor-pointer shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        SUBMIT OPTION
                      </button>
                    )}

                    {isAnswered && (
                      <button
                        onClick={handleNextStep}
                        className="bg-[#00FF00] text-black border-3 border-black p-2.5 px-6 text-xs font-black uppercase transition-all flex items-center space-x-1 cursor-pointer shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#00FF00]"
                      >
                        <span>{currentIndex === topicQuestions.length - 1 ? "FINISH TEST" : "NEXT QUESTION"}</span>
                        <ChevronRight size={13} fill="black" className="stroke-black stroke-[3]" />
                      </button>
                    )}
                  </div>

                  {/* Explanatory feedback cards */}
                  {isAnswered && (
                    <div className="border-3 border-black bg-neutral-50 p-4 leading-relaxed animate-fade-in shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] mt-4">
                      {chosenOption === activeQuestion.answerIndex ? (
                        <p className="text-black font-mono font-black text-[10px] uppercase mb-1.5 flex items-center gap-1">
                          <CheckCircle2 size={13} className="text-[#00FF00] stroke-[3]" />
                          <span className="bg-[#00FF00] border border-black px-1">STRIKE CORRECT TARGET!</span>
                        </p>
                      ) : (
                        <p className="text-black font-mono font-black text-[10px] uppercase mb-1.5 flex items-center gap-1">
                          <XCircle size={13} className="text-red-500 stroke-[3]" />
                          <span className="bg-red-350 border border-black px-1">CHOICE INCOMPATIBLE!</span>
                        </p>
                      )}
                      <p className="text-neutral-800 mt-1 font-sans text-xs font-bold leading-relaxed">
                        {activeQuestion.explanation}
                      </p>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center text-neutral-600 font-extrabold uppercase text-xs py-12">
                  QUESTION SOURCE RECORD MISSING.
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
