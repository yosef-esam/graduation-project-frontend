import { LoadingManager } from 'three';

type ProgressCallback = (progress: number) => void;

let onProgress: ProgressCallback | null = null;

export const threeLoadingManager = new LoadingManager(
  () => {
    // All assets loaded
    onProgress?.(100);
  },
  (url, loaded, total) => {
    const progress = Math.round((loaded / total) * 100);
    onProgress?.(progress);
  }
);

export const setThreeProgressListener = (cb: ProgressCallback) => {
  onProgress = cb;
};
