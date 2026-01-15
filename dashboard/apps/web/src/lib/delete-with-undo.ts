import { toast } from 'sonner';
import { createElement } from 'react';
import { CountdownRing } from '@/components/ui/CountdownRing';

interface DeleteOptions {
  onDelete: () => Promise<void>;
  onUndo: () => void;
  message: string;
  duration?: number;
  toastId?: string;
}

export function deleteWithCountdown({
  onDelete,
  onUndo,
  message,
  duration = 3000,
  toastId,
}: DeleteOptions) {
  let cancelled = false;
  let seconds = Math.ceil(duration / 1000);

  const id = toast(message, {
    id: toastId,
    duration: duration + 500,
    action: {
      label: 'Undo',
      onClick: () => {
        cancelled = true;
        onUndo();
        toast.dismiss(id);
      },
    },
    icon: createElement(CountdownRing, { seconds, duration: Math.ceil(duration / 1000) }),
  });

  // Countdown interval
  const interval = setInterval(() => {
    seconds--;
    if (seconds > 0 && !cancelled) {
      toast(message, {
        id,
        icon: createElement(CountdownRing, { seconds, duration: Math.ceil(duration / 1000) }),
        action: {
          label: 'Undo',
          onClick: () => {
            cancelled = true;
            onUndo();
            toast.dismiss(id);
          },
        },
      });
    }
  }, 1000);

  // Execute delete after countdown
  setTimeout(async () => {
    clearInterval(interval);
    if (!cancelled) {
      try {
        await onDelete();
      } catch {
        onUndo();
        toast.error('Failed to delete. Item restored.');
      }
    }
  }, duration);

  return {
    toastId: id,
    cancel: () => {
      cancelled = true;
      onUndo();
    },
  };
}
