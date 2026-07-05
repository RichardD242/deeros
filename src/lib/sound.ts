export type SoundName = 'enter' | 'notification' | 'open' | 'close';

const soundFiles: Record<SoundName, string> = {
  enter: '/sounds/welcome.wav',
  notification: '/sounds/notification.mp3',
  open: '/sounds/open.mp3',
  close: '/sounds/close.mp3',
};

const ENABLED_KEY = 'deeros_sound_enabled';
const VOLUME = 0.3;

const cache: Partial<Record<SoundName, HTMLAudioElement>> = {};

export function isSoundEnabled(): boolean {
  return localStorage.getItem(ENABLED_KEY) === 'true';
}

export function setSoundEnabled(enabled: boolean) {
  localStorage.setItem(ENABLED_KEY, String(enabled));
}

export function isFirstVisit(): boolean {
  return localStorage.getItem(ENABLED_KEY) === null;
}

function play(name: SoundName) {
  let audio = cache[name];
  if (!audio) {
    audio = new Audio(soundFiles[name]);
    cache[name] = audio;
  }
  audio.volume = VOLUME;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

export function playSound(name: SoundName) {
  if (!isSoundEnabled()) return;
  play(name);
}

export function playWelcomeSound() {
  play('enter');
}

export function playNotificationSound() {
  play('notification');
}
