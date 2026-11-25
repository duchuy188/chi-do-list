/**
 * Chi-Do List — Interactive Corkboard Sticky Notes & Chibi Chihuahua Office Desk
 */

(() => {
  const STORAGE_KEY = 'chi_do_list_v1';
  const SETTINGS_KEY = 'chi_do_settings_v1';
  const POMO_KEY = 'chi_do_pomo_v1';
  const MUSIC_KEY = 'chi_do_music_v1';
  const DEFAULT_DOC_TITLE = 'Chi-Do List 🐾 — Bảng Note Văn Phòng Của Chihuahua';

  const PIN_COLORS = ['pin-red', 'pin-mint', 'pin-blue', 'pin-gold', 'pin-purple'];

  const PET_LINES = [
    'Hihi nhột quá à~ Cho mình thêm hạt thưởng nha! 🦴💖',
    'Gâu gâu! Bạn làm việc chăm chỉ quá đi! ✨',
    'Vuốt đầu thêm cái nữa là mình có siêu năng lực nhắc việc đó! 🐾',
    'Đừng quên uống nước và vươn vai nhé đồng nghiệp ơi! 💧',
    'Sếp Chi phê duyệt cho bạn nghỉ giải lao 5 phút nha~ ☕',
    'Ủng hộ bạn hết mình luôn! Cố lên cố lên! 🌸',
  ];

  const COFFEE_LINES = [
    'Aaa cà phê thơm quá! Tỉnh táo làm tiếp thôi nào! ☕✨',
    'Làm một ngụm latte rồi tick thêm 1 tờ note nhé~ 💛',
    'Cà phê sữa đá + làm việc hiệu quả = đỉnh nóc kịch trần! 🐾',
  ];

  const ADD_LINES = [
    'Gâu! Đã ghim tờ note mới lên bảng rồi nha! 📌',
    'Ghi chú siêu gọn gàng! Để Sếp Chi canh bảng giúp bạn~ ✨',
    'Thêm một mục tiêu mới nè! Chiến thôi bạn ơi! 💪',
  ];

  const DONE_LINES = [
    'Giỏi quá trời đất ơi! Đóng dấu chân cún hoàn thành! 🐾🎉',
    'Tuyệt vời! Xong thêm 1 việc rồi, thưởng 1 khúc xương nè! 🦴✨',
    'Đỉnh quá đồng nghiệp ơi! Bảng note nhẹ gánh hơn hẳn~ 💖',
  ];

  const ALL_DONE_LINES = [
    'HOÀN THÀNH HẾT RỒI!! Sếp Chi nhảy múa ăn mừng đây! 🎉🐾✨',
    '100% xuất sắc! Hôm nay bạn xứng đáng được nghỉ ngơi thật chill~ 🌟',
  ];

  const EAT_LINES = [
    'Ngoàm ngoàm~ Đã nuốt sạch tờ note này rồi! 😋🐾',
    'Măm măm! Ngon như bánh thưởng phô mai luôn! 🧀✨',
    'Ủa giấy note vị ngọt hả? Xóa sạch không dấu vết nha! 🐶💖',
    'Ọc ọc~ Bụng Sếp Chi đã dọn gọn tờ note giúp bạn rồi! 📄✨',
  ];

  const HEAD_RUB_LINES = [
    'Ư ử~ Xoa đầu êm quá đi, vuốt nữa nha! 💖🐾',
    'Sướng rơn luôn á~ Sếp Chi sắp ngủ gật vì êm quá nè! 🥰✨',
    'Hihi nhột tai quá à~ Đồng nghiệp mát tay ghê! 🌸💕',
    'Vuốt đầu Sếp Chi lấy hên làm việc siêu mượt hôm nay nhé! 🍀🐶',
    'Đúng chỗ ngứa rồi~ Thưởng bạn 100 điểm chăm ngoan! ⭐💖',
  ];

  const BARK_LINES = [
    'Gâu gâu!! Sếp Chi có mặt báo cáo đây! 🐶✨',
    'Gâu! Gâu! Tập trung làm xong việc rồi đi chơi nha! 🐾',
    'Gâu gâu gâu! Ai vừa gọi Sếp Chihuahua đó?! 🔊💖',
    'Gâu! Gâu! Đừng quên thưởng bánh phô mai cho mình nha~ 🧀🦴',
    'Gâu gâu! Cố lên đồng nghiệp ơi, mình cổ vũ nè! 🎉🐶',
  ];

  // Default sample notes so the corkboard looks cozy & lively on first open
  const DEFAULT_NOTES = [
    {
      id: 'n-1',
      text: 'Thiết kế giao diện bảng note dễ thương cùng Sếp Chi 🐾',
      color: 'yellow',
      tag: '💼 Công việc',
      pinType: 'pushpin',
      pinColor: 'pin-red',
      done: true,
      x: 118,
      y: 66,
      rot: -2.4,
      z: 1,
    },
    {
      id: 'n-2',
      text: 'Gửi email báo cáo tuần trước 15:00 chiều nay 📧',
      color: 'pink',
      tag: '🔥 Gấp nè',
      pinType: 'tape',
      pinColor: 'pin-blue',
      remindTime: '15:00',
      remindedDate: '',
      done: false,
      x: 365,
      y: 62,
      rot: 1.8,
      z: 2,
    },
    {
      id: 'n-3',
      text: 'Uống đủ 2 lít nước & tưới cây sen đá trên bàn 🌵💧',
      color: 'mint',
      tag: '🌸 Cá nhân',
      pinType: 'pushpin',
      pinColor: 'pin-mint',
      done: false,
      x: 615,
      y: 70,
      rot: -1.6,
      z: 3,
    },
    {
      id: 'n-4',
      text: 'Brainstorm ý tưởng sticker mới cho sổ tay tuần sau 💡',
      color: 'lavender',
      tag: '💡 Ý tưởng',
      pinType: 'pushpin',
      pinColor: 'pin-gold',
      done: false,
      x: 845,
      y: 120,
      rot: 2.5,
      z: 4,
    },
    {
      id: 'n-5',
      text: 'Mua bánh thưởng vị phô mai cho Chihuahua 🧀🦴',
      color: 'peach',
      tag: '🌸 Cá nhân',
      pinType: 'tape',
      pinColor: 'pin-purple',
      done: false,
      x: 138,
      y: 230,
      rot: 1.9,
      z: 5,
    },
  ];

  // State
  let notes = [];
  let activeFilter = 'all';
  let topZ = 10;
  let settings = {
    theme: 'day',
    sound: true,
    glasses: true,
  };

  // Composer state
  let composerState = {
    color: 'yellow',
    tag: '💼 Công việc',
    pinType: 'pushpin',
    remindTime: '',
    dropPos: null,
  };

  // Active ringing alarm note ID, drag state & freshly-stamped note ID
  let activeAlarmNoteId = null;
  let alarmRingInterval = null;
  let alarmRingTick = 0;
  let isDraggingAnyNote = false;
  let justStampedNoteId = null;

  // AudioContext (lazily initialized on user gesture)
  let audioCtx = null;

  // DOM References
  const boardCanvas = document.getElementById('board-canvas');
  const boardScroll = document.getElementById('board-scroll');
  const notesLayer = document.getElementById('notes-layer');
  const emptyHint = document.getElementById('board-empty-hint');
  const emptyHintText = document.getElementById('empty-hint-text');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const progressText = document.getElementById('progress-text');

  const btnAddNote = document.getElementById('btn-add-note');
  const btnTidy = document.getElementById('btn-tidy');
  const btnSound = document.getElementById('btn-sound');
  const btnTheme = document.getElementById('btn-theme');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Chihuahua & Desk Props
  const chihuahuaEl = document.getElementById('chihuahua');
  const pettingHandEl = document.getElementById('petting-hand');
  const chiSpeechBubble = document.getElementById('chi-speech-bubble');
  const chiSpeechText = document.getElementById('chi-speech-text');
  const chiFxLayer = document.getElementById('chi-fx-layer');
  const deskNameplate = document.getElementById('desk-nameplate');
  const propMug = document.getElementById('prop-mug');
  const propStickyPad = document.getElementById('prop-sticky-pad');
  const propTrashBin = document.getElementById('prop-trash-bin');
  const trashCountBadge = document.getElementById('trash-count-badge');
  const propDeskLamp = document.getElementById('prop-desk-lamp');
  const propDeskClock = document.getElementById('prop-desk-clock');
  const deskClockTime = document.getElementById('desk-clock-time');
  const deskClockDate = document.getElementById('desk-clock-date');
  const clockNextAlarm = document.getElementById('clock-next-alarm');
  const pupils = document.querySelectorAll('.chi-pupil');

  // Alarm Toast Elements
  const alarmToast = document.getElementById('alarm-toast');
  const alarmToastTime = document.getElementById('alarm-toast-time');
  const alarmToastText = document.getElementById('alarm-toast-text');
  const btnAlarmDone = document.getElementById('btn-alarm-done');
  const btnAlarmSnooze = document.getElementById('btn-alarm-snooze');
  const btnAlarmDismiss = document.getElementById('btn-alarm-dismiss');

  // Modal Elements
  const dragOverlay = document.getElementById('drag-overlay');
  const modalBackdrop = document.getElementById('note-modal-backdrop');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');
  const noteForm = document.getElementById('note-form');
  const noteInput = document.getElementById('note-input');
  const noteTagInput = document.getElementById('note-tag-input');
  const composerTagPreview = document.getElementById('composer-tag-preview');
  const noteTimeInput = document.getElementById('note-time-input');
  const btnClearTime = document.getElementById('btn-clear-time');
  const composerTimePreview = document.getElementById('composer-time-preview');
  const timeQuickPills = document.querySelectorAll('#time-quick-pills .time-quick-pill');
  const charCount = document.getElementById('char-count');
  const composerPaper = document.getElementById('composer-paper');
  const composerPinPreview = document.getElementById('composer-pin-preview');
  const colorSwatches = document.querySelectorAll('#color-swatches .swatch');
  const tagPills = document.querySelectorAll('#tag-pills .tag-pill');
  const pinPills = document.querySelectorAll('#pin-pills .pin-pill');

  // Trash Confirmation Modal Elements
  const trashModalBackdrop = document.getElementById('trash-modal-backdrop');
  const btnCloseTrashModal = document.getElementById('btn-close-trash-modal');
  const btnCancelTrash = document.getElementById('btn-cancel-trash');
  const btnConfirmTrash = document.getElementById('btn-confirm-trash');
  const trashConfirmDesc = document.getElementById('trash-confirm-desc');
  const trashPreviewList = document.getElementById('trash-preview-list');

  // User Guide Modal Elements (Polaroid on desktop + ? icon on mobile)
  const btnGuidePolaroid = document.getElementById('btn-guide-polaroid');
  const btnMobileGuide = document.getElementById('btn-mobile-guide');
  const guideModalBackdrop = document.getElementById('guide-modal-backdrop');
  const btnCloseGuideModal = document.getElementById('btn-close-guide-modal');
  const btnOkGuide = document.getElementById('btn-ok-guide');
  const guideTabs = document.querySelectorAll('.guide-tab');
  const guidePanels = document.querySelectorAll('.guide-panel');

  // Tomato Pomodoro Timer Elements
  const pomoWrap = document.getElementById('pomodoro-desk-wrap');
  const propPomodoro = document.getElementById('prop-pomodoro');
  const pomoDeskTime = document.getElementById('pomo-desk-time');
  const pomoPopover = document.getElementById('pomo-popover');
  const btnClosePomo = document.getElementById('btn-close-pomo');
  const pomoModeBtns = document.querySelectorAll('#pomo-modes .pomo-mode-btn');
  const pomoRingProgress = document.getElementById('pomo-ring-progress');
  const pomoBigTime = document.getElementById('pomo-big-time');
  const pomoModeLabel = document.getElementById('pomo-mode-label');
  const btnPomoMinus = document.getElementById('btn-pomo-minus');
  const btnPomoPlus = document.getElementById('btn-pomo-plus');
  const pomoMinsInput = document.getElementById('pomo-mins-input');
  const btnPomoToggle = document.getElementById('btn-pomo-toggle');
  const btnPomoReset = document.getElementById('btn-pomo-reset');
  const pomoDoneCountEl = document.getElementById('pomo-done-count');

  // Laptop Music Player Elements
  const laptopWrap = document.getElementById('laptop-desk-wrap');
  const propLaptop = document.getElementById('prop-laptop');
  const musicPopover = document.getElementById('music-popover');
  const btnCloseMusic = document.getElementById('btn-close-music');
  const musicTabs = document.querySelectorAll('.music-tab');
  const musicPanels = document.querySelectorAll('.music-panel');
  const btnAmbLofi = document.getElementById('btn-amb-lofi');
  const btnAmbRain = document.getElementById('btn-amb-rain');
  const btnAmbFire = document.getElementById('btn-amb-fire');
  const volLofi = document.getElementById('vol-lofi');
  const volRain = document.getElementById('vol-rain');
  const volFire = document.getElementById('vol-fire');
  const btnStopAmbient = document.getElementById('btn-stop-ambient');
  const embedForm = document.getElementById('embed-form');
  const embedUrlInput = document.getElementById('embed-url-input');
  const embedPresetBtns = document.querySelectorAll('.embed-preset-btn');
  const embedStage = document.getElementById('embed-stage');
  const embedPlaceholder = document.getElementById('embed-placeholder');
  const btnStopEmbed = document.getElementById('btn-stop-embed');
  const mp3FileInput = document.getElementById('mp3-file-input');
  const localAudioPlayer = document.getElementById('local-audio-player');
  const mp3PlaylistEl = document.getElementById('mp3-playlist');

  let speechTimer = null;
  let moodTimer = null;

  /* ========================================================================
     Cozy Web Audio Sound Effects (Zero external audio files needed)
     ======================================================================== */
  function playCuteSound(type) {
    if (!settings.sound) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const now = audioCtx.currentTime;

      if (type === 'pin') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
      } else if (type === 'done') {
        // Cheerful 3-note kawaii chime
        [523.25, 659.25, 783.99].forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.075);
          gain.gain.setValueAtTime(0.11, now + i * 0.075);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.075 + 0.22);
          osc.connect(gain).connect(audioCtx.destination);
          osc.start(now + i * 0.075);
          osc.stop(now + i * 0.075 + 0.24);
        });
      } else if (type === 'pet') {
        // Soft happy puppy squeak
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(940, now + 0.07);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.14);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.17);
      } else if (type === 'chomp') {
        // Playful double munch/crunch sound when Chihuahua eats a note!
        [0, 0.13].forEach((offset, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(idx === 0 ? 320 : 260, now + offset);
          osc.frequency.exponentialRampToValueAtTime(110, now + offset + 0.09);
          gain.gain.setValueAtTime(0.16, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);
          osc.connect(gain).connect(audioCtx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.11);
        });
      } else if (type === 'ring') {
        // Classic cute twin-bell desk clock "RENG-RENG! RENG-RENG!" trill
        const bursts = [0, 0.34];
        bursts.forEach((bOffset) => {
          for (let hit = 0; hit < 5; hit++) {
            const t = now + bOffset + hit * 0.048;
            const osc = audioCtx.createOscillator();
            const overtone = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            overtone.type = 'sine';
            osc.frequency.setValueAtTime(hit % 2 === 0 ? 1180 : 1420, t);
            overtone.frequency.setValueAtTime(hit % 2 === 0 ? 2360 : 2840, t);
            gain.gain.setValueAtTime(0.11, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
            osc.connect(gain);
            overtone.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(t);
            overtone.start(t);
            osc.stop(t + 0.048);
            overtone.stop(t + 0.048);
          }
        });
      } else if (type === 'alarm') {
        // Cheerful cute desk-clock melody when a daily reminder triggers!
        const melody = [659.25, 783.99, 1046.5, 783.99, 1046.5];
        melody.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          const t = now + i * 0.11;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.13, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
          osc.connect(gain).connect(audioCtx.destination);
          osc.start(t);
          osc.stop(t + 0.2);
        });
      } else if (type === 'stamp') {
        // Satisfying tactile "CỘP!" rubber stamp thud + paper crisp tap
        const thud = audioCtx.createOscillator();
        const thudGain = audioCtx.createGain();
        thud.type = 'sine';
        thud.frequency.setValueAtTime(170, now);
        thud.frequency.exponentialRampToValueAtTime(48, now + 0.11);
        thudGain.gain.setValueAtTime(0.28, now);
        thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
        thud.connect(thudGain).connect(audioCtx.destination);
        thud.start(now);
        thud.stop(now + 0.14);

        // Short paper slap noise
        const bufLen = Math.floor(audioCtx.sampleRate * 0.045);
        const noiseBuf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
        const data = noiseBuf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 2);
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = noiseBuf;
        const nFilter = audioCtx.createBiquadFilter();
        nFilter.type = 'lowpass';
        nFilter.frequency.setValueAtTime(950, now);
        const nGain = audioCtx.createGain();
        nGain.gain.setValueAtTime(0.18, now);
        nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        noise.connect(nFilter).connect(nGain).connect(audioCtx.destination);
        noise.start(now);
      } else if (type === 'bark') {
        // Cute energetic Chihuahua double-bark ("Gâu! Gâu!") synthesized with formant filter + breath puff
        const barks = [
          { offset: 0, startF: 430, peakF: 760, endF: 300, filterF: 1050 },
          { offset: 0.21, startF: 480, peakF: 850, endF: 330, filterF: 1180 },
        ];
        barks.forEach((b) => {
          const t = now + b.offset;

          // Vocal chord oscillator through dog-formant bandpass filter
          const osc = audioCtx.createOscillator();
          const osc2 = audioCtx.createOscillator();
          const filter = audioCtx.createBiquadFilter();
          const gain = audioCtx.createGain();

          osc.type = 'sawtooth';
          osc2.type = 'triangle';
          osc.frequency.setValueAtTime(b.startF, t);
          osc.frequency.exponentialRampToValueAtTime(b.peakF, t + 0.032);
          osc.frequency.exponentialRampToValueAtTime(b.endF, t + 0.135);

          osc2.frequency.setValueAtTime(b.startF * 0.5, t);
          osc2.frequency.exponentialRampToValueAtTime(b.peakF * 0.5, t + 0.032);
          osc2.frequency.exponentialRampToValueAtTime(b.endF * 0.5, t + 0.135);

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(b.filterF, t);
          filter.frequency.exponentialRampToValueAtTime(620, t + 0.135);
          filter.Q.setValueAtTime(2.3, t);

          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.24, t + 0.018);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

          osc.connect(filter);
          osc2.connect(filter);
          filter.connect(gain).connect(audioCtx.destination);
          osc.start(t);
          osc2.start(t);
          osc.stop(t + 0.16);
          osc2.stop(t + 0.16);

          // Tiny crisp breath attack at start of bark
          const bufLen = Math.floor(audioCtx.sampleRate * 0.032);
          const noiseBuf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
          const data = noiseBuf.getChannelData(0);
          for (let i = 0; i < bufLen; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufLen);
          }
          const noise = audioCtx.createBufferSource();
          noise.buffer = noiseBuf;
          const nFilter = audioCtx.createBiquadFilter();
          nFilter.type = 'bandpass';
          nFilter.frequency.setValueAtTime(1400, t);
          const nGain = audioCtx.createGain();
          nGain.gain.setValueAtTime(0.08, t);
          nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.032);
          noise.connect(nFilter).connect(nGain).connect(audioCtx.destination);
          noise.start(t);
        });
      } else if (type === 'purr') {
        // Gentle warm puppy coo when rubbing Chihuahua's head
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(530, now + 0.16);
        gain.gain.setValueAtTime(0.055, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.19);
      } else if (type === 'sweep') {
        // Breezy paper-crumple & whoosh sound into the mini trash bin
        const bufLen = Math.floor(audioCtx.sampleRate * 0.24);
        const noiseBuf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
        const data = noiseBuf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufLen) * Math.PI);
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = noiseBuf;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1600, now);
        filter.frequency.exponentialRampToValueAtTime(520, now + 0.24);
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        noise.connect(filter).connect(gain).connect(audioCtx.destination);
        noise.start(now);

        // Soft plop at the end when papers land in the bin
        const plop = audioCtx.createOscillator();
        const plopGain = audioCtx.createGain();
        plop.type = 'sine';
        plop.frequency.setValueAtTime(340, now + 0.18);
        plop.frequency.exponentialRampToValueAtTime(190, now + 0.28);
        plopGain.gain.setValueAtTime(0.11, now + 0.18);
        plopGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        plop.connect(plopGain).connect(audioCtx.destination);
        plop.start(now + 0.18);
        plop.stop(now + 0.31);
      } else if (type === 'click') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      }
    } catch {
      // Ignore if audio context blocked
    }
  }

  /* ========================================================================
     Multi-Item Checklist Normalization & Persistence
     ======================================================================== */
  function parseLinesToItems(rawText, defaultDone = false) {
    const lines = String(rawText || '')
      .split(/\r?\n/)
      .map((line) => line.replace(/^[\s•\-*]+/, '').trim())
      .filter(Boolean);
    if (lines.length === 0) return [];
    return lines.map((line, i) => ({
      id: `it-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
      text: line,
      done: defaultDone,
    }));
  }

  function normalizeNote(note) {
    if (!Array.isArray(note.items) || note.items.length === 0) {
      note.items = parseLinesToItems(note.text || 'Việc mới', !!note.done);
      if (note.items.length === 0) {
        note.items = [{ id: `it-${Date.now()}`, text: 'Việc mới', done: !!note.done }];
      }
    } else {
      note.items = note.items
        .filter((it) => it && String(it.text || '').trim())
        .map((it, idx) => ({
          id: it.id || `it-${Date.now()}-${idx}`,
          text: String(it.text).trim(),
          done: !!it.done,
        }));
      if (note.items.length === 0) {
        note.items = [{ id: `it-${Date.now()}`, text: note.text || 'Việc mới', done: !!note.done }];
      }
    }
    syncNoteDerivedFields(note);
    return note;
  }

  function syncNoteDerivedFields(note) {
    note.text = note.items.map((it) => it.text).join('\n');
    note.done = note.items.length > 0 && note.items.every((it) => it.done);
  }

  function getNoteSummaryText(note) {
    if (!note.items || note.items.length <= 1) return note.text || '';
    const firstPending = note.items.find((it) => !it.done) || note.items[0];
    const extra = note.items.length - 1;
    return `${firstPending.text} (+${extra} việc khác)`;
  }

  function loadState() {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        notes = JSON.parse(savedNotes).map(normalizeNote);
      } else {
        notes = JSON.parse(JSON.stringify(DEFAULT_NOTES)).map(normalizeNote);
        requestAnimationFrame(() => tidyNotes(false));
      }
    } catch {
      notes = JSON.parse(JSON.stringify(DEFAULT_NOTES)).map(normalizeNote);
    }

    topZ = notes.reduce((max, n) => Math.max(max, n.z || 1), 10);

    try {
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (savedSettings) {
        settings = { ...settings, ...JSON.parse(savedSettings) };
      }
    } catch {
      // Keep defaults
    }

    applySettings();
  }

  function saveNotes() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Storage full / unavailable
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Ignore
    }
  }

  function applySettings() {
    document.body.classList.toggle('theme-night', settings.theme === 'night');
    document.body.classList.toggle('theme-day', settings.theme !== 'night');
    btnTheme.textContent = settings.theme === 'night' ? '🌙' : '☀️';
    btnSound.textContent = settings.sound ? '🔊' : '🔇';
    chihuahuaEl.classList.toggle('glasses-hidden', !settings.glasses);
  }

  /* ========================================================================
     Chihuahua Reactions, Speech Bubble & Particle FX
     ======================================================================== */
  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function chiSay(text, duration = 4200) {
    chiSpeechText.textContent = text;
    chiSpeechBubble.classList.remove('is-hidden');
    clearTimeout(speechTimer);
    speechTimer = setTimeout(() => {
      chiSpeechBubble.classList.add('is-hidden');
    }, duration);
  }

  function setChiMood(mood, duration = 1800) {
    chihuahuaEl.classList.remove(
      'mood-idle',
      'mood-happy',
      'mood-excited',
      'mood-blush',
      'mood-eat-ready',
      'mood-chewing',
      'mood-petting',
      'mood-bark'
    );
    chihuahuaEl.classList.add(`mood-${mood}`);
    clearTimeout(moodTimer);
    if (mood !== 'idle' && duration > 0) {
      moodTimer = setTimeout(() => {
        chihuahuaEl.classList.remove(
          'mood-happy',
          'mood-excited',
          'mood-blush',
          'mood-eat-ready',
          'mood-chewing',
          'mood-petting',
          'mood-bark'
        );
        chihuahuaEl.classList.add('mood-idle');
      }, duration);
    }
  }

  function spawnBarkPop(label, leftPct, topPct, bx, br, delayMs = 0) {
    setTimeout(() => {
      const pop = document.createElement('span');
      pop.className = 'chi-bark-pop';
      pop.textContent = label;
      pop.style.left = `${leftPct}%`;
      pop.style.top = `${topPct}%`;
      pop.style.setProperty('--bx', `${bx}px`);
      pop.style.setProperty('--br', `${br}deg`);
      chiFxLayer.appendChild(pop);
      setTimeout(() => pop.remove(), 920);
    }, delayMs);
  }

  function spawnChiParticles(symbols = ['💖', '✨', '🐾'], count = 5) {
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.className = 'chi-fx-particle';
      span.textContent = symbols[i % symbols.length];
      span.style.left = `${18 + Math.random() * 64}%`;
      span.style.top = `${20 + Math.random() * 40}%`;
      span.style.animationDelay = `${i * 0.08}s`;
      chiFxLayer.appendChild(span);
      setTimeout(() => span.remove(), 1400);
    }
  }

  /* Subtle Eye Tracking following Mouse Cursor */
  document.addEventListener('pointermove', (e) => {
    const rect = chihuahuaEl.getBoundingClientRect();
    if (!rect.width) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.48;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(3.2, Math.hypot(dx, dy) / 95);
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    pupils.forEach((p) => {
      p.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
    });
  });

  /* ========================================================================
     Desk Clock & Daily Reminder Scheduler
     ======================================================================== */
  function getTodayKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function getNowMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  function parseTimeToMinutes(hhmm) {
    if (!hhmm || !/^\d{2}:\d{2}$/.test(hhmm)) return null;
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  }

  function formatMinutesToTime(totalMins) {
    const wrapped = ((totalMins % 1440) + 1440) % 1440;
    const h = String(Math.floor(wrapped / 60)).padStart(2, '0');
    const m = String(wrapped % 60).padStart(2, '0');
    return `${h}:${m}`;
  }

  function getReminderStatus(note) {
    if (!note.remindTime || note.done) return null;
    const target = parseTimeToMinutes(note.remindTime);
    if (target === null) return null;
    const diff = target - getNowMinutes();
    if (diff <= 0) return 'due';
    if (diff <= 15) return 'soon';
    return 'upcoming';
  }

  function getNextUpcomingNote() {
    const nowMins = getNowMinutes();
    const candidates = notes
      .filter((n) => !n.done && n.remindTime && parseTimeToMinutes(n.remindTime) !== null)
      .map((n) => ({ note: n, mins: parseTimeToMinutes(n.remindTime) }))
      .sort((a, b) => a.mins - b.mins);

    const upcoming = candidates.find((c) => c.mins >= nowMins);
    return upcoming ? upcoming.note : candidates[0]?.note || null;
  }

  function updateClockNextAlarm() {
    const next = getNextUpcomingNote();
    if (next && next.remindTime) {
      clockNextAlarm.textContent = `🔔 ${next.remindTime}`;
      clockNextAlarm.hidden = false;
    } else {
      clockNextAlarm.hidden = true;
    }
  }

  function maybeRequestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }

  function stopAlarmRingLoop() {
    if (alarmRingInterval) {
      clearInterval(alarmRingInterval);
      alarmRingInterval = null;
    }
    alarmRingTick = 0;
    if (!pomoState.running) {
      document.title = DEFAULT_DOC_TITLE;
    }
  }

  function startAlarmRingLoop(note) {
    stopAlarmRingLoop();
    alarmRingTick = 0;

    // Ring right away, then keep ringing "reng reng" every 1.9s until user turns it off!
    playCuteSound('ring');
    if (!pomoState.running) {
      document.title = `🔔 RENG RENG! (${note.remindTime}) — Chi-Do List`;
    }

    alarmRingInterval = setInterval(() => {
      if (!activeAlarmNoteId || alarmToast.hidden) {
        stopAlarmRingLoop();
        return;
      }
      alarmRingTick += 1;
      playCuteSound('ring');

      if (!pomoState.running) {
        document.title =
          alarmRingTick % 2 === 0
            ? `🔔 RENG RENG! (${note.remindTime}) — Chi-Do List`
            : `⏰ Tới giờ rồi! — Chi-Do List`;
      }

      if (alarmRingTick % 2 === 0) {
        spawnChiParticles(['🔔', '⏰'], 2);
      }
    }, 1900);
  }

  function triggerReminderAlarm(note) {
    activeAlarmNoteId = note.id;
    note.remindedDate = getTodayKey();
    saveNotes();

    const summary = getNoteSummaryText(note);
    alarmToastTime.textContent = `⏰ ${note.remindTime}`;
    alarmToastText.textContent = summary;
    alarmToast.hidden = false;

    propDeskClock.classList.add('is-ringing');
    startAlarmRingLoop(note);
    setChiMood('excited', 3200);
    spawnChiParticles(['⏰', '🔔', '🐾', '✨'], 7);
    chiSay(`Reng reng! Tới ${note.remindTime} rồi: "${summary}" ⏰🐾`, 7500);

    // Highlight the due sticky note on the corkboard
    renderNotes();

    // Send desktop Notification if user allowed it
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`🐾 Sếp Chihuahua nhắc việc (${note.remindTime})`, {
          body: summary,
        });
      } catch {
        // Ignore notification errors in restricted contexts
      }
    }
  }

  function clearActiveAlarm() {
    stopAlarmRingLoop();
    activeAlarmNoteId = null;
    alarmToast.hidden = true;
    propDeskClock.classList.remove('is-ringing');
    renderNotes();
  }

  function checkDailyReminders() {
    const today = getTodayKey();
    const nowMins = getNowMinutes();

    // Only alert one note at a time if toast isn't already open
    if (!activeAlarmNoteId) {
      const dueNote = notes.find((n) => {
        if (n.done || !n.remindTime) return false;
        if (n.remindedDate === today) return false;
        const target = parseTimeToMinutes(n.remindTime);
        return target !== null && nowMins >= target;
      });
      if (dueNote) {
        triggerReminderAlarm(dueNote);
      }
    }

    updateClockNextAlarm();
  }

  function updateDeskClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const dayStr = days[now.getDay()];
    const dd = String(now.getDate()).padStart(2, '0');
    const mo = String(now.getMonth() + 1).padStart(2, '0');
    deskClockTime.textContent = `${hh}:${mm}`;
    deskClockDate.textContent = `${dayStr}, ${dd}/${mo}`;
    updateClockNextAlarm();
  }

  /* ========================================================================
     Corkboard Rendering & Infinite Vertical Scroll Canvas
     ======================================================================== */
  function clampNotePosition(x, y, noteWidth = 220) {
    const availW = boardScroll.clientWidth || boardCanvas.clientWidth || 960;
    const maxX = Math.max(14, availW - noteWidth - 18);
    return {
      x: Math.max(14, Math.min(x, maxX)),
      // Allow unlimited downward Y so the corkboard scrolls smoothly for 20-50+ notes!
      y: Math.max(50, y),
    };
  }

  function updateBoardCanvasHeight() {
    const viewH = boardScroll.clientHeight || 480;
    let maxBottom = 0;
    notesLayer.querySelectorAll('.sticky-note').forEach((el) => {
      const top = parseFloat(el.style.top) || 0;
      const h = el.offsetHeight || 160;
      if (top + h > maxBottom) maxBottom = top + h;
    });
    // Leave generous bottom breathing room above Chihuahua's head when scrolled to bottom
    const neededH = Math.max(viewH, maxBottom + 150);
    notesLayer.style.minHeight = `${neededH}px`;
  }

  function updateTrashBadge() {
    const doneCount = notes.filter((n) => n.done).length;
    if (doneCount > 0) {
      trashCountBadge.textContent = String(doneCount);
      trashCountBadge.hidden = false;
      propTrashBin.classList.add('has-done-notes');
      propTrashBin.title = `Thùng rác mini — có ${doneCount} tờ note đã xong, nhấn để gom & dọn 🗑️`;
    } else {
      trashCountBadge.hidden = true;
      propTrashBin.classList.remove('has-done-notes');
      propTrashBin.title = 'Thùng rác mini — hiện chưa có tờ note nào hoàn thành 🗑️';
    }
  }

  function updateProgress() {
    let total = 0;
    let done = 0;
    notes.forEach((n) => {
      if (Array.isArray(n.items) && n.items.length > 0) {
        total += n.items.length;
        done += n.items.filter((it) => it.done).length;
      } else {
        total += 1;
        if (n.done) done += 1;
      }
    });
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    progressBarFill.style.width = `${pct}%`;
    progressText.textContent = `${done}/${total} việc xong`;
    updateTrashBadge();
  }

  function getFilteredNotes() {
    if (activeFilter === 'active') return notes.filter((n) => !n.done);
    if (activeFilter === 'done') return notes.filter((n) => n.done);
    return notes;
  }

  function renderNotes() {
    notesLayer.innerHTML = '';
    const visible = getFilteredNotes();

    if (visible.length === 0) {
      emptyHint.hidden = false;
      if (notes.length === 0) {
        emptyHintText.innerHTML = 'Bảng đang trống nè! Nhấn <strong>Dán note</strong> hoặc nhấp đúp lên bảng để thêm việc mới nha~';
      } else if (activeFilter === 'active') {
        emptyHintText.innerHTML = 'Tuyệt vời! Không còn việc nào đang dang dở hết! 🎉🐾';
      } else {
        emptyHintText.innerHTML = 'Chưa có tờ note nào được tick hoàn thành. Cố lên nhé! 💪';
      }
    } else {
      emptyHint.hidden = true;
    }

    visible.forEach((note) => {
      const el = createNoteElement(note);
      notesLayer.appendChild(el);
    });

    justStampedNoteId = null;
    updateProgress();
    updateBoardCanvasHeight();
  }

  function createRubberStampElement(note, animate = false) {
    const safeId = String(note.id).replace(/[^a-zA-Z0-9_-]/g, '');
    const stampDate = note.completedDate || (() => {
      const d = new Date();
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
    })();

    const wrap = document.createElement('div');
    wrap.className = `note-rubber-stamp${animate ? ' stamp-animate' : ''}`;
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = `
      <svg viewBox="0 0 120 120">
        <defs>
          <path id="stamp-top-${safeId}" d="M 15,60 A 45,45 0 0,1 105,60" />
          <path id="stamp-bot-${safeId}" d="M 12,60 A 48,48 0 0,0 108,60" />
        </defs>
        <!-- Outer & inner crimson seal rings -->
        <circle cx="60" cy="60" r="55" fill="rgba(217, 43, 75, 0.06)" stroke="#CC2444" stroke-width="3.2" stroke-dasharray="140 3 95 2 80 2" />
        <circle cx="60" cy="60" r="41" fill="none" stroke="#CC2444" stroke-width="1.3" stroke-dasharray="3.5 2.5" />
        <!-- Curved top & bottom seal text -->
        <text fill="#CC2444" font-family="Quicksand, sans-serif" font-size="8.6" font-weight="700" letter-spacing="1.1">
          <textPath href="#stamp-top-${safeId}" startOffset="50%" text-anchor="middle">★ SẾP CHIHUAHUA ★</textPath>
        </text>
        <text fill="#CC2444" font-family="Quicksand, sans-serif" font-size="8.2" font-weight="700" letter-spacing="1">
          <textPath href="#stamp-bot-${safeId}" startOffset="50%" text-anchor="middle">DUYỆT • ${stampDate}</textPath>
        </text>
        <!-- Center stamped banner -->
        <rect x="14" y="45" width="92" height="30" rx="6" fill="rgba(255, 248, 248, 0.72)" stroke="#CC2444" stroke-width="2.6" />
        <!-- Tiny paw emblem -->
        <g transform="translate(27 60) scale(0.52)" fill="#CC2444">
          <circle cx="0" cy="4" r="7" />
          <circle cx="-8" cy="-4" r="3.4" />
          <circle cx="-2.8" cy="-8" r="3.4" />
          <circle cx="2.8" cy="-8" r="3.4" />
          <circle cx="8" cy="-4" r="3.4" />
        </g>
        <text x="68" y="65" text-anchor="middle" fill="#CC2444" font-family="Quicksand, sans-serif" font-size="13.5" font-weight="700" letter-spacing="0.8">ĐÃ XONG</text>
      </svg>
    `;
    return wrap;
  }

  function createStamperPropElement() {
    const prop = document.createElement('div');
    prop.className = 'note-stamper-prop';
    prop.setAttribute('aria-hidden', 'true');
    prop.innerHTML = `
      <svg viewBox="0 0 90 104">
        <!-- Wooden rubber stamp handle -->
        <circle cx="45" cy="20" r="15" fill="#D99B66" stroke="#5A3E32" stroke-width="2.8" />
        <ellipse cx="40" cy="15" rx="4.5" ry="2.8" transform="rotate(-25 40 15)" fill="#F7D5AE" opacity="0.7" />
        <path d="M 35 32 Q 38 48 33 60 L 57 60 Q 52 48 55 32 Z" fill="#C4824E" stroke="#5A3E32" stroke-width="2.8" stroke-linejoin="round" />
        <!-- Stamp wooden base -->
        <rect x="14" y="60" width="62" height="15" rx="5" fill="#E6B17A" stroke="#5A3E32" stroke-width="2.8" />
        <!-- Red rubber pad -->
        <rect x="18" y="75" width="54" height="8" rx="3" fill="#CC2444" stroke="#5A3E32" stroke-width="2.4" />
      </svg>
    `;
    return prop;
  }

  function createNoteElement(note) {
    const card = document.createElement('article');
    const isRinging = activeAlarmNoteId === note.id;
    const isFreshStamp = note.done && justStampedNoteId === note.id;
    card.className = `sticky-note color-${note.color}${note.done ? ' is-done' : ''}${isRinging ? ' is-ringing' : ''}${isFreshStamp ? ' stamp-impact' : ''}`;
    card.dataset.id = note.id;
    card.style.left = `${note.x}px`;
    card.style.top = `${note.y}px`;
    card.style.zIndex = note.z || 1;
    card.style.transform = `rotate(${note.rot || 0}deg)`;

    // Fastener (Pushpin or Washi Tape)
    const fastener = document.createElement('div');
    if (note.pinType === 'tape') {
      fastener.className = 'note-fastener tape';
    } else {
      fastener.className = `note-fastener pushpin ${note.pinColor || 'pin-red'}`;
    }
    card.appendChild(fastener);

    // Header (Tag + Time/Edit/Delete)
    const header = document.createElement('div');
    header.className = 'note-header';

    const tagSpan = document.createElement('span');
    tagSpan.className = 'note-tag';
    tagSpan.textContent = note.tag || '📌 Ghi chú';
    if (!note.done) {
      tagSpan.title = 'Nhấn để đổi nhãn tùy thích';
      tagSpan.addEventListener('click', (e) => {
        e.stopPropagation();
        startInlineTagEdit(note, tagSpan);
      });
    }

    const actions = document.createElement('div');
    actions.className = 'note-actions';

    if (!note.done) {
      const timeBtn = document.createElement('button');
      timeBtn.type = 'button';
      timeBtn.className = 'note-mini-btn time-btn';
      timeBtn.title = note.remindTime ? `Đổi giờ nhắc (${note.remindTime})` : 'Đặt giờ nhắc trong ngày';
      timeBtn.textContent = '⏰';
      timeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startInlineTimeEdit(note, footerRow);
      });

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'note-mini-btn edit-btn';
      editBtn.title = 'Sửa toàn bộ nội dung (mỗi dòng 1 việc)';
      editBtn.textContent = '✎';
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startInlineBulkEdit(note, body);
      });

      actions.append(timeBtn, editBtn);
    }

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'note-mini-btn delete-btn';
    delBtn.title = 'Gỡ note khỏi bảng';
    delBtn.textContent = '×';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteNote(note.id, card);
    });

    actions.append(delBtn);
    header.append(tagSpan, actions);
    card.appendChild(header);

    // Body: Multi-item Checklist (1 line = 1 checkbox item, scrolls neatly if many!)
    const body = document.createElement('div');
    body.className = 'note-body';

    const checklist = document.createElement('div');
    checklist.className = 'note-checklist';

    note.items.forEach((item) => {
      const row = document.createElement('div');
      row.className = `note-item${item.done ? ' item-done' : ''}`;

      const checkBtn = document.createElement('button');
      checkBtn.type = 'button';
      checkBtn.className = 'note-check-btn';
      checkBtn.setAttribute('aria-label', item.done ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành');
      checkBtn.textContent = item.done ? '✓' : '';
      checkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNoteItem(note.id, item.id);
      });

      const textEl = document.createElement('p');
      textEl.className = 'note-text';
      textEl.textContent = item.text;
      if (!note.done) {
        textEl.title = 'Nhấp đúp để sửa dòng này';
        textEl.addEventListener('dblclick', (e) => {
          e.stopPropagation();
          startInlineItemEdit(note, item, textEl);
        });
      }

      row.append(checkBtn, textEl);

      if (!note.done && note.items.length > 1) {
        const removeItemBtn = document.createElement('button');
        removeItemBtn.type = 'button';
        removeItemBtn.className = 'note-item-del';
        removeItemBtn.title = 'Xóa dòng này';
        removeItemBtn.textContent = '×';
        removeItemBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteNoteItem(note.id, item.id);
        });
        row.appendChild(removeItemBtn);
      }

      checklist.appendChild(row);
    });

    body.appendChild(checklist);

    // Subtle "+ Thêm việc" button only shown while note is still active (locked once stamped done!)
    if (!note.done) {
      const addRow = document.createElement('div');
      addRow.className = 'note-add-item-row';
      const addItemBtn = document.createElement('button');
      addItemBtn.type = 'button';
      addItemBtn.className = 'note-add-item-btn';
      addItemBtn.textContent = '+ Thêm việc';
      addItemBtn.title = 'Thêm một dòng việc mới vào tờ note này';
      addItemBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startInlineAddItem(note, addRow);
      });
      addRow.appendChild(addItemBtn);
      body.appendChild(addRow);
    }

    card.appendChild(body);

    // Footer row for daily reminder time badge & multi-item progress
    const footerRow = document.createElement('div');
    footerRow.className = 'note-footer-row';
    if (note.remindTime) {
      const status = getReminderStatus(note);
      const timeBadge = document.createElement(note.done ? 'span' : 'button');
      if (!note.done) timeBadge.type = 'button';
      timeBadge.className = `note-time-badge${status === 'due' ? ' is-due' : status === 'soon' ? ' is-soon' : ''}`;
      if (status === 'due') {
        timeBadge.textContent = `🔔 ${note.remindTime} • Tới giờ!`;
      } else if (status === 'soon') {
        timeBadge.textContent = `⏰ ${note.remindTime} • Sắp tới`;
      } else {
        timeBadge.textContent = `⏰ ${note.remindTime}`;
      }
      if (!note.done) {
        timeBadge.title = 'Nhấn để chỉnh hoặc xóa giờ nhắc';
        timeBadge.addEventListener('click', (e) => {
          e.stopPropagation();
          startInlineTimeEdit(note, footerRow);
        });
      }
      footerRow.appendChild(timeBadge);
    }

    if (note.items.length > 1) {
      const doneItems = note.items.filter((it) => it.done).length;
      const miniProg = document.createElement('span');
      miniProg.className = 'note-progress-mini';
      miniProg.textContent = `${doneItems}/${note.items.length} việc`;
      footerRow.appendChild(miniProg);
    }
    card.appendChild(footerRow);

    // Authentic Red Office Rubber Stamp ("SẾP CHIHUAHUA — ĐÃ XONG")
    if (note.done) {
      const stamp = createRubberStampElement(note, isFreshStamp);
      card.appendChild(stamp);
      if (isFreshStamp) {
        const stamperProp = createStamperPropElement();
        card.appendChild(stamperProp);
        setTimeout(() => stamperProp.remove(), 660);
      }
    }

    // Drag & Drop via Pointer Events
    enableNoteDragging(card, note);

    return card;
  }

  function getChihuahuaMouthCenter() {
    const rect = chihuahuaEl.getBoundingClientRect();
    return {
      x: rect.left + rect.width * 0.5,
      y: rect.top + rect.height * 0.6,
      rect,
    };
  }

  function isNearChihuahuaMouth(pointerX, pointerY, cardRect) {
    const mouth = getChihuahuaMouthCenter();
    const distPointer = Math.hypot(pointerX - mouth.x, pointerY - mouth.y);
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const distCard = Math.hypot(cardCenterX - mouth.x, cardCenterY - mouth.y);
    return distPointer < 155 || distCard < 155;
  }

  function eatNoteWithChihuahua(noteId, card) {
    const mouth = getChihuahuaMouthCenter();
    const cardW = card.offsetWidth || 204;
    const cardH = card.offsetHeight || 138;

    // Pull card right into Chihuahua's wide-open mouth
    card.style.left = `${mouth.x - cardW / 2}px`;
    card.style.top = `${mouth.y - cardH / 2}px`;
    card.classList.add('being-eaten');

    playCuteSound('chomp');
    setChiMood('chewing', 1650);
    spawnChiParticles(['😋', '🐾', '✨', '📄', '💖'], 7);
    chiSay(pickRandom(EAT_LINES), 4200);

    setTimeout(() => {
      card.remove();
      if (activeAlarmNoteId === noteId) clearActiveAlarm();
      notes = notes.filter((n) => n.id !== noteId);
      saveNotes();
      renderNotes();
      updateClockNextAlarm();
    }, 240);
  }

  function enableNoteDragging(card, note) {
    let isDragging = false;
    let hasMoved = false;
    let grabOffsetX = 0;
    let grabOffsetY = 0;
    let startClientX = 0;
    let startClientY = 0;
    let overMouth = false;

    card.addEventListener('pointerdown', (e) => {
      // Do not initiate drag when clicking buttons, tag, or editing inputs
      if (
        e.target.closest('button') ||
        e.target.closest('textarea') ||
        e.target.closest('input') ||
        e.target.closest('.note-tag')
      ) {
        return;
      }

      isDragging = true;
      hasMoved = false;
      overMouth = false;
      startClientX = e.clientX;
      startClientY = e.clientY;

      const cardRect = card.getBoundingClientRect();
      grabOffsetX = e.clientX - cardRect.left;
      grabOffsetY = e.clientY - cardRect.top;

      topZ += 1;
      note.z = topZ;
      card.style.zIndex = topZ;
      card.setPointerCapture(e.pointerId);
    });

    card.addEventListener('pointermove', (e) => {
      if (!isDragging) return;

      if (!hasMoved) {
        if (Math.hypot(e.clientX - startClientX, e.clientY - startClientY) < 4) return;
        hasMoved = true;
        isDraggingAnyNote = true;
        hidePettingHand();

        // Lift card into fixed dragOverlay so it can travel off the corkboard to Chihuahua's mouth
        const cardRect = card.getBoundingClientRect();
        card.style.position = 'fixed';
        card.style.width = `${cardRect.width}px`;
        card.style.left = `${cardRect.left}px`;
        card.style.top = `${cardRect.top}px`;
        card.style.margin = '0';
        card.classList.add('dragging');
        card.style.transform = `rotate(${(note.rot || 0) * 0.4}deg) scale(1.04)`;
        dragOverlay.appendChild(card);
        try {
          card.setPointerCapture(e.pointerId);
        } catch {
          // Pointer may already be captured
        }
      }

      const nextLeft = e.clientX - grabOffsetX;
      const nextTop = e.clientY - grabOffsetY;
      card.style.left = `${nextLeft}px`;
      card.style.top = `${nextTop}px`;

      const nowOverMouth = isNearChihuahuaMouth(e.clientX, e.clientY, card.getBoundingClientRect());
      if (nowOverMouth !== overMouth) {
        overMouth = nowOverMouth;
        card.classList.toggle('over-mouth', overMouth);
        if (overMouth) {
          card.style.transform = `rotate(${(note.rot || 0) * 0.2}deg) scale(0.65)`;
          setChiMood('eat-ready', 0);
          chiSay('Aaa~ Thả tờ note vào miệng mình ăn xóa giùm cho! 😋📄', 8000);
        } else {
          card.style.transform = `rotate(${(note.rot || 0) * 0.4}deg) scale(1.04)`;
          setChiMood('idle', 0);
          chiSpeechBubble.classList.add('is-hidden');
        }
      }
    });

    const stopDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      if (card.hasPointerCapture(e.pointerId)) {
        card.releasePointerCapture(e.pointerId);
      }

      if (!hasMoved) return;
      isDraggingAnyNote = false;

      card.classList.remove('dragging', 'over-mouth');

      // If dropped onto Chihuahua's open mouth -> eat & delete!
      if (overMouth) {
        eatNoteWithChihuahua(note.id, card);
        return;
      }

      // On narrow mobile screens, notes live in a clean responsive CSS grid — snap back neatly!
      if (window.innerWidth <= 720) {
        card.style.position = '';
        card.style.width = '';
        card.style.left = '';
        card.style.top = '';
        card.style.transform = `rotate(${note.rot || 0}deg)`;
        notesLayer.appendChild(card);
        return;
      }

      // Otherwise convert viewport position back to scrolled corkboard-relative coordinates
      const scrollRect = boardScroll.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const relX = cardRect.left - scrollRect.left;
      const relY = cardRect.top - scrollRect.top + boardScroll.scrollTop;
      const clamped = clampNotePosition(relX, relY, card.offsetWidth, card.offsetHeight);

      note.x = Math.round(clamped.x);
      note.y = Math.round(clamped.y);

      card.style.position = 'absolute';
      card.style.width = '';
      card.style.left = `${note.x}px`;
      card.style.top = `${note.y}px`;
      card.style.transform = `rotate(${note.rot || 0}deg)`;
      notesLayer.appendChild(card);

      updateBoardCanvasHeight();
      saveNotes();
    };

    card.addEventListener('pointerup', stopDrag);
    card.addEventListener('pointercancel', stopDrag);
  }

  function startInlineTagEdit(note, tagSpan) {
    const parent = tagSpan.parentElement;
    if (!parent || parent.querySelector('.note-tag-inline-input')) return;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'note-tag-inline-input';
    input.maxLength = 24;
    input.value = note.tag || '';
    input.placeholder = 'Nhập nhãn...';

    tagSpan.replaceWith(input);
    input.focus();
    input.select();

    const commit = () => {
      const val = input.value.trim();
      note.tag = val || '📌 Ghi chú';
      saveNotes();
      renderNotes();
    };

    input.addEventListener('blur', commit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        commit();
      } else if (e.key === 'Escape') {
        renderNotes();
      }
    });
  }

  function startInlineTimeEdit(note, footerRow) {
    if (!footerRow || footerRow.querySelector('.note-time-inline-input')) return;

    footerRow.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'note-time-inline-wrap';

    const input = document.createElement('input');
    input.type = 'time';
    input.className = 'note-time-inline-input';
    input.value = note.remindTime || formatMinutesToTime(getNowMinutes() + 15);

    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'note-time-inline-save';
    saveBtn.title = 'Lưu giờ nhắc';
    saveBtn.textContent = '✓';

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'note-time-inline-clear';
    clearBtn.title = 'Tắt giờ nhắc';
    clearBtn.textContent = '✕';

    let closed = false;
    const commit = (nextVal) => {
      if (closed) return;
      closed = true;
      note.remindTime = nextVal || '';
      note.remindedDate = '';
      if (activeAlarmNoteId === note.id) clearActiveAlarm();
      saveNotes();
      renderNotes();
      updateClockNextAlarm();
      if (note.remindTime) {
        maybeRequestNotificationPermission();
        playCuteSound('pin');
        chiSay(`Đã hẹn giờ nhắc lúc ${note.remindTime}! Tới giờ Sếp Chi sẽ gọi liền nha ⏰🐾`, 3800);
      } else {
        playCuteSound('click');
      }
    };

    saveBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      commit(input.value);
    });

    clearBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      commit('');
    });

    input.addEventListener('blur', () => {
      // Allow clicking save/clear buttons inside wrap before committing
      setTimeout(() => {
        if (!closed && document.activeElement !== saveBtn && document.activeElement !== clearBtn) {
          commit(input.value);
        }
      }, 120);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        commit(input.value);
      } else if (e.key === 'Escape') {
        closed = true;
        renderNotes();
      }
    });

    wrap.append(input, saveBtn, clearBtn);
    footerRow.appendChild(wrap);
    input.focus();
  }

  function startInlineItemEdit(note, item, textEl) {
    const parent = textEl.parentElement;
    if (!parent || parent.querySelector('textarea')) return;

    const textarea = document.createElement('textarea');
    textarea.className = 'note-edit-textarea';
    textarea.maxLength = 240;
    textarea.rows = 2;
    textarea.value = item.text;

    textEl.replaceWith(textarea);
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    const commit = () => {
      const val = textarea.value.trim();
      if (val) {
        item.text = val;
        syncNoteDerivedFields(note);
        saveNotes();
      }
      renderNotes();
    };

    textarea.addEventListener('blur', commit);
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        commit();
      } else if (e.key === 'Escape') {
        renderNotes();
      }
    });
  }

  function startInlineBulkEdit(note, bodyEl) {
    if (!bodyEl || bodyEl.querySelector('.note-edit-textarea')) return;

    const textarea = document.createElement('textarea');
    textarea.className = 'note-edit-textarea';
    textarea.maxLength = 600;
    textarea.rows = Math.min(7, Math.max(3, note.items.length + 1));
    textarea.value = note.items.map((it) => it.text).join('\n');
    textarea.placeholder = 'Mỗi dòng là 1 việc nha...';

    bodyEl.innerHTML = '';
    bodyEl.appendChild(textarea);
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    let done = false;
    const commit = () => {
      if (done) return;
      done = true;
      const oldMap = new Map(note.items.map((it) => [it.text, it.done]));
      const nextItems = parseLinesToItems(textarea.value, false);
      if (nextItems.length > 0) {
        nextItems.forEach((it) => {
          if (oldMap.has(it.text)) it.done = oldMap.get(it.text);
        });
        note.items = nextItems;
        syncNoteDerivedFields(note);
        saveNotes();
      }
      renderNotes();
    };

    textarea.addEventListener('blur', commit);
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        commit();
      } else if (e.key === 'Escape') {
        done = true;
        renderNotes();
      }
    });
  }

  function startInlineAddItem(note, addRow) {
    if (!addRow || addRow.querySelector('.note-add-item-input')) return;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'note-add-item-input';
    input.maxLength = 140;
    input.placeholder = 'Nhập việc mới rồi nhấn Enter...';

    addRow.innerHTML = '';
    addRow.appendChild(input);
    input.focus();

    let closed = false;
    const commit = (keepAdding = false) => {
      if (closed) return;
      const val = input.value.trim();
      if (val) {
        note.items.push({
          id: `it-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          text: val,
          done: false,
        });
        syncNoteDerivedFields(note);
        saveNotes();
        playCuteSound('pin');
      }
      closed = true;
      renderNotes();
      if (keepAdding && val) {
        const card = notesLayer.querySelector(`.sticky-note[data-id="${note.id}"]`);
        const nextAddRow = card?.querySelector('.note-add-item-row');
        if (nextAddRow) startInlineAddItem(note, nextAddRow);
      }
    };

    input.addEventListener('blur', () => commit(false));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        commit(true);
      } else if (e.key === 'Escape') {
        closed = true;
        renderNotes();
      }
    });
  }

  function deleteNoteItem(noteId, itemId) {
    const note = notes.find((n) => n.id === noteId);
    if (!note || note.items.length <= 1) return;
    note.items = note.items.filter((it) => it.id !== itemId);
    syncNoteDerivedFields(note);
    saveNotes();
    playCuteSound('click');
    renderNotes();
    updateClockNextAlarm();
  }

  function celebrateNoteCompletion(justCompletedFullNote) {
    if (justCompletedFullNote) {
      playCuteSound('stamp');
      setTimeout(() => playCuteSound('done'), 180);
      const allDone = notes.length > 0 && notes.every((n) => n.done);
      if (allDone) {
        setChiMood('happy', 2800);
        spawnChiParticles(['🎉', '🦴', '✨', '💖', '🐾', '🌟'], 9);
        chiSay(pickRandom(ALL_DONE_LINES), 5200);
      } else {
        setChiMood('happy', 2000);
        spawnChiParticles(['✨', '💖', '🐾', '🦴'], 6);
        chiSay(pickRandom(DONE_LINES), 4200);
      }
    } else {
      playCuteSound('pin');
      setChiMood('happy', 1200);
      spawnChiParticles(['✨', '🐾'], 3);
    }
  }

  function formatStampDate() {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
  }

  function toggleNoteItem(noteId, itemId) {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;
    const item = note.items.find((it) => it.id === itemId);
    if (!item) return;

    const wasNoteDone = note.done;
    item.done = !item.done;
    syncNoteDerivedFields(note);

    const newlyCompleted = !wasNoteDone && note.done;
    if (newlyCompleted) {
      note.completedDate = formatStampDate();
      justStampedNoteId = note.id;
    }

    if (note.done && activeAlarmNoteId === noteId) {
      stopAlarmRingLoop();
      activeAlarmNoteId = null;
      alarmToast.hidden = true;
      propDeskClock.classList.remove('is-ringing');
    }

    saveNotes();
    renderNotes();
    updateClockNextAlarm();

    if (item.done) {
      celebrateNoteCompletion(newlyCompleted);
    } else {
      playCuteSound('click');
    }
  }

  function toggleNoteDone(id) {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    const nextDone = !note.done;
    note.items.forEach((it) => {
      it.done = nextDone;
    });
    syncNoteDerivedFields(note);
    if (nextDone) {
      note.completedDate = formatStampDate();
      justStampedNoteId = note.id;
    }
    if (note.done && activeAlarmNoteId === id) {
      stopAlarmRingLoop();
      activeAlarmNoteId = null;
      alarmToast.hidden = true;
      propDeskClock.classList.remove('is-ringing');
    }
    saveNotes();
    renderNotes();
    updateClockNextAlarm();

    if (note.done) {
      celebrateNoteCompletion(true);
    } else {
      playCuteSound('click');
      chiSay('Gâu! Mở lại việc này để làm tiếp nhé~ 📌', 3200);
    }
  }

  function deleteNote(id, cardEl) {
    playCuteSound('click');
    cardEl.style.transition = 'transform 0.22s ease, opacity 0.22s ease';
    cardEl.style.transform = 'scale(0.6) rotate(12deg)';
    cardEl.style.opacity = '0';
    setTimeout(() => {
      if (activeAlarmNoteId === id) clearActiveAlarm();
      notes = notes.filter((n) => n.id !== id);
      saveNotes();
      renderNotes();
      updateClockNextAlarm();
      chiSay('Đã gỡ tờ note khỏi bảng gọn gàng rồi nha! 🧹', 3000);
    }, 210);
  }

  /* Auto-arrange all sticky notes neatly down the vertically scrollable corkboard with zero overlap */
  function tidyNotes(announce = true) {
    const availW = boardScroll.clientWidth || boardCanvas.clientWidth || 960;
    const usableW = Math.max(360, availW - 140);
    const noteW = window.innerWidth <= 700 ? 180 : 236;
    const cols = Math.max(1, Math.floor(usableW / noteW));
    const startX = Math.max(20, (availW - cols * noteW) / 2);

    // Measure actual card heights per row so taller multi-item notes get plenty of breathing room
    const heightMap = new Map();
    notesLayer.querySelectorAll('.sticky-note').forEach((el) => {
      heightMap.set(el.dataset.id, el.offsetHeight || 160);
    });

    const rowCount = Math.ceil(notes.length / cols);
    const rowTops = [];
    let currentY = 60;
    for (let r = 0; r < rowCount; r++) {
      rowTops.push(currentY);
      let maxRowH = 152;
      for (let c = 0; c < cols; c++) {
        const n = notes[r * cols + c];
        if (n) {
          const fallbackH = n.items && n.items.length > 2 ? 210 : n.text.length > 52 ? 176 : 154;
          const measured = heightMap.get(n.id) || fallbackH;
          maxRowH = Math.max(maxRowH, measured);
        }
      }
      currentY += maxRowH + 28;
    }

    notes.forEach((note, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const rawX = startX + col * noteW + (idx % 2 === 0 ? -3 : 3);
      const rawY = rowTops[row] + (col % 2 === 0 ? 0 : 6);
      const clamped = clampNotePosition(rawX, rawY, 220);
      note.x = Math.round(clamped.x);
      note.y = Math.round(clamped.y);
      note.rot = Number((((idx * 17) % 5) - 2) * 1.0);
    });

    saveNotes();
    renderNotes();
    if (announce) {
      boardScroll.scrollTo({ top: 0, behavior: 'smooth' });
      playCuteSound('pin');
      setChiMood('excited', 1400);
      spawnChiParticles(['✨', '📌', '🌸'], 5);
      chiSay('Úm ba la! Bảng note xếp thẳng hàng tăm tắp, cuộn xuống xem thoải mái luôn! ✨', 3800);
    }
  }

  /* ========================================================================
     Sticky Note Composer Modal
     ======================================================================== */
  function syncTagUI(value) {
    composerState.tag = value;
    composerTagPreview.textContent = value.trim() || '📌 Ghi chú';
    tagPills.forEach((b) => {
      b.classList.toggle('active', b.dataset.tag === value.trim());
    });
  }

  function syncTimeUI(val) {
    composerState.remindTime = val || '';
    if (composerState.remindTime) {
      composerTimePreview.textContent = `⏰ ${composerState.remindTime}`;
      composerTimePreview.hidden = false;
      btnClearTime.hidden = false;
    } else {
      composerTimePreview.hidden = true;
      btnClearTime.hidden = true;
    }
  }

  function openComposer(dropPos = null) {
    composerState.dropPos = dropPos;
    noteInput.value = '';
    charCount.textContent = '0';
    noteTagInput.value = composerState.tag || '💼 Công việc';
    syncTagUI(noteTagInput.value);
    noteTimeInput.value = '';
    syncTimeUI('');
    modalBackdrop.hidden = false;
    setTimeout(() => noteInput.focus(), 40);
    playCuteSound('click');
  }

  function closeComposer() {
    modalBackdrop.hidden = true;
    composerState.dropPos = null;
  }

  function updateComposerPreview() {
    composerPaper.className = `composer-paper color-${composerState.color}`;
    composerPinPreview.classList.toggle('is-tape', composerState.pinType === 'tape');
  }

  colorSwatches.forEach((btn) => {
    btn.addEventListener('click', () => {
      colorSwatches.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      composerState.color = btn.dataset.color;
      updateComposerPreview();
    });
  });

  noteTagInput.addEventListener('input', () => {
    syncTagUI(noteTagInput.value);
  });

  tagPills.forEach((btn) => {
    btn.addEventListener('click', () => {
      noteTagInput.value = btn.dataset.tag;
      syncTagUI(btn.dataset.tag);
      playCuteSound('click');
    });
  });

  noteTimeInput.addEventListener('input', () => {
    syncTimeUI(noteTimeInput.value);
  });

  btnClearTime.addEventListener('click', () => {
    noteTimeInput.value = '';
    syncTimeUI('');
    playCuteSound('click');
  });

  timeQuickPills.forEach((btn) => {
    btn.addEventListener('click', () => {
      let chosen = '';
      if (btn.dataset.offset) {
        chosen = formatMinutesToTime(getNowMinutes() + Number(btn.dataset.offset));
      } else if (btn.dataset.fixed) {
        chosen = btn.dataset.fixed;
      }
      noteTimeInput.value = chosen;
      syncTimeUI(chosen);
      playCuteSound('click');
    });
  });

  pinPills.forEach((btn) => {
    btn.addEventListener('click', () => {
      pinPills.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      composerState.pinType = btn.dataset.pin;
      updateComposerPreview();
    });
  });

  noteInput.addEventListener('input', () => {
    charCount.textContent = String(noteInput.value.length);
  });

  noteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      noteForm.requestSubmit();
    }
  });

  noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = noteInput.value.trim();
    const items = parseLinesToItems(text, false);
    if (items.length === 0) return;

    const customTag = noteTagInput.value.trim() || '📌 Ghi chú';
    composerState.tag = customTag;

    const availW = boardScroll.clientWidth || 960;
    const colW = window.innerWidth <= 700 ? 180 : 236;
    const cols = Math.max(1, Math.floor(Math.max(360, availW - 140) / colW));
    const startX = Math.max(20, (availW - cols * colW) / 2);
    let targetX, targetY;

    if (composerState.dropPos) {
      targetX = composerState.dropPos.x - 110;
      targetY = composerState.dropPos.y - 30;
    } else {
      // Place neatly in next grid slot down the scrollable board
      const idx = notes.length;
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      targetX = startX + col * colW + (Math.random() * 14 - 7);
      targetY = 62 + row * 195 + (Math.random() * 12);
    }

    const clamped = clampNotePosition(targetX, targetY, 220);
    topZ += 1;

    const remindTime = noteTimeInput.value || '';

    const newNote = normalizeNote({
      id: `n-${Date.now()}`,
      text,
      items,
      color: composerState.color,
      tag: customTag,
      pinType: composerState.pinType,
      pinColor: pickRandom(PIN_COLORS),
      remindTime,
      remindedDate: '',
      done: false,
      x: Math.round(clamped.x),
      y: Math.round(clamped.y),
      rot: Number(((Math.random() * 5.2) - 2.6).toFixed(1)),
      z: topZ,
    });

    if (remindTime) {
      maybeRequestNotificationPermission();
    }

    notes.push(newNote);
    if (activeFilter === 'done') {
      activeFilter = 'all';
      filterBtns.forEach((b) => {
        b.classList.toggle('active', b.dataset.filter === 'all');
        b.setAttribute('aria-selected', String(b.dataset.filter === 'all'));
      });
    }

    saveNotes();
    renderNotes();
    updateClockNextAlarm();
    closeComposer();

    // Smoothly scroll the corkboard so the newly pinned note is always visible
    if (!composerState.dropPos && newNote.y > boardScroll.scrollTop + boardScroll.clientHeight - 200) {
      boardScroll.scrollTo({ top: Math.max(0, newNote.y - 90), behavior: 'smooth' });
    }

    playCuteSound('pin');
    setChiMood('excited', 1700);
    spawnChiParticles(['📌', '✨', '🐾'], 5);
    const countMsg = items.length > 1 ? ` (${items.length} đầu việc)` : '';
    chiSay(
      remindTime
        ? `Gâu! Đã ghim note${countMsg} và hẹn chuông lúc ${remindTime} nha! ⏰📌`
        : items.length > 1
          ? `Gâu! Đã dán tờ checklist gồm ${items.length} việc lên bảng rồi nha! 📋✨`
          : pickRandom(ADD_LINES),
      4200
    );
  });

  /* ========================================================================
     Event Listeners for Toolbar, Board & Office Desk Props
     ======================================================================== */
  btnAddNote.addEventListener('click', () => openComposer());
  btnCloseModal.addEventListener('click', closeComposer);
  btnCancelModal.addEventListener('click', closeComposer);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeComposer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!modalBackdrop.hidden) closeComposer();
      if (!trashModalBackdrop.hidden) closeTrashConfirmModal();
      if (!guideModalBackdrop.hidden) closeGuideModal();
      if (!pomoPopover.hidden) pomoPopover.hidden = true;
      if (!musicPopover.classList.contains('is-closed')) musicPopover.classList.add('is-closed');
    }
  });

  // Double-click empty area on scrolled corkboard to pin a new note right there!
  boardScroll.addEventListener('dblclick', (e) => {
    if (e.target.closest('.sticky-note')) return;
    const rect = boardScroll.getBoundingClientRect();
    openComposer({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top + boardScroll.scrollTop,
    });
  });

  // Filters
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      filterBtns.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', String(isActive));
      });
      playCuteSound('click');
      renderNotes();
    });
  });

  btnTidy.addEventListener('click', () => tidyNotes(true));

  btnSound.addEventListener('click', () => {
    settings.sound = !settings.sound;
    applySettings();
    saveSettings();
    if (settings.sound) playCuteSound('pin');
  });

  function toggleTheme() {
    settings.theme = settings.theme === 'night' ? 'day' : 'night';
    applySettings();
    saveSettings();
    playCuteSound('click');
    if (settings.theme === 'night') {
      chiSay('Bật đèn bàn lên rồi! Không gian làm việc buổi tối chill quá nè~ 💡🌙', 4200);
    } else {
      chiSay('Chào buổi sáng nắng đẹp! Bắt đầu ngày mới tràn đầy năng lượng nào! ☀️🐾', 4200);
    }
  }

  btnTheme.addEventListener('click', toggleTheme);
  propDeskLamp.addEventListener('click', toggleTheme);

  // Click speech bubble to dismiss it early
  chiSpeechBubble.addEventListener('click', () => {
    clearTimeout(speechTimer);
    chiSpeechBubble.classList.add('is-hidden');
  });

  /* ========================================================================
     Interactive Head-Rub Petting (Mouse Hover/Move OR Touch Rub on Head!)
     ======================================================================== */
  let lastPetX = null;
  let lastPetY = null;
  let rubDistance = 0;
  let rubPurrAccum = 0;
  let rubSayAccum = 0;
  let petIdleTimer = null;
  let justRubbed = false;

  function hidePettingHand() {
    pettingHandEl.classList.remove('visible');
    chihuahuaEl.classList.remove('is-pet-zone');
    chihuahuaEl.style.setProperty('--pet-tilt', '0deg');
    lastPetX = null;
    lastPetY = null;
  }

  function isPointerOnChihuahuaHead(e) {
    const rect = chihuahuaEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    return relX >= 0.04 && relX <= 0.96 && relY >= 0.02 && relY <= 0.74;
  }

  function handleHeadPetMove(e) {
    if (isDraggingAnyNote) {
      hidePettingHand();
      return;
    }

    const isTouch = e.pointerType === 'touch' || touchDownActive;
    // When rubbing with finger on mobile, keep petting active even if finger drifts slightly
    if (!isTouch && !isPointerOnChihuahuaHead(e)) {
      hidePettingHand();
      return;
    }

    chihuahuaEl.classList.add('is-pet-zone');
    pettingHandEl.classList.add('visible');

    let handTilt = 0;
    if (lastPetX !== null && lastPetY !== null) {
      const dx = e.clientX - lastPetX;
      const dy = e.clientY - lastPetY;
      const step = Math.hypot(dx, dy);

      handTilt = Math.max(-22, Math.min(22, dx * 1.4));
      const headTilt = Math.max(-5, Math.min(5, dx * 0.35));
      chihuahuaEl.style.setProperty('--pet-tilt', `${headTilt.toFixed(1)}deg`);

      const rubStartThresh = isTouch ? 10 : 22;
      const heartThresh = isTouch ? 38 : 62;
      const purrThresh = isTouch ? 120 : 185;
      const sayThresh = isTouch ? 170 : 260;

      if (step > 1.2) {
        rubDistance += step;
        rubPurrAccum += step;
        rubSayAccum += step;

        if (rubDistance > rubStartThresh) {
          justRubbed = true;
          setChiMood('petting', 0);

          clearTimeout(petIdleTimer);
          petIdleTimer = setTimeout(() => {
            if (!isDraggingAnyNote && chihuahuaEl.classList.contains('mood-petting')) {
              setChiMood('idle', 0);
              chihuahuaEl.style.setProperty('--pet-tilt', '0deg');
            }
            rubDistance = 0;
          }, 620);
        }

        if (rubDistance > heartThresh) {
          spawnChiParticles(['💖', '💕', '✨', '🐾'], 2);
          rubDistance = rubStartThresh + 2;
        }

        if (rubPurrAccum > purrThresh) {
          playCuteSound('purr');
          rubPurrAccum = 0;
        }

        if (rubSayAccum > sayThresh) {
          chiSay(pickRandom(HEAD_RUB_LINES), 3800);
          rubSayAccum = 0;
        }
      }
    }

    const touchOffsetY = isTouch ? -24 : 0;
    pettingHandEl.style.transform = `translate(${e.clientX}px, ${e.clientY + touchOffsetY}px) translate(-50%, -55%) rotate(${handTilt.toFixed(1)}deg)`;
    lastPetX = e.clientX;
    lastPetY = e.clientY;
  }

  let touchDownActive = false;
  let touchDragDist = 0;

  chihuahuaEl.addEventListener('pointermove', (e) => {
    if (touchDownActive && lastPetX !== null && lastPetY !== null) {
      touchDragDist += Math.hypot(e.clientX - lastPetX, e.clientY - lastPetY);
    }
    handleHeadPetMove(e);
  });

  chihuahuaEl.addEventListener('pointerdown', (e) => {
    touchDownActive = e.pointerType === 'touch' || e.pointerType === 'pen';
    touchDragDist = 0;
    if (touchDownActive) {
      lastPetX = e.clientX;
      lastPetY = e.clientY;
      try {
        chihuahuaEl.setPointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
      if (isPointerOnChihuahuaHead(e)) {
        handleHeadPetMove(e);
      }
    }
  });

  const endTouchPet = (e) => {
    if (touchDownActive) {
      touchDownActive = false;
      try {
        if (chihuahuaEl.hasPointerCapture(e.pointerId)) {
          chihuahuaEl.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore
      }
      hidePettingHand();
      if (!isDraggingAnyNote && chihuahuaEl.classList.contains('mood-petting')) {
        clearTimeout(petIdleTimer);
        petIdleTimer = setTimeout(() => {
          setChiMood('idle', 0);
        }, 420);
      }
    }
  };

  chihuahuaEl.addEventListener('pointerup', endTouchPet);
  chihuahuaEl.addEventListener('pointercancel', endTouchPet);

  chihuahuaEl.addEventListener('pointerleave', () => {
    if (touchDownActive) return;
    hidePettingHand();
    if (!isDraggingAnyNote && chihuahuaEl.classList.contains('mood-petting')) {
      clearTimeout(petIdleTimer);
      petIdleTimer = setTimeout(() => {
        setChiMood('idle', 0);
      }, 360);
    }
  });

  // Click/tap Chihuahua -> Sủa "Gâu! Gâu!" cực dễ thương!
  chihuahuaEl.addEventListener('click', () => {
    // Only skip bark if user was dragging a finger to rub on touchscreen
    if (touchDragDist > 16) {
      touchDragDist = 0;
      return;
    }
    clearTimeout(petIdleTimer);
    playCuteSound('bark');

    // Restart bark CSS animation cleanly even on rapid repeated clicks
    chihuahuaEl.classList.remove('mood-bark');
    void chihuahuaEl.offsetWidth;
    setChiMood('bark', 560);

    spawnBarkPop('Gâu!', 66, 48, 22, 10, 0);
    spawnBarkPop('Gâu!', 16, 44, -24, -10, 200);
    spawnChiParticles(['🐾', '✨'], 3);
    chiSay(pickRandom(BARK_LINES), 3800);
  });

  // Click nameplate to toggle cute office glasses!
  deskNameplate.addEventListener('click', () => {
    settings.glasses = !settings.glasses;
    applySettings();
    saveSettings();
    playCuteSound('click');
    spawnChiParticles(['✨', '👓'], 3);
    chiSay(
      settings.glasses
        ? 'Đeo kính vào trông Sếp Chi tri thức chưa nè! 👓✨'
        : 'Tháo kính ra cho đôi mắt to tròn long lanh nha~ 🥺🐾',
      3600
    );
  });

  // Click coffee mug
  propMug.addEventListener('click', () => {
    playCuteSound('pet');
    setChiMood('happy', 1700);
    spawnChiParticles(['☕', '✨', '💛'], 5);
    chiSay(pickRandom(COFFEE_LINES), 4000);
  });

  // Click sticky pad on desk to quickly compose a new note!
  propStickyPad.addEventListener('click', () => openComposer());

  /* ========================================================================
     Mini Office Trash Bin — Gather & Clear Completed Notes (with Confirmation!)
     ======================================================================== */
  const COLOR_SWATCH_MAP = {
    yellow: '#FFF3A8',
    pink: '#FFD6E4',
    mint: '#CBF3DF',
    blue: '#CEE9FF',
    lavender: '#E7D6FF',
    peach: '#FFE1C4',
  };

  function openTrashConfirmModal() {
    const doneNotes = notes.filter((n) => n.done);
    if (doneNotes.length === 0) {
      playCuteSound('click');
      chiSay('Thùng rác đang sạch bóng nè! Chưa có tờ note nào đã xong để gom đâu~ 🗑️✨', 3800);
      return;
    }

    playCuteSound('click');
    trashConfirmDesc.innerHTML = `Bạn có đồng ý gom và xóa <strong>${doneNotes.length} tờ note đã hoàn thành</strong> này vào thùng rác không?`;
    trashPreviewList.innerHTML = '';

    doneNotes.forEach((note) => {
      const li = document.createElement('li');
      li.className = 'trash-preview-item';

      const dot = document.createElement('span');
      dot.className = 'trash-preview-dot';
      dot.style.background = COLOR_SWATCH_MAP[note.color] || '#FFF3A8';

      const label = document.createElement('span');
      label.textContent = getNoteSummaryText(note);

      li.append(dot, label);
      trashPreviewList.appendChild(li);
    });

    trashModalBackdrop.hidden = false;
  }

  function closeTrashConfirmModal() {
    trashModalBackdrop.hidden = true;
  }

  function sweepCompletedNotesToTrash() {
    const doneNotes = notes.filter((n) => n.done);
    const count = doneNotes.length;
    closeTrashConfirmModal();
    if (count === 0) return;

    const binRect = propTrashBin.getBoundingClientRect();
    const targetX = binRect.left + binRect.width / 2;
    const targetY = binRect.top + binRect.height * 0.36;

    // Flip trash bin lid wide open and animate every completed note flying into the bin!
    propTrashBin.classList.add('is-sweeping');
    playCuteSound('sweep');

    const flyingEls = [];
    doneNotes.forEach((note, idx) => {
      const card = notesLayer.querySelector(`.sticky-note[data-id="${note.id}"]`);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.left = `${rect.left}px`;
      card.style.top = `${rect.top}px`;
      card.style.width = `${rect.width}px`;
      card.style.margin = '0';
      card.classList.add('flying-to-trash');
      dragOverlay.appendChild(card);
      flyingEls.push(card);

      setTimeout(() => {
        card.style.left = `${targetX - rect.width / 2}px`;
        card.style.top = `${targetY - rect.height / 2}px`;
        card.style.transform = `scale(0.14) rotate(${idx % 2 === 0 ? 180 : -180}deg)`;
        card.style.opacity = '0';
      }, 25 + idx * 55);
    });

    const cleanupDelay = 520 + Math.min(4, count) * 55;
    setTimeout(() => {
      flyingEls.forEach((el) => el.remove());
      const doneIds = new Set(doneNotes.map((n) => n.id));
      if (activeAlarmNoteId && doneIds.has(activeAlarmNoteId)) {
        clearActiveAlarm();
      }
      notes = notes.filter((n) => !n.done);
      saveNotes();
      renderNotes();
      updateClockNextAlarm();

      setTimeout(() => propTrashBin.classList.remove('is-sweeping'), 220);
      setChiMood('happy', 2000);
      spawnChiParticles(['🗑️', '✨', '🐾', '🌸'], 6);
      chiSay(`Vèo vèo~ Đã gom sạch ${count} tờ note đã xong vào thùng rác! Bảng thoáng đẹp quá nè! 🗑️✨`, 4400);
    }, cleanupDelay);
  }

  propTrashBin.addEventListener('click', openTrashConfirmModal);
  btnCloseTrashModal.addEventListener('click', closeTrashConfirmModal);
  btnCancelTrash.addEventListener('click', closeTrashConfirmModal);
  btnConfirmTrash.addEventListener('click', sweepCompletedNotesToTrash);
  trashModalBackdrop.addEventListener('click', (e) => {
    if (e.target === trashModalBackdrop) closeTrashConfirmModal();
  });

  /* ========================================================================
     Interactive Polaroid User Guide Modal
     ======================================================================== */
  function openGuideModal() {
    playCuteSound('click');
    guideModalBackdrop.hidden = false;
  }

  function closeGuideModal() {
    guideModalBackdrop.hidden = true;
  }

  btnGuidePolaroid.addEventListener('click', openGuideModal);
  btnMobileGuide.addEventListener('click', openGuideModal);
  btnCloseGuideModal.addEventListener('click', closeGuideModal);
  btnOkGuide.addEventListener('click', () => {
    playCuteSound('pin');
    closeGuideModal();
    setChiMood('happy', 1500);
    spawnChiParticles(['🐾', '✨', '💖'], 4);
    chiSay('Tuyệt vời! Sẵn sàng chinh phục mọi tờ note cùng Sếp Chi nào! 💪🐾', 3800);
  });
  guideModalBackdrop.addEventListener('click', (e) => {
    if (e.target === guideModalBackdrop) closeGuideModal();
  });

  guideTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.gtab;
      guideTabs.forEach((t) => {
        const isAct = t === tab;
        t.classList.toggle('active', isAct);
        t.setAttribute('aria-selected', String(isAct));
      });
      guidePanels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.gpanel === target);
      });
      playCuteSound('click');
    });
  });

  /* ========================================================================
     Cute Tomato Pomodoro Timer (Drift-Free Wall-Clock Countdown)
     ======================================================================== */
  const POMO_RING_CIRC = 2 * Math.PI * 50; // r=50 -> 314.16
  const POMO_MODE_META = {
    focus: { label: 'Tập trung cao độ', defaultMins: 25, emoji: '🍅' },
    short: { label: 'Nghỉ ngắn thư giãn', defaultMins: 5, emoji: '☕' },
    long: { label: 'Nghỉ dài nạp năng lượng', defaultMins: 15, emoji: '🌿' },
  };

  let pomoState = {
    mode: 'focus',
    totalSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    running: false,
    endAt: null,
    timerId: null,
    doneToday: 0,
    doneDate: getTodayKey(),
  };

  function loadPomoStats() {
    try {
      const raw = localStorage.getItem(POMO_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.doneDate === getTodayKey()) {
          pomoState.doneToday = Number(parsed.doneToday) || 0;
          pomoState.doneDate = parsed.doneDate;
        }
      }
    } catch {
      // Keep defaults
    }
    pomoDoneCountEl.textContent = String(pomoState.doneToday);
  }

  function savePomoStats() {
    try {
      localStorage.setItem(
        POMO_KEY,
        JSON.stringify({ doneToday: pomoState.doneToday, doneDate: getTodayKey() })
      );
    } catch {
      // Ignore
    }
  }

  function formatMMSS(sec) {
    const safe = Math.max(0, Math.ceil(sec));
    const m = String(Math.floor(safe / 60)).padStart(2, '0');
    const s = String(safe % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function renderPomoUI() {
    const str = formatMMSS(pomoState.remainingSeconds);
    pomoDeskTime.textContent = str;
    pomoBigTime.textContent = str;

    const meta = POMO_MODE_META[pomoState.mode] || POMO_MODE_META.focus;
    pomoModeLabel.textContent = meta.label;
    pomoPopover.classList.remove('mode-focus', 'mode-short', 'mode-long');
    pomoPopover.classList.add(`mode-${pomoState.mode}`);

    pomoModeBtns.forEach((b) => {
      b.classList.toggle('active', b.dataset.mode === pomoState.mode);
    });

    const ratio = pomoState.totalSeconds > 0
      ? Math.max(0, Math.min(1, pomoState.remainingSeconds / pomoState.totalSeconds))
      : 0;
    pomoRingProgress.style.strokeDashoffset = String((POMO_RING_CIRC * (1 - ratio)).toFixed(2));

    propPomodoro.classList.toggle('is-running', pomoState.running);
    propPomodoro.classList.toggle('is-break', pomoState.mode !== 'focus');

    if (pomoState.running) {
      btnPomoToggle.textContent = '⏸ Tạm dừng';
      btnPomoToggle.classList.add('is-paused');
      document.title = `${meta.emoji} ${str} — Chi-Do List`;
    } else {
      btnPomoToggle.textContent =
        pomoState.remainingSeconds < pomoState.totalSeconds && pomoState.remainingSeconds > 0
          ? '▶ Tiếp tục'
          : '▶ Bắt đầu';
      btnPomoToggle.classList.remove('is-paused');
      document.title = DEFAULT_DOC_TITLE;
    }

    pomoDoneCountEl.textContent = String(pomoState.doneToday);
  }

  function stopPomoInterval() {
    if (pomoState.timerId) {
      clearInterval(pomoState.timerId);
      pomoState.timerId = null;
    }
    pomoState.running = false;
    pomoState.endAt = null;
  }

  function setPomoDurationMinutes(mins) {
    const clamped = Math.max(1, Math.min(120, Math.round(Number(mins) || 25)));
    stopPomoInterval();
    pomoState.totalSeconds = clamped * 60;
    pomoState.remainingSeconds = clamped * 60;
    pomoMinsInput.value = String(clamped);
    renderPomoUI();
  }

  function switchPomoMode(mode, customMins = null) {
    pomoState.mode = mode;
    const mins = customMins ?? (POMO_MODE_META[mode]?.defaultMins || 25);
    setPomoDurationMinutes(mins);
  }

  function completePomoSession() {
    stopPomoInterval();
    pomoState.remainingSeconds = 0;
    renderPomoUI();

    playCuteSound('alarm');
    propPomodoro.classList.add('is-ringing');
    setTimeout(() => propPomodoro.classList.remove('is-ringing'), 2400);

    if (pomoState.mode === 'focus') {
      if (pomoState.doneDate !== getTodayKey()) {
        pomoState.doneDate = getTodayKey();
        pomoState.doneToday = 0;
      }
      pomoState.doneToday += 1;
      savePomoStats();

      setChiMood('happy', 3200);
      spawnChiParticles(['🍅', '✨', '🎉', '🐾', '💖'], 8);
      chiSay(
        `Ting ting! Xong 1 quả cà chua tập trung rồi! (Hôm nay: ${pomoState.doneToday} 🍅) Nghỉ 5 phút nha~ ☕`,
        6200
      );

      if ('Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification('🍅 Hoàn thành phiên Pomodoro!', {
            body: `Sếp Chihuahua chúc mừng! Bạn đã hoàn thành ${pomoState.doneToday} quả cà chua hôm nay. Nghỉ ngơi 5 phút nhé!`,
          });
        } catch {
          // Ignore
        }
      }

      // Auto-ready short break (every 4th focus -> long break!)
      const nextBreak = pomoState.doneToday % 4 === 0 ? 'long' : 'short';
      setTimeout(() => switchPomoMode(nextBreak), 900);
    } else {
      setChiMood('excited', 2600);
      spawnChiParticles(['🍅', '💪', '🐾', '✨'], 6);
      chiSay('Hết giờ nghỉ rồi đồng nghiệp ơi! Bắt đầu quả cà chua tập trung mới nào~ 🍅💪', 5400);

      if ('Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification('⏰ Hết giờ nghỉ Pomodoro!', {
            body: 'Cùng Sếp Chihuahua quay lại phiên tập trung mới nha!',
          });
        } catch {
          // Ignore
        }
      }

      setTimeout(() => switchPomoMode('focus'), 900);
    }
  }

  function startPomoTimer() {
    if (pomoState.remainingSeconds <= 0) {
      pomoState.remainingSeconds = pomoState.totalSeconds;
    }
    maybeRequestNotificationPermission();
    pomoState.running = true;
    pomoState.endAt = Date.now() + pomoState.remainingSeconds * 1000;
    renderPomoUI();

    pomoState.timerId = setInterval(() => {
      const leftMs = pomoState.endAt - Date.now();
      if (leftMs <= 0) {
        completePomoSession();
      } else {
        pomoState.remainingSeconds = Math.ceil(leftMs / 1000);
        renderPomoUI();
      }
    }, 250);
  }

  function togglePomoTimer() {
    if (pomoState.running) {
      const leftMs = Math.max(0, pomoState.endAt - Date.now());
      stopPomoInterval();
      pomoState.remainingSeconds = Math.ceil(leftMs / 1000);
      playCuteSound('click');
      renderPomoUI();
      chiSay('Đã tạm dừng đồng hồ cà chua! Lúc nào sẵn sàng mình bấm chạy tiếp nha~ 🍅', 3400);
    } else {
      playCuteSound('pin');
      startPomoTimer();
      setChiMood('excited', 1600);
      spawnChiParticles(['🍅', '✨', '🐾'], 4);
      chiSay(
        pomoState.mode === 'focus'
          ? `Bắt đầu ${Math.round(pomoState.totalSeconds / 60)} phút tập trung! Sếp Chi ngồi canh giờ cùng bạn nha 🍅💪`
          : 'Bắt đầu giờ nghỉ thư giãn! Uống ngụm nước và thả lỏng mắt nhé~ ☕🌿',
        4200
      );
    }
  }

  propPomodoro.addEventListener('click', (e) => {
    e.stopPropagation();
    playCuteSound('click');
    pomoPopover.hidden = !pomoPopover.hidden;
  });

  btnClosePomo.addEventListener('click', () => {
    playCuteSound('click');
    pomoPopover.hidden = true;
  });

  document.addEventListener('click', (e) => {
    if (!pomoPopover.hidden && !pomoWrap.contains(e.target)) {
      pomoPopover.hidden = true;
    }
  });

  pomoModeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playCuteSound('click');
      switchPomoMode(btn.dataset.mode, Number(btn.dataset.mins));
    });
  });

  btnPomoMinus.addEventListener('click', () => {
    playCuteSound('click');
    const cur = Number(pomoMinsInput.value) || 25;
    setPomoDurationMinutes(cur <= 5 ? Math.max(1, cur - 1) : cur - 5);
  });

  btnPomoPlus.addEventListener('click', () => {
    playCuteSound('click');
    const cur = Number(pomoMinsInput.value) || 25;
    setPomoDurationMinutes(cur < 5 ? cur + 1 : cur + 5);
  });

  pomoMinsInput.addEventListener('change', () => {
    setPomoDurationMinutes(pomoMinsInput.value);
  });

  btnPomoToggle.addEventListener('click', togglePomoTimer);

  btnPomoReset.addEventListener('click', () => {
    playCuteSound('click');
    setPomoDurationMinutes(pomoMinsInput.value);
  });

  /* ========================================================================
     Laptop Music Player: Offline Lo-fi + Rain + Fire, YouTube/Spotify & MP3
     ======================================================================== */
  let musicCtx = null;
  const ambientNodes = {
    lofi: { active: false, gain: null, interval: null },
    rain: { active: false, gain: null, source: null },
    fire: { active: false, gain: null, source: null, crackleTimer: null },
  };
  let isEmbedPlaying = false;
  let localTracks = [];
  let currentTrackIdx = -1;

  function ensureMusicCtx() {
    if (!musicCtx) {
      musicCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (musicCtx.state === 'suspended') {
      musicCtx.resume();
    }
    return musicCtx;
  }

  function updateMusicPlayingVisuals() {
    const anyAmbient = ambientNodes.lofi.active || ambientNodes.rain.active || ambientNodes.fire.active;
    const anyLocal = !localAudioPlayer.paused && localAudioPlayer.currentSrc;
    const playing = Boolean(anyAmbient || isEmbedPlaying || anyLocal);

    propLaptop.classList.toggle('is-playing', playing);
    chihuahuaEl.classList.toggle('is-grooving', playing);
  }

  /* --- Warm Offline Lo-fi Electric Piano Loop (Maj7 chill progression) --- */
  function startLofiSynth() {
    const ctx = ensureMusicCtx();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime((Number(volLofi.value) / 100) * 0.22, ctx.currentTime);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(1150, ctx.currentTime);
    masterGain.connect(lowpass).connect(ctx.destination);

    // Cozy Lo-fi chord progression: Fmaj7 -> Em7 -> Dm7 -> Cmaj7
    const chords = [
      [174.61, 220.0, 261.63, 329.63],
      [164.81, 196.0, 246.94, 293.66],
      [146.83, 174.61, 220.0, 261.63],
      [130.81, 164.81, 196.0, 246.94],
    ];
    let step = 0;

    const playChord = () => {
      if (!ambientNodes.lofi.active) return;
      const now = ctx.currentTime;
      const notesInChord = chords[step % chords.length];
      step += 1;

      notesInChord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = idx === 0 ? 'triangle' : 'sine';
        // Subtle warm tape detune
        osc.frequency.setValueAtTime(freq + (Math.random() * 1.2 - 0.6), now + idx * 0.045);

        noteGain.gain.setValueAtTime(0.001, now + idx * 0.045);
        noteGain.gain.linearRampToValueAtTime(idx === 0 ? 0.28 : 0.18, now + idx * 0.045 + 0.12);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.35);

        osc.connect(noteGain).connect(masterGain);
        osc.start(now + idx * 0.045);
        osc.stop(now + 2.45);
      });
    };

    ambientNodes.lofi.active = true;
    ambientNodes.lofi.gain = masterGain;
    playChord();
    ambientNodes.lofi.interval = setInterval(playChord, 2400);
    btnAmbLofi.classList.add('active');
    updateMusicPlayingVisuals();
  }

  function stopLofiSynth() {
    ambientNodes.lofi.active = false;
    if (ambientNodes.lofi.interval) {
      clearInterval(ambientNodes.lofi.interval);
      ambientNodes.lofi.interval = null;
    }
    if (ambientNodes.lofi.gain) {
      try {
        ambientNodes.lofi.gain.disconnect();
      } catch {
        // Ignore
      }
      ambientNodes.lofi.gain = null;
    }
    btnAmbLofi.classList.remove('active');
    updateMusicPlayingVisuals();
  }

  /* --- Soft Rain Noise Generator (Pink Noise through Bandpass) --- */
  function createPinkNoiseBuffer(ctx, seconds = 4) {
    const len = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const out = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      out[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  function startRainNoise() {
    const ctx = ensureMusicCtx();
    const src = ctx.createBufferSource();
    src.buffer = createPinkNoiseBuffer(ctx, 4);
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1050, ctx.currentTime);
    filter.Q.setValueAtTime(0.65, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime((Number(volRain.value) / 100) * 0.45, ctx.currentTime);

    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();

    ambientNodes.rain.active = true;
    ambientNodes.rain.source = src;
    ambientNodes.rain.gain = gain;
    btnAmbRain.classList.add('active');
    updateMusicPlayingVisuals();
  }

  function stopRainNoise() {
    ambientNodes.rain.active = false;
    if (ambientNodes.rain.source) {
      try {
        ambientNodes.rain.source.stop();
        ambientNodes.rain.source.disconnect();
      } catch {
        // Ignore
      }
      ambientNodes.rain.source = null;
    }
    ambientNodes.rain.gain = null;
    btnAmbRain.classList.remove('active');
    updateMusicPlayingVisuals();
  }

  /* --- Cozy Fireplace Rumble + Soft Crackles --- */
  function startFireNoise() {
    const ctx = ensureMusicCtx();
    const src = ctx.createBufferSource();
    src.buffer = createPinkNoiseBuffer(ctx, 4);
    src.loop = true;

    const low = ctx.createBiquadFilter();
    low.type = 'lowpass';
    low.frequency.setValueAtTime(240, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime((Number(volFire.value) / 100) * 0.52, ctx.currentTime);

    src.connect(low).connect(gain).connect(ctx.destination);
    src.start();

    const crackleTimer = setInterval(() => {
      if (!ambientNodes.fire.active || Math.random() > 0.45) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const cGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900 + Math.random() * 1400, now);
      cGain.gain.setValueAtTime((Number(volFire.value) / 100) * 0.045, now);
      cGain.gain.exponentialRampToValueAtTime(0.0008, now + 0.025);
      osc.connect(cGain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    }, 380);

    ambientNodes.fire.active = true;
    ambientNodes.fire.source = src;
    ambientNodes.fire.gain = gain;
    ambientNodes.fire.crackleTimer = crackleTimer;
    btnAmbFire.classList.add('active');
    updateMusicPlayingVisuals();
  }

  function stopFireNoise() {
    ambientNodes.fire.active = false;
    if (ambientNodes.fire.crackleTimer) {
      clearInterval(ambientNodes.fire.crackleTimer);
      ambientNodes.fire.crackleTimer = null;
    }
    if (ambientNodes.fire.source) {
      try {
        ambientNodes.fire.source.stop();
        ambientNodes.fire.source.disconnect();
      } catch {
        // Ignore
      }
      ambientNodes.fire.source = null;
    }
    ambientNodes.fire.gain = null;
    btnAmbFire.classList.remove('active');
    updateMusicPlayingVisuals();
  }

  btnAmbLofi.addEventListener('click', () => {
    if (ambientNodes.lofi.active) {
      stopLofiSynth();
    } else {
      startLofiSynth();
      chiSay('Đeo tai nghe lên rồi! Nhạc Lo-fi chill quá đồng nghiệp ơi~ 🎧🎹', 3800);
    }
  });

  btnAmbRain.addEventListener('click', () => {
    if (ambientNodes.rain.active) {
      stopRainNoise();
    } else {
      startRainNoise();
      chiSay('Nghe tiếng mưa rơi tí tách tập trung hẳn luôn nè~ 🌧️🐾', 3800);
    }
  });

  btnAmbFire.addEventListener('click', () => {
    if (ambientNodes.fire.active) {
      stopFireNoise();
    } else {
      startFireNoise();
      chiSay('Ấm áp như ngồi cạnh lò sưởi mùa đông luôn á~ 🔥☕', 3800);
    }
  });

  volLofi.addEventListener('input', () => {
    if (ambientNodes.lofi.gain && musicCtx) {
      ambientNodes.lofi.gain.gain.setValueAtTime((Number(volLofi.value) / 100) * 0.22, musicCtx.currentTime);
    }
  });

  volRain.addEventListener('input', () => {
    if (ambientNodes.rain.gain && musicCtx) {
      ambientNodes.rain.gain.gain.setValueAtTime((Number(volRain.value) / 100) * 0.45, musicCtx.currentTime);
    }
  });

  volFire.addEventListener('input', () => {
    if (ambientNodes.fire.gain && musicCtx) {
      ambientNodes.fire.gain.gain.setValueAtTime((Number(volFire.value) / 100) * 0.52, musicCtx.currentTime);
    }
  });

  btnStopAmbient.addEventListener('click', () => {
    stopLofiSynth();
    stopRainNoise();
    stopFireNoise();
    playCuteSound('click');
  });

  /* --- YouTube / Spotify URL Parser & Embed Player --- */
  function parseMusicEmbedUrl(rawUrl) {
    const trimmed = String(rawUrl || '').trim();
    if (!trimmed) return null;
    try {
      const u = new URL(trimmed);
      const host = u.hostname.replace(/^www\./, '');

      // YouTube Playlist
      if ((host === 'youtube.com' || host === 'm.youtube.com') && u.pathname.startsWith('/playlist')) {
        const list = u.searchParams.get('list');
        if (list) return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(list)}&autoplay=1`;
      }

      // YouTube Video (watch?v=..., youtu.be/..., live/..., shorts/...)
      if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
        const v = u.searchParams.get('v');
        if (v) return `https://www.youtube.com/embed/${encodeURIComponent(v)}?autoplay=1`;
        const match = u.pathname.match(/^\/(embed|live|shorts)\/([^/?]+)/);
        if (match) return `https://www.youtube.com/embed/${encodeURIComponent(match[2])}?autoplay=1`;
      }
      if (host === 'youtu.be') {
        const id = u.pathname.replace(/^\//, '').split('/')[0];
        if (id) return `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1`;
      }

      // Spotify (track / playlist / album / episode)
      if (host === 'open.spotify.com') {
        const match = u.pathname.match(/\/(track|playlist|album|episode)\/([a-zA-Z0-9]+)/);
        if (match) {
          return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator`;
        }
      }
    } catch {
      return null;
    }
    return null;
  }

  function loadMusicEmbed(rawUrl) {
    const embedSrc = parseMusicEmbedUrl(rawUrl);
    if (!embedSrc) {
      chiSay('Link này chưa đúng định dạng YouTube hoặc Spotify rồi! Bạn thử dán lại link đầy đủ nha 🎵', 4200);
      return;
    }

    embedUrlInput.value = rawUrl;
    try {
      localStorage.setItem(MUSIC_KEY, JSON.stringify({ lastEmbedUrl: rawUrl }));
    } catch {
      // Ignore
    }

    embedStage.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = embedSrc;
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    embedStage.appendChild(iframe);

    isEmbedPlaying = true;
    btnStopEmbed.hidden = false;
    updateMusicPlayingVisuals();
    setChiMood('happy', 1800);
    spawnChiParticles(['🎧', '🎶', '✨'], 5);
    chiSay('Lên nhạc rồi!! Sếp Chi đeo tai nghe quẩy nhẹ cùng bạn đây 🎧🐶🎶', 4200);
  }

  function stopMusicEmbed() {
    isEmbedPlaying = false;
    btnStopEmbed.hidden = true;
    embedStage.innerHTML = '';
    embedStage.appendChild(embedPlaceholder);
    updateMusicPlayingVisuals();
  }

  embedForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loadMusicEmbed(embedUrlInput.value);
  });

  embedPresetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playCuteSound('click');
      loadMusicEmbed(btn.dataset.url);
    });
  });

  btnStopEmbed.addEventListener('click', () => {
    playCuteSound('click');
    stopMusicEmbed();
  });

  /* --- Local MP3 Playlist Player --- */
  function renderMp3Playlist() {
    mp3PlaylistEl.innerHTML = '';
    if (localTracks.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'mp3-empty';
      empty.textContent = 'Chưa có bài hát nào. Chọn file nhạc từ máy để tạo playlist riêng nhé~ 🎵';
      mp3PlaylistEl.appendChild(empty);
      return;
    }

    localTracks.forEach((track, idx) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `mp3-track-btn${idx === currentTrackIdx ? ' active' : ''}`;
      btn.textContent = `${idx === currentTrackIdx ? '▶ ' : '🎵 '}${track.name}`;
      btn.addEventListener('click', () => playLocalTrack(idx));
      li.appendChild(btn);
      mp3PlaylistEl.appendChild(li);
    });
  }

  function playLocalTrack(idx) {
    if (idx < 0 || idx >= localTracks.length) return;
    currentTrackIdx = idx;
    localAudioPlayer.src = localTracks[idx].url;
    localAudioPlayer.play().catch(() => {});
    renderMp3Playlist();
    updateMusicPlayingVisuals();
    chiSay(`Đang phát "${localTracks[idx].name}" 🎧🐾`, 3600);
  }

  mp3FileInput.addEventListener('change', () => {
    const files = Array.from(mp3FileInput.files || []);
    if (files.length === 0) return;
    files.forEach((file) => {
      localTracks.push({
        name: file.name.replace(/\.[^.]+$/, ''),
        url: URL.createObjectURL(file),
      });
    });
    renderMp3Playlist();
    if (currentTrackIdx === -1) {
      playLocalTrack(0);
    }
    mp3FileInput.value = '';
  });

  localAudioPlayer.addEventListener('play', updateMusicPlayingVisuals);
  localAudioPlayer.addEventListener('pause', updateMusicPlayingVisuals);
  localAudioPlayer.addEventListener('ended', () => {
    if (localTracks.length > 0) {
      playLocalTrack((currentTrackIdx + 1) % localTracks.length);
    } else {
      updateMusicPlayingVisuals();
    }
  });

  /* --- Music Popover Open/Close & Tab Switching --- */
  propLaptop.addEventListener('click', (e) => {
    e.stopPropagation();
    playCuteSound('click');
    musicPopover.classList.toggle('is-closed');
    if (!musicPopover.classList.contains('is-closed')) {
      pomoPopover.hidden = true;
    }
  });

  btnCloseMusic.addEventListener('click', () => {
    playCuteSound('click');
    musicPopover.classList.add('is-closed');
  });

  document.addEventListener('click', (e) => {
    if (!musicPopover.classList.contains('is-closed') && !laptopWrap.contains(e.target)) {
      musicPopover.classList.add('is-closed');
    }
  });

  musicTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.mtab;
      musicTabs.forEach((t) => {
        const isAct = t === tab;
        t.classList.toggle('active', isAct);
        t.setAttribute('aria-selected', String(isAct));
      });
      musicPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.mpanel === target);
      });
      playCuteSound('click');
    });
  });

  // Restore last pasted YouTube/Spotify link in the input box for convenience
  try {
    const savedMusic = JSON.parse(localStorage.getItem(MUSIC_KEY) || '{}');
    if (savedMusic.lastEmbedUrl) {
      embedUrlInput.value = savedMusic.lastEmbedUrl;
    }
  } catch {
    // Ignore
  }

  // Click mini desk clock to ask Chihuahua about the next reminder today
  propDeskClock.addEventListener('click', () => {
    playCuteSound('click');
    const next = getNextUpcomingNote();
    if (next && next.remindTime) {
      setChiMood('excited', 1500);
      spawnChiParticles(['⏰', '🐾'], 3);
      chiSay(`Lịch nhắc tiếp theo là lúc ${next.remindTime}: "${getNoteSummaryText(next)}" ⏰`, 4600);
    } else {
      chiSay('Hôm nay chưa có lịch hẹn giờ nào! Nhấn ⏰ trên tờ note để đặt giờ nhắc nhé~ 🐾', 4200);
    }
  });

  // Alarm Toast Actions (Done / Snooze +5m / Dismiss)
  btnAlarmDone.addEventListener('click', () => {
    const id = activeAlarmNoteId;
    clearActiveAlarm();
    if (id) toggleNoteDone(id);
  });

  btnAlarmSnooze.addEventListener('click', () => {
    const note = notes.find((n) => n.id === activeAlarmNoteId);
    if (note) {
      const nextTime = formatMinutesToTime(getNowMinutes() + 5);
      note.remindTime = nextTime;
      note.remindedDate = '';
      saveNotes();
      clearActiveAlarm();
      updateClockNextAlarm();
      playCuteSound('pin');
      chiSay(`Okie~ Sếp Chi sẽ nhắc lại lúc ${nextTime} (+5 phút nữa) nha! 💤🐾`, 4000);
    } else {
      clearActiveAlarm();
    }
  });

  btnAlarmDismiss.addEventListener('click', () => {
    playCuteSound('click');
    clearActiveAlarm();
    chiSay('Đã tắt chuông nhắc rồi nhé! Cố lên hoàn thành việc nào 💪🐾', 3400);
  });

  function hasStackedNotes() {
    for (let i = 0; i < notes.length; i++) {
      for (let j = i + 1; j < notes.length; j++) {
        if (Math.abs(notes[i].x - notes[j].x) < 45 && Math.abs(notes[i].y - notes[j].y) < 45) {
          return true;
        }
      }
    }
    return false;
  }

  // Handle window resize smartly without crushing desktop coordinates when testing mobile view!
  let wasMobileViewport = window.innerWidth <= 720;
  let resizeTidyTimer = null;
  window.addEventListener('resize', () => {
    const isMobileViewport = window.innerWidth <= 720;
    if (isMobileViewport) {
      wasMobileViewport = true;
      return;
    }

    clearTimeout(resizeTidyTimer);
    resizeTidyTimer = setTimeout(() => {
      if (wasMobileViewport || hasStackedNotes()) {
        wasMobileViewport = false;
        tidyNotes(false);
        return;
      }

      const availW = boardScroll.clientWidth || 960;
      const overflowed = notes.some((n) => n.x + 220 > availW - 10);
      if (overflowed) {
        tidyNotes(false);
      } else {
        updateBoardCanvasHeight();
      }
    }, 120);
  });

  /* ========================================================================
     Initialize App
     ======================================================================== */
  loadState();
  loadPomoStats();
  renderPomoUI();
  renderNotes();
  if (window.innerWidth > 720 && hasStackedNotes()) {
    requestAnimationFrame(() => tidyNotes(false));
  }
  updateDeskClock();
  checkDailyReminders();
  setInterval(updateDeskClock, 15000);
  setInterval(checkDailyReminders, 5000);

  // Warm greeting on arrival
  setTimeout(() => {
    chiSay('Gâu gâu! Chào mừng đến bàn làm việc của Sếp Chi! Nhấn đúp lên bảng để dán note nha 📌🐾', 5500);
  }, 500);
})();
