import toast from 'react-hot-toast';

// Ensure toast is only used on client-side
const safeToast = (toastFn: (message: string) => void) => (message: string) => {
  if (typeof window !== 'undefined') {
    toastFn(message);
  }
};

// Mobile-friendly toast configurations
export const toastOptions = {
  // Ensure good visibility and readability on mobile
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
    maxWidth: '90vw',
    width: 'fit-content',
    fontSize: '14px',
    padding: '10px 15px',
  },
  // Customize mobile experience
  duration: 3000, // 3 seconds
  position: 'bottom-center' as const,
};

// Utility functions for different toast types
export const showSuccessToast = safeToast((message: string) => {
  toast.success(message, {
    ...toastOptions,
    icon: '✅',
  });
});

export const showErrorToast = safeToast((message: string) => {
  toast.error(message, {
    ...toastOptions,
    icon: '❌',
  });
});

export const showInfoToast = safeToast((message: string) => {
  toast(message, {
    ...toastOptions,
    icon: 'ℹ️',
  });
});
