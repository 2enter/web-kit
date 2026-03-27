export type AppDialogType = 'error' | 'warn' | 'info';

export interface AppState {
	startProcess: () => void;
	endProcess: () => void;
	popDialog: (type: AppDialogType, message: string) => void;
}
