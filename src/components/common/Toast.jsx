import React, { useState, useCallback } from 'react';

let toastFn = null;

export function showToast(msg, type = 'success') {
  if (toastFn) toastFn(msg, type);
}

export function ToastProvider() {
  const [toast, setToast] = useState(null);

  toastFn = useCallback((msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  if (!toast) return null;
  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.type === 'success' ? '✓ ' : '✕ '}{toast.msg}
    </div>
  );
}
