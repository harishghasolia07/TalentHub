import { toast } from 'sonner';

interface ToastOptions {
    duration?: number;
}

export const useCustomToast = () => {
    const showSuccess = (message: string, options: ToastOptions = {}) => {
        const duration = options.duration || 3000;

        return toast.success(message, {
            duration,
            style: {
                '--toast-duration': `${duration}ms`,
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
                position: 'relative',
                overflow: 'hidden',
            } as React.CSSProperties & { '--toast-duration': string },
        });
    };

    const showError = (message: string, options: ToastOptions = {}) => {
        const duration = options.duration || 4000;

        return toast.error(message, {
            duration,
            style: {
                '--toast-duration': `${duration}ms`,
                background: 'white',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
                position: 'relative',
                overflow: 'hidden',
            } as React.CSSProperties & { '--toast-duration': string },
        });
    };

    const showInfo = (message: string, options: ToastOptions = {}) => {
        const duration = options.duration || 3000;

        return toast.info(message, {
            duration,
            style: {
                '--toast-duration': `${duration}ms`,
                background: 'white',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
                position: 'relative',
                overflow: 'hidden',
            } as React.CSSProperties & { '--toast-duration': string },
        });
    };

    const showWarning = (message: string, options: ToastOptions = {}) => {
        const duration = options.duration || 3000;

        return toast.warning(message, {
            duration,
            style: {
                '--toast-duration': `${duration}ms`,
                background: 'white',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
                position: 'relative',
                overflow: 'hidden',
            } as React.CSSProperties & { '--toast-duration': string },
        });
    };

    return {
        success: showSuccess,
        error: showError,
        info: showInfo,
        warning: showWarning,
    };
};
