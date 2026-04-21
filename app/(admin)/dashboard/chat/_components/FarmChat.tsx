'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  HubConnectionBuilder,
  HubConnection,
  HttpTransportType,
  LogLevel,
} from '@microsoft/signalr';
import { getAccessToken } from '@/lib/actions/authActions';
import { fetchChatHistory } from '@/lib/actions/chatActions';
import { MdSend, MdLogout, MdWifiOff } from 'react-icons/md';

// ── Types ────────────────────────────────────────────────────
interface ChatMessage {
  senderId: string;
  senderName: string;
  content: string;
  createdAt?: number;
}

interface OnlineUser {
  userId: string;
  userName: string;
}

interface TypingEvent {
  userId: string;
  userName: string;
}

interface MentionNotif {
  senderName: string;
  contentSnippet: string;
}

type ConnState = 'disconnected' | 'connecting' | 'connected' | 'error';

interface SystemMsg {
  type: 'system';
  text: string;
  id: string;
}

interface UserMsg {
  type: 'message';
  msg: ChatMessage;
  id: string;
}

type ChatEntry = SystemMsg | UserMsg;

// ── Avatar Colors ────────────────────────────────────────────
const AV_COLORS = [
  { bg: '#C0DD97', color: '#3B6D11' },
  { bg: '#B5D4F4', color: '#185FA5' },
  { bg: '#F5C4B3', color: '#993C1D' },
  { bg: '#9FE1CB', color: '#0F6E56' },
  { bg: '#FAC775', color: '#854F0B' },
  { bg: '#F4C0D1', color: '#993556' },
  { bg: '#CECBF6', color: '#534AB7' },
];

// ── Utils ────────────────────────────────────────────────────
function hashStr(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++)
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h;
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const avatarCache: Record<string, { bg: string; color: string; init: string }> =
  {};

function getAvatar(userId: string, name: string) {
  if (!avatarCache[userId]) {
    const idx = Math.abs(hashStr(userId)) % AV_COLORS.length;
    avatarCache[userId] = {
      ...AV_COLORS[idx],
      init: initials(name || userId),
    };
  }
  return avatarCache[userId];
}

function fmtTime(unixSec?: number): string {
  const d = unixSec ? new Date(unixSec * 1000) : new Date();
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function parseJwtClaims(token: string): Record<string, string> | null {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

let entryIdCounter = 0;
function nextId() {
  return `entry-${++entryIdCounter}`;
}

// ── Hub URL ──────────────────────────────────────────────────
const HUB_URL = `${process.env.NEXT_PUBLIC_HUB_URL}`;

// ═══════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════
export default function FarmChat() {
  // ── State ────────────────────────────────────────────────────
  const [connState, setConnState] = useState<ConnState>('disconnected');
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [myUserId, setMyUserId] = useState<string | null>(null);
  const [myUserName, setMyUserName] = useState<string | null>(null);

  const connectionRef = useRef<HubConnection | null>(null);
  const connectingRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Helpers ──────────────────────────────────────────────────
  const scrollBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  const addSystem = useCallback(
    (text: string) => {
      setEntries((prev) => [...prev, { type: 'system', text, id: nextId() }]);
      scrollBottom();
    },
    [scrollBottom],
  );

  const addMessage = useCallback(
    (msg: ChatMessage) => {
      setEntries((prev) => [
        ...prev,
        { type: 'message', msg, id: nextId() },
      ]);
      scrollBottom();
    },
    [scrollBottom],
  );

  const showToast = useCallback((msg: string, duration = 4000) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), duration);
  }, []);

  const isMentioned = useCallback(
    (content: string): boolean => {
      if (!myUserName) return false;
      const re = new RegExp(
        '@' + myUserName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'i',
      );
      return re.test(content);
    },
    [myUserName],
  );

  // ── Connect ──────────────────────────────────────────────────
  const connect = useCallback(async () => {
    if (connectionRef.current || connectingRef.current) return;
    connectingRef.current = true;

    setConnState('connecting');

    const token = await getAccessToken();
    if (!token) {
      showToast('No authentication token found. Please log in.');
      setConnState('error');
      return;
    }

    const claims = parseJwtClaims(token);
    if (!claims) {
      showToast('Invalid JWT token format');
      setConnState('error');
      return;
    }

    const userId =
      claims['sub'] ||
      claims['nameid'] ||
      claims[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ] ||
      'unknown';
    const userName =
      claims['name'] ||
      claims['unique_name'] ||
      claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
      'You';

    setMyUserId(userId);
    setMyUserName(userName);

    const conn = new HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: () => token,
        transport: HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect([0, 1000, 3000, 5000, 10000])
      .configureLogging(LogLevel.Warning)
      .build();

    // ── Event Handlers ────────────────────────────────────────
    conn.on('ReceiveMessage', (msg: ChatMessage) => {
      addMessage(msg);
    });

    conn.on('UserJoined', (info: { userName: string }) => {
      addSystem(`${info.userName} joined the chat`);
    });

    conn.on('UserLeft', (info: { userName: string }) => {
      addSystem(`${info.userName} left the chat`);
    });

    conn.on('OnlineUsersUpdated', (users: OnlineUser[]) => {
      setOnlineUsers(users);
    });

    conn.on('UserTyping', (evt: TypingEvent) => {
      if (evt.userId !== userId) {
        setTypingUser(evt.userName);
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
        typingTimerRef.current = setTimeout(() => setTypingUser(null), 3000);
      }
    });

    conn.on('MentionReceived', (notif: MentionNotif) => {
      showToast(`@${notif.senderName} mentioned you: "${notif.contentSnippet}"`);
    });

    conn.onreconnecting(() => {
      setConnState('connecting');
    });

    conn.onreconnected(() => {
      setConnState('connected');
      addSystem('Reconnected');
    });

    conn.onclose(() => {
      setConnState('disconnected');
      connectionRef.current = null;
    });

    // ── Start Connection ──────────────────────────────────────
    try {
      await conn.start();
      connectionRef.current = conn;

      // Load chat history via server action
      try {
        const messages = await fetchChatHistory();
        if (Array.isArray(messages) && messages.length) {
          messages.forEach((msg) => addMessage(msg));
          addSystem(`— ${messages.length} previous messages —`);
        }
      } catch {
        /* history is optional */
      }

      setConnState('connected');
      addSystem('You joined the chat');
      inputRef.current?.focus();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      showToast('Connection failed: ' + message);
      setConnState('error');
      connectingRef.current = false;
    }
  }, [addMessage, addSystem, showToast]);

  // ── Disconnect ───────────────────────────────────────────────
  const disconnect = useCallback(async () => {
    if (connectionRef.current) {
      await connectionRef.current.stop();
      connectionRef.current = null;
    }
    setConnState('disconnected');
    setEntries([]);
    setOnlineUsers([]);
    setMyUserId(null);
    setMyUserName(null);
  }, []);

  // ── Send Message ─────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !connectionRef.current) return;

    setInputText('');

    try {
      await connectionRef.current.invoke('SendMessage', text);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      showToast('Failed to send: ' + message);
    }
  }, [inputText, showToast]);

  // ── Typing Indicator ────────────────────────────────────────
  const onTyping = useCallback(() => {
    if (!connectionRef.current) return;
    if (typingDebounceRef.current) clearTimeout(typingDebounceRef.current);
    typingDebounceRef.current = setTimeout(() => {
      connectionRef.current?.invoke('Typing').catch(() => { });
    }, 300);
  }, []);

  // ── Auto-connect on mount ────────────────────────────────────
  useEffect(() => {
    connect();
    return () => {
      connectingRef.current = false;
      connectionRef.current?.stop();
      connectionRef.current = null;
    };
  }, []);

  // ── Render Helpers ───────────────────────────────────────────
  function parseMentions(text: string) {
    const escaped = escapeHtml(text);
    return escaped.replace(
      /@([a-zA-Z0-9_]+)/g,
      (_, handle) =>
        `<span class="text-emerald-400 font-semibold">@${handle}</span>`,
    );
  }

  // ── Connection status config ────────────────────────────────
  const connConfig: Record<
    ConnState,
    { label: string; dotClass: string; bgClass: string }
  > = {
    disconnected: {
      label: 'Disconnected',
      dotClass: 'bg-gray-400',
      bgClass: 'bg-gray-100 text-gray-500 border-gray-200',
    },
    connecting: {
      label: 'Connecting',
      dotClass: 'bg-amber-400',
      bgClass: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    connected: {
      label: 'Connected',
      dotClass: 'bg-emerald-500',
      bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    error: {
      label: 'Error',
      dotClass: 'bg-red-500',
      bgClass: 'bg-red-50 text-red-600 border-red-200',
    },
  };

  const isConnected = connState === 'connected';
  const cfg = connConfig[connState];

  // ═══════════════════════════════════════════════════════════════
  // JSX
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* ── Top Bar ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 sm:px-5 h-14 bg-[#023b26] border-b border-emerald-900/30 shrink-0">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
            FC
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white truncate">Farm Chat</h2>
            <p className="text-[10px] text-emerald-400/70">
              {isConnected
                ? `${onlineUsers.length} online`
                : cfg.label.toLowerCase() + '...'}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border ${cfg.bgClass}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass} transition-colors`}
            />
            {cfg.label}
          </div>
          {isConnected && (
            <button
              onClick={disconnect}
              className="text-[11px] px-2.5 py-1 rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
              title="Disconnect"
            >
              <MdLogout size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">
        {/* ── Online Sidebar ───────────────────────────────── */}
        <div className="w-48 shrink-0 bg-gray-50 border-r border-gray-100 flex-col hidden lg:flex">
          <div className="px-3.5 pt-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
            Online — {onlineUsers.length}
          </div>
          <div className="flex-1 overflow-y-auto py-1.5 custom-scrollbar">
            {onlineUsers.length === 0 ? (
              <p className="px-3.5 py-3 text-xs text-gray-400">
                No one online
              </p>
            ) : (
              onlineUsers.map((u) => {
                const av = getAvatar(u.userId, u.userName);
                const isMe = u.userId === myUserId;
                return (
                  <div
                    key={u.userId}
                    className="flex items-center gap-2 px-3.5 py-1.5"
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: av.bg, color: av.color }}
                    >
                      {av.init}
                    </div>
                    <span className="text-xs text-gray-700 truncate flex-1">
                      {u.userName}
                    </span>
                    {isMe && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 border border-emerald-200 font-medium">
                        you
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── Chat Area ────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1 custom-scrollbar">
            {connState === 'disconnected' && entries.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
                <MdWifiOff size={40} className="opacity-30" />
                <p className="text-sm">Connecting to Farm Chat...</p>
              </div>
            )}

            {connState === 'error' && entries.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
                <MdWifiOff size={40} className="text-red-300" />
                <p className="text-sm text-red-400">Connection failed</p>
                <button
                  onClick={connect}
                  className="text-xs px-4 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {entries.map((entry) => {
              if (entry.type === 'system') {
                return (
                  <div
                    key={entry.id}
                    className="self-center text-[11px] text-gray-400 bg-gray-50 border border-gray-100 px-3.5 py-1 rounded-full my-1.5 normal-case"
                  >
                    {entry.text}
                  </div>
                );
              }

              const { msg } = entry;
              const isMe = msg.senderId === myUserId;
              const av = getAvatar(msg.senderId, msg.senderName);
              const mentioned = !isMe && isMentioned(msg.content);

              return (
                <div
                  key={entry.id}
                  className={`flex flex-col max-w-[72%] ${isMe
                    ? 'self-end items-end'
                    : 'self-start items-start'
                    }`}
                >
                  {/* Sender name */}
                  {!isMe && (
                    <div className="text-[11px] font-medium text-gray-400 mb-0.5 px-0.5 flex items-center gap-1 normal-case">
                      {msg.senderName}
                      {mentioned && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-600 border border-emerald-200">
                          mentioned you
                        </span>
                      )}
                    </div>
                  )}

                  {/* Bubble row */}
                  <div
                    className={`flex items-end gap-1.5 ${isMe ? 'flex-row-reverse' : 'flex-row'
                      }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mb-0.5"
                      style={{ background: av.bg, color: av.color }}
                    >
                      {av.init}
                    </div>
                    <div
                      className={`px-3 py-2 text-sm leading-relaxed break-words whitespace-pre-wrap normal-case ${isMe
                        ? 'bg-emerald-500 text-white rounded-[14px_14px_3px_14px]'
                        : 'bg-gray-100 text-gray-800 border border-gray-200 rounded-[14px_14px_14px_3px]'
                        }`}
                      dangerouslySetInnerHTML={{
                        __html: parseMentions(msg.content),
                      }}
                    />
                  </div>

                  {/* Meta */}
                  <div
                    className={`flex items-center gap-1 text-[10px] text-gray-400 mt-0.5 px-1 ${isMe ? 'flex-row-reverse' : ''
                      }`}
                  >
                    <span>{fmtTime(msg.createdAt)}</span>
                    {isMe && (
                      <span className="text-[11px] text-emerald-500">✓✓</span>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing indicator */}
          <div className="min-h-[22px] px-4 pb-0.5">
            {typingUser && (
              <span className="text-xs italic text-gray-400 normal-case">
                {typingUser} is typing
                <span className="inline-flex ml-0.5">
                  <span className="animate-bounce [animation-delay:0ms]">.</span>
                  <span className="animate-bounce [animation-delay:200ms]">.</span>
                  <span className="animate-bounce [animation-delay:400ms]">.</span>
                </span>
              </span>
            )}
          </div>

          {/* Input row */}
          <div className="px-3 py-2.5 border-t border-gray-100 flex gap-2 items-end bg-white">
            <textarea
              ref={inputRef}
              id="chat-msg-input"
              className="flex-1 px-3.5 py-2 border border-gray-200 rounded-2xl bg-gray-50 text-gray-800 text-sm font-[inherit] outline-none resize-none h-10 max-h-[120px] overflow-y-auto leading-relaxed transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 disabled:opacity-40 disabled:cursor-not-allowed normal-case"
              placeholder="Message farm... (try @username)"
              maxLength={2000}
              rows={1}
              disabled={!isConnected}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                onTyping();
                // Auto-resize
                e.target.style.height = 'auto';
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              id="chat-send-btn"
              onClick={sendMessage}
              disabled={!isConnected || !inputText.trim()}
              className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 transition-all hover:bg-emerald-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            >
              <MdSend size={16} className="text-white !w-4 !h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Toast ────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm z-50 whitespace-nowrap max-w-[90vw] overflow-hidden text-ellipsis transition-all duration-300 ${toast
          ? 'translate-y-0 opacity-100'
          : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
      >
        {toast}
      </div>
    </div>
  );
}
