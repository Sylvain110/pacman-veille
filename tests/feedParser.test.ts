import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getRelativeTime } from '../utils/feedParser';

describe('getRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('retourne "À l\'instant" pour une date très récente', () => {
    const date = new Date('2024-01-15T11:59:30Z');
    expect(getRelativeTime(date)).toBe("À l'instant");
  });

  it('retourne le temps en minutes pour moins d\'une heure', () => {
    const date = new Date('2024-01-15T11:30:00Z');
    expect(getRelativeTime(date)).toBe('Il y a 30 min');
  });

  it('retourne le temps en heures pour moins d\'un jour', () => {
    const date = new Date('2024-01-15T08:00:00Z');
    expect(getRelativeTime(date)).toBe('Il y a 4 h');
  });

  it('retourne le temps en jours pour moins d\'une semaine', () => {
    const date = new Date('2024-01-13T12:00:00Z');
    expect(getRelativeTime(date)).toBe('Il y a 2 j');
  });

  it('retourne la date formatée pour plus d\'une semaine', () => {
    const date = new Date('2024-01-01T12:00:00Z');
    expect(getRelativeTime(date)).toBe('01/01/2024');
  });

  it('retourne "Date inconnue" pour une date invalide', () => {
    const date = new Date('invalid');
    expect(getRelativeTime(date)).toBe('Date inconnue');
  });
});
