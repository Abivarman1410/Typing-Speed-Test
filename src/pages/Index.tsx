import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Play, Send, Trophy } from 'lucide-react';
import { generateRandomParagraph } from '@/utils/paragraphGenerator';
import ParagraphInput from '@/components/ParagraphInput';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  
  const typingAreaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [paragraph, setParagraph] = useState(
    "Typing is a skill that improves with consistent practice and proper technique. " +
    "To type fast and accurately, keep your eyes on the screen and use all your fingers. " +
    "Regular practice sessions will help you develop muscle memory and increase your typing speed significantly."
  );

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

  const handleGenerateRandom = () => {
    setParagraph(generateRandomParagraph());
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 transition-colors duration-500">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center py-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1"></div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              TypeMaster Pro
            </h1>
            <div className="flex-1 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
          <p className="text-xl text-muted-foreground font-medium">
            Master your typing skills with precision and style
          </p>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <Card className="transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6 text-center">
              <Clock className="mx-auto mb-3 text-blue-600 dark:text-blue-400" size={32} />
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Time Elapsed</div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <Trophy className="mx-auto mb-3 text-green-600 dark:text-green-400" size={32} />
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                {wpm !== null ? `${wpm}` : '--'}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">Words Per Minute</div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6 text-center">
              <Send className="mx-auto mb-3 text-purple-600 dark:text-purple-400" size={32} />
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                {isFinished ? `${calculateAccuracy()}%` : '--'}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Paragraph Input */}
        <ParagraphInput
          paragraph={paragraph}
          onParagraphChange={setParagraph}
          onGenerateRandom={handleGenerateRandom}
          isEditing={isEditing}
          onEditToggle={handleEditToggle}
        />

        {/* Typing area */}
        <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Your Typing Area</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              ref={typingAreaRef}
              value={typedText}
              onChange={handleTypingChange}
              placeholder="Click 'Start Test' to begin typing..."
              disabled={!isStarted}
              className="min-h-[200px] text-lg font-serif leading-relaxed resize-none transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
            />
          </CardContent>
        </Card>

        {/* Control buttons */}
        <div className="flex justify-center gap-6 animate-fade-in">
          <Button
            onClick={handleStart}
            disabled={isStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Play className="mr-3 h-6 w-6" />
            {isStarted ? 'Test in Progress...' : 'Start Test'}
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={!isStarted || !typedText.trim()}
            size="lg"
            variant="outline"
            className="border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Send className="mr-3 h-6 w-6" />
            Submit Test
          </Button>
        </div>

        {/* Results */}
        {isFinished && wpm !== null && (
          <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 animate-scale-in shadow-xl">
            <CardContent className="p-8 text-center">
              <Trophy className="mx-auto mb-4 text-green-600 dark:text-green-400" size={48} />
              <h3 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-6">Test Complete!</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
                <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="font-semibold text-green-700 dark:text-green-300">Speed</div>
                  <div className="text-3xl font-bold text-green-800 dark:text-green-200">{wpm} WPM</div>
                </div>
                <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="font-semibold text-green-700 dark:text-green-300">Time</div>
                  <div className="text-3xl font-bold text-green-800 dark:text-green-200">{formatTime(timeElapsed)}</div>
                </div>
                <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="font-semibold text-green-700 dark:text-green-300">Accuracy</div>
                  <div className="text-3xl font-bold text-green-800 dark:text-green-200">{calculateAccuracy()}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800 animate-fade-in">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
              <Clock className="text-blue-600 dark:text-blue-400" />
              How to Use TypeMaster Pro
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700 dark:text-blue-300">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Customize your text or generate a random paragraph
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Click "Start Test" to begin the timer
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Type the paragraph exactly as shown
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Click "Submit Test" when finished
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  View your WPM and accuracy results
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Toggle between light and dark themes
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
