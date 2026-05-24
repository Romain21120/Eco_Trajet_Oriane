'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Send, Lock, Phone, MoreVertical, Car, MapPin, Clock, CheckCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Contact = {
  id: number
  name: string
  avatar: string
  role: string
  lastMsg: string
  time: string
  unread: number
  online: boolean
}

type Message = {
  id: number
  contactId: number
  from: 'me' | 'other'
  text: string
  time: string
  read: boolean
}

const contacts: Contact[] = [
  { id: 1, name: 'M. Leroux', avatar: 'ML', role: 'Conducteur', lastMsg: 'Je passe à 7h45 au coin de la rue.', time: '08:12', unread: 2, online: true },
  { id: 2, name: 'Mme Dupont', avatar: 'MD', role: 'Conductrice', lastMsg: 'RDV confirmé pour demain matin.', time: 'Hier', unread: 0, online: false },
  { id: 3, name: 'M. Thomas', avatar: 'MT', role: 'Enseignant', lastMsg: 'Est-ce que vous pouvez prendre Emma ?', time: 'Hier', unread: 1, online: true },
  { id: 4, name: 'Mme Martin', avatar: 'MM', role: 'Conductrice', lastMsg: 'Parfait, à demain !', time: 'Lun', unread: 0, online: false },
]

const initialMessages: Message[] = [
  { id: 1, contactId: 1, from: 'other', text: 'Bonjour ! Je confirme le trajet pour demain matin.', time: '07:55', read: true },
  { id: 2, contactId: 1, from: 'me', text: 'Bonjour M. Leroux, parfait ! À quelle heure exactement ?', time: '08:02', read: true },
  { id: 3, contactId: 1, from: 'other', text: 'Je passe à 7h45 au coin de la rue des Roses, juste après le boulanger.', time: '08:05', read: true },
  { id: 4, contactId: 1, from: 'me', text: 'Super, Emma sera là. Merci beaucoup !', time: '08:08', read: true },
  { id: 5, contactId: 1, from: 'other', text: 'Je passe à 7h45 au coin de la rue.', time: '08:12', read: false },
  { id: 6, contactId: 2, from: 'other', text: 'Bonjour, RDV confirmé pour demain matin.', time: 'Hier', read: true },
  { id: 7, contactId: 3, from: 'other', text: 'Est-ce que vous pouvez prendre Emma pour le retour vendredi ?', time: 'Hier', read: false },
]

export default function TchatPage() {
  const [selectedContact, setSelectedContact] = useState<number>(1)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const contactMessages = messages.filter((m) => m.contactId === selectedContact)
  const contact = contacts.find((c) => c.id === selectedContact)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [contactMessages.length])

  const sendMessage = () => {
    if (!newMessage.trim()) return
    const msg: Message = {
      id: messages.length + 1,
      contactId: selectedContact,
      from: 'me',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    }
    setMessages((prev) => [...prev, msg])
    setNewMessage('')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Contacts sidebar */}
      <aside className="w-full md:w-80 flex-shrink-0 flex flex-col bg-white border-r border-border">
        {/* Header */}
        <div className="px-4 h-16 flex items-center gap-3 border-b border-border">
          <Link href="/" className="p-1.5 rounded-lg hover:bg-muted transition-colors" aria-label="Retour">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-bold text-base">Messagerie</h1>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground bg-eco-green-light/50 text-eco-green-dark rounded-full px-2 py-1 font-medium">
            <Lock className="w-3 h-3" />
            Sécurisé
          </div>
        </div>

        {/* Mention sécurité */}
        <div className="px-4 py-2 bg-eco-green-light/20 border-b border-border">
          <p className="text-xs text-eco-green-dark font-medium flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            Les échanges sont privés et sécurisés.
          </p>
        </div>

        {/* Liste contacts */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedContact(c.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3.5 border-b border-border transition-colors text-left',
                selectedContact === c.id ? 'bg-eco-green-light/20' : 'hover:bg-muted/40'
              )}
            >
              <div className="relative shrink-0">
                <div className={cn('w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white', selectedContact === c.id ? 'bg-primary' : 'bg-secondary')}>
                  {c.avatar}
                </div>
                {c.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-muted-foreground truncate">{c.lastMsg}</span>
                  {c.unread > 0 && (
                    <span className="ml-2 w-5 h-5 bg-primary text-white rounded-full text-[10px] font-bold flex items-center justify-center shrink-0">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Conversation */}
      <main className={cn('hidden md:flex flex-1 flex-col')}>
        {contact && (
          <>
            {/* Conversation header */}
            <header className="h-16 bg-white border-b border-border px-6 flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">{contact.avatar}</div>
                {contact.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-white rounded-full" />}
              </div>
              <div>
                <div className="font-bold text-sm">{contact.name}</div>
                <div className="text-xs text-muted-foreground">{contact.role} · {contact.online ? 'En ligne' : 'Hors ligne'}</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Appeler">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Plus d'options">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </header>

            {/* Trajet en cours card */}
            <div className="px-6 py-3 bg-eco-green-light/30 border-b border-eco-green/20">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-eco-green-dark font-semibold">
                  <Car className="w-4 h-4" />
                  Trajet du 24/05
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  07:45
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  Rue des Roses → Lycée Jean Moulin
                </div>
                <span className="ml-auto px-2 py-0.5 bg-primary text-white rounded-full text-xs font-medium">Confirmé</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-muted/20">
              {contactMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex', msg.from === 'me' ? 'justify-end' : 'justify-start')}
                >
                  {msg.from === 'other' && (
                    <div className="w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold mr-2 shrink-0 mt-0.5">
                      {contact.avatar}
                    </div>
                  )}
                  <div className="max-w-xs lg:max-w-md">
                    <div
                      className={cn(
                        'px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                        msg.from === 'me'
                          ? 'bg-primary text-white rounded-br-sm'
                          : 'bg-white border border-border text-foreground rounded-bl-sm'
                      )}
                    >
                      {msg.text}
                    </div>
                    <div className={cn('flex items-center gap-1 mt-1 text-[10px] text-muted-foreground', msg.from === 'me' ? 'justify-end' : 'justify-start')}>
                      {msg.time}
                      {msg.from === 'me' && <CheckCheck className={cn('w-3 h-3', msg.read ? 'text-primary' : 'text-muted-foreground')} />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Votre message…"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 rounded-xl border-border"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-primary text-white hover:bg-eco-green-dark rounded-xl px-4"
                  aria-label="Envoyer"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 text-center flex items-center justify-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                Les échanges sont privés et sécurisés — maquette pédagogique
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
