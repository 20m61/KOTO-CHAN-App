import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// テスト後のクリーンアップ
afterEach(() => {
  cleanup();
});

// HTMLMediaElement のモック
Object.defineProperty(window, 'HTMLMediaElement', {
  writable: true,
  value: class MockHTMLMediaElement {
    play = vi.fn(() => Promise.resolve());
    pause = vi.fn();
    load = vi.fn();
    addEventListener = vi.fn();
    removeEventListener = vi.fn();
    volume = 1;
    muted = false;
    paused = true;
    currentTime = 0;
    duration = 100;
  },
});

// ResizeObserver のモック
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// IntersectionObserver のモック
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// MatchMedia のモック
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Web Audio API のモック（Howler.js用）
global.AudioContext = vi.fn().mockImplementation(() => ({
  createMediaElementSource: vi.fn(),
  createGain: vi.fn(),
  destination: {},
}));

// Crypto のモック
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: vi.fn(() => 'mocked-uuid'),
    getRandomValues: vi.fn((arr) => arr.map(() => Math.floor(Math.random() * 255))),
  },
});