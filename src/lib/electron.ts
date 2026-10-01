/**
 * Ashnora Desktop Integration Bridge
 * Detects if the current runtime is inside the Ashnora Electron Desktop Application.
 */

export interface ElectronAPI {
  isDesktop: boolean;
  platform: string;
  version: string;
  send: (channel: string, data?: any) => void;
  on: (channel: string, callback: (event: any, ...args: any[]) => void) => () => void;
  invoke: (channel: string, data?: any) => Promise<any>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

/**
 * Returns true if running inside the Ashnora Desktop application.
 */
export function isElectron(): boolean {
  if (typeof window !== 'undefined' && window.electronAPI?.isDesktop) {
    return true;
  }
  if (typeof navigator !== 'undefined' && /electron/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
}

/**
 * Returns the desktop application version if running in Electron, or 'web'.
 */
export function getAppVersion(): string {
  if (typeof window !== 'undefined' && window.electronAPI?.version) {
    return window.electronAPI.version;
  }
  return 'web';
}

/**
 * Returns the host OS platform if in Electron, or 'browser'.
 */
export function getPlatform(): string {
  if (typeof window !== 'undefined' && window.electronAPI?.platform) {
    return window.electronAPI.platform;
  }
  return 'browser';
}

/**
 * Helper to invoke IPC handlers on the main process safely.
 */
export async function invokeElectron<T = any>(channel: string, data?: any): Promise<T | null> {
  if (!isElectron() || !window.electronAPI?.invoke) {
    return null;
  }
  try {
    return await window.electronAPI.invoke(channel, data);
  } catch (err) {
    console.warn(`[Electron IPC Error] Channel "${channel}":`, err);
    return null;
  }
}

/**
 * Get persistent unique machine ID from the main process
 */
export async function getMachineId(): Promise<string> {
  if (!isElectron()) return 'web-browser-client';
  const id = await invokeElectron<string>('get-machine-id');
  return id || 'ashnora-device-01';
}

/**
 * List hardware printers recognized by the host OS
 */
export async function listPrinters(): Promise<any[]> {
  if (!isElectron()) return [];
  const printers = await invokeElectron<any[]>('list-printers');
  return printers || [];
}

/**
 * Send receipt for native thermal or silent ESC/POS printing
 */
export async function printReceiptNative(options: { deviceName?: string; html?: string; silent?: boolean } = {}): Promise<{ success: boolean; error?: string }> {
  if (!isElectron()) {
    return { success: false, error: 'Not running in desktop app' };
  }
  const result = await invokeElectron<{ success: boolean; error?: string }>('print-receipt', options);
  return result || { success: false, error: 'Failed to communicate with printer subsystem' };
}

/**
 * Kick cash drawer connected to printer
 */
export async function openCashDrawerNative(): Promise<{ success: boolean; message?: string }> {
  if (!isElectron()) {
    return { success: false, message: 'Not running in desktop app' };
  }
  const result = await invokeElectron<{ success: boolean; message?: string }>('open-cash-drawer');
  return result || { success: false, message: 'Drawer trigger failed' };
}

