import React, { useState } from 'react';

const kana = {
'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
'わ': 'wa', 'を': 'wo', 'ん': 'n',
'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n'
};

const getRandomKana = () => {
const kanaChars = Object.keys(kana);
return kanaChars[Math.floor(Math.random() * kanaChars.length)];
};

const JapaneseQuiz = () => {
    const [questionCount, setQuestionCount] = useState(10);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [gameState, setGameState] = useState('init'); // 'init', 'quiz', 'result'
    const [feedback, setFeedback] = useState(null);

    const startQuiz = (count) => {
        setQuestionCount(count);
        setScore(0);
        setAnswers([]);
        setGameState('quiz');
        nextQuestion();
    };

    const nextQuestion = () => {
        const newKana = getRandomKana();
        setCurrentQuestion(newKana);
        setUserAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        const isCorrect = kana[currentQuestion] === userAnswer.toLowerCase();
        const newAnswer = { 
        kana: currentQuestion, 
        userAnswer, 
        correctAnswer: kana[currentQuestion],
        isCorrect
        };
        setAnswers([...answers, newAnswer]);
        setFeedback(isCorrect);

        if (isCorrect) {
        setScore(score + 1);
        }

        if (answers.length + 1 < questionCount) {
        setTimeout(() => {
            nextQuestion();
        }, 1000); // Delay for 1 second to show feedback
        } else {
        setTimeout(() => {
            setGameState('result');
        }, 1000);
        }
    };

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        checkAnswer();
        }
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0',
        width: '100vw',  // 設置為 100% 的視窗寬度
        boxSizing: 'border-box',  // 確保 padding 不會增加總寬度
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '100%',  // 設置為 100% 的容器寬度
        maxWidth: '800px',  // 設置最大寬度，以確保在大螢幕上不會過寬
    };

    const buttonStyle = {
        backgroundColor: 'black',  // 將按鈕顏色改為黑色
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxSizing: 'border-box',  // 確保 padding 不會增加總寬度
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    };

    const thTdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    };
    const feedbackStyle = (isCorrect) => ({
        marginTop: '20px',
        fontSize: '24px',
        color: isCorrect ? 'green' : 'red',
    });

    return (
        <div style={containerStyle}>
        <div style={cardStyle}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>日語五十音測驗</h1>
            {gameState === 'init' && (
            <div>
                <input 
                type="number" 
                placeholder="輸入題目數量" 
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                value={questionCount}
                style={inputStyle}
                />
                <button onClick={() => startQuiz(questionCount)} style={buttonStyle}>開始測驗</button>
            </div>
            )}
            {gameState === 'quiz' && (
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>{currentQuestion}</h2>
                <input
                type="text"
                value={userAnswer}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="輸入羅馬拼音"
                style={inputStyle}
                />
                <button onClick={checkAnswer} style={buttonStyle}>提交</button>
                {feedback !== null && (
                <div style={{ marginTop: '20px', fontSize: '24px' }}>
                    {feedback !== null && (
                    <div style={feedbackStyle(feedback)}>
                        {feedback ? '✓' : '✗'}
                    </div>
                    )}
                </div>
                )}
            </div>
            )}
            {gameState === 'result' && (
            <div>
                <h2 style={{ marginBottom: '10px' }}>測驗結束</h2>
                <p>得分: {score} / {questionCount}</p>
                <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>答題記錄:</h3>
                <table style={tableStyle}>
                <thead>
                    <tr>
                    <th style={thTdStyle}>假名</th>
                    <th style={thTdStyle}>您的答案</th>
                    <th style={thTdStyle}>正確答案</th>
                    <th style={thTdStyle}>結果</th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((answer, index) => (
                    <tr key={index}>
                        <td style={thTdStyle}>{answer.kana}</td>
                        <td style={thTdStyle}>{answer.userAnswer}</td>
                        <td style={thTdStyle}>{answer.correctAnswer}</td>
                        <td style={thTdStyle}>{answer.isCorrect ? '✓' : '✗'}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
                <button onClick={() => setGameState('init')} style={{ ...buttonStyle, marginTop: '20px' }}>再來一次</button>
            </div>
            )}
        </div>
        </div>
    );
};

export default JapaneseQuiz;