import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

const ConfirmModal = ({ isOpen, close, onConfirm, title = 'Are you sure?', message = '', confirmText = 'Confirm' }) => {
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-card dark:bg-background rounded-lg p-6 shadow-xl max-w-md w-full space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {message && <p className="text-muted-foreground">{message}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={close}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;