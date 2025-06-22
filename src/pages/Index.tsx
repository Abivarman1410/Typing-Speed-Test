
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Play, Send } from 'lucide-react';

const Index = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const typingAreaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const paragraph = "Typing is a skill that improves with consistent practice and proper technique. " +
    "To type fast and accurately, keep your eyes on the screen and use all your fingers. " +
    "Regular practice sessions will help you develop muscle memory and increase your typing speed significantly.";

  const handleStart = () => {
    setIsStarted(true);
    setIsFinished(false);
    setTypedText('');
    setWpm(null);
    setTimeElapsed(0);
    setStartTime(Date.now());
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    // Focus on typing area
    setTimeout(() => {
      typingAreaRef.current?.focus();
    }, 100);
  };

  const handleSubmit = () => {
    if (!startTime) return;
    
    const endTime = Date.now();
    const timeTakenMinutes = (endTime - startTime) / 60000;
    
    const wordCount = typedText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const calculatedWpm = Math.round(wordCount / timeTakenMinutes);
    
    setWpm(calculatedWpm);
    setIsStarted(false);
    setIsFinished(true);
    
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTypingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isStarted) {
      setTypedText(e.target.value);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate accuracy
  const calculateAccuracy = () => {
    if (!typedText || !paragraph) return 0;
    
    const typedWords = typedText.trim().split(/\s+/);
    const originalWords = paragraph.trim().split(/\s+/);
    
    let correctWords = 0;
    const minLength = Math.min(typedWords.length, originalWords.length);
    
    for (let i = 0; i < minLength; i++) {
      if (typedWords[i] === originalWords[i]) {
        correctWords++;
      }
    }
    
    return Math.round((correctWords / originalWords.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Clock className="text-blue-600" />
            Typing Speed Test
          </h1>
          <p className="text-lg text-gray-600">Test your typing speed and accuracy</p>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-gray-600">Time Elapsed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {wpm !== null ? `${wpm}` : '--'}
              </div>
              <div className="text-sm text-gray-600">Words Per Minute</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {isFinished ? `${calculateAccuracy()}%` : '--'}
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Paragraph to type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Text to Type:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-lg leading-relaxed text-gray-800 font-serif">
                {paragraph}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Typing area */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Typing:</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              ref={typingAreaRef}
              value={typedText}
              onChange={handleTypingChange}
              placeholder="Click 'Start' to begin typing..."
              disabled={!isStarted}
              className="min-h-[200px] text-lg font-serif leading-relaxed resize-none"
              style={{ fontSize: '16px', lineHeight: '1.6' }}
            />
          </CardContent>
        </Card>

        {/* Control buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            disabled={isStarted}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            <Play className="mr-2 h-5 w-5" />
            {isStarted ? 'Test in Progress...' : 'Start Test'}
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={!isStarted || !typedText.trim()}
            size="lg"
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
          >
            <Send className="mr-2 h-5 w-5" />
            Submit Test
          </Button>
        </div>

        {/* Results */}
        {isFinished && wpm !== null && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Test Complete!</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                <div>
                  <div className="font-semibold text-green-700">Speed</div>
                  <div className="text-2xl font-bold text-green-800">{wpm} WPM</div>
                </div>
                <div>
                  <div className="font-semibold text-green-700">Time</div>
                  <div className="text-2xl font-bold text-green-800">{formatTime(timeElapsed)}</div>
                </div>
                <div>
                  <div className="font-semibold text-green-700">Accuracy</div>
                  <div className="text-2xl font-bold text-green-800">{calculateAccuracy()}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">How to use:</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Read the paragraph above carefully</li>
              <li>• Click "Start Test" to begin the timer</li>
              <li>• Type the paragraph exactly as shown</li>
              <li>• Click "Submit Test" when finished</li>
              <li>• Your typing speed will be calculated in Words Per Minute (WPM)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
