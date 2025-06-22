
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shuffle, Edit3 } from 'lucide-react';

interface ParagraphInputProps {
  paragraph: string;
  onParagraphChange: (paragraph: string) => void;
  onGenerateRandom: () => void;
  isEditing: boolean;
  onEditToggle: () => void;
}

const ParagraphInput: React.FC<ParagraphInputProps> = ({
  paragraph,
  onParagraphChange,
  onGenerateRandom,
  isEditing,
  onEditToggle
}) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Text to Type</CardTitle>
        <div className="flex gap-2">
          <Button
            onClick={onGenerateRandom}
            variant="outline"
            size="sm"
            className="transition-all duration-200 hover:scale-105"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Random
          </Button>
          <Button
            onClick={onEditToggle}
            variant="outline"
            size="sm"
            className="transition-all duration-200 hover:scale-105"
          >
            <Edit3 className="mr-2 h-4 w-4" />
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={paragraph}
            onChange={(e) => onParagraphChange(e.target.value)}
            placeholder="Paste or type your custom paragraph here..."
            className="min-h-[120px] text-base font-serif leading-relaxed resize-none transition-all duration-200 focus:scale-[1.02]"
          />
        ) : (
          <div className="p-4 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20 transition-all duration-300 hover:border-muted-foreground/40">
            <p className="text-base leading-relaxed text-foreground font-serif whitespace-pre-wrap">
              {paragraph}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ParagraphInput;
