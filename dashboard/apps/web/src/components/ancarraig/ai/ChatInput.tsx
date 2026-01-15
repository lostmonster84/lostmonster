'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { Button } from '@lostmonster/ui/button';
import { cn } from '@lostmonster/ui';

interface ChatInputProps {
  onSend: (message: string, fileData?: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Ask about pricing, competitors, or upload a file...',
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (!message.trim() && !uploadedFile) return;
    if (disabled) return;

    onSend(message.trim(), fileData || undefined);
    setMessage('');
    setUploadedFile(null);
    setFileData(null);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['.csv', '.xlsx', '.xls', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    const isValid = validTypes.some(type => file.name.endsWith(type) || file.type === type);

    if (!isValid) {
      alert('Please upload a CSV or Excel file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploadedFile(file);

    // Upload and parse file
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/ancarraig/ai/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      setFileData(data.content);
    } catch (error) {
      console.error('File upload error:', error);
      alert('Failed to process file. Please try again.');
      setUploadedFile(null);
      setFileData(null);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {/* File upload indicator */}
      {uploadedFile && (
        <div className="mb-2 flex items-center gap-2 text-sm">
          <div className="flex items-center gap-2 bg-muted rounded px-3 py-1.5">
            <Paperclip className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{uploadedFile.name}</span>
            <button
              onClick={removeFile}
              className="text-muted-foreground hover:text-foreground ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {/* File upload button */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="flex-shrink-0"
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              'w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-purple-500/50',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'max-h-32 overflow-y-auto'
            )}
          />
        </div>

        {/* Send button */}
        <Button
          onClick={handleSubmit}
          disabled={disabled || (!message.trim() && !uploadedFile)}
          className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}
