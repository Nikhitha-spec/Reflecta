import React from 'react';
import { JournalEntry, Emotion } from './types';
import { Home, BookOpen, Mic, Users, Heart, Bell, Globe, UserCheck, CalendarHeart, MessageSquare } from 'lucide-react';

export const defaultProfilePic = 'https://images.pexels.com/photos/18059128/pexels-photo-18059128/free-photo-of-a-woman-with-colorful-hair-and-a-black-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export const NAV_LINKS = [
  { name: 'Home', path: '/home', icon: <Home /> },
  { name: 'Journal', path: '/journal', icon: <BookOpen /> },
  { name: 'Voice Notes', path: '/voice', icon: <Mic /> },
  { name: 'Connections', path: '/connect', icon: <Users /> },
  { name: 'Chat', path: '/chat', icon: <MessageSquare /> },
  { name: 'Requests', path: '/requests', icon: <Bell /> },
  { name: 'Wellness Hub', path: '/wellness', icon: <Heart /> },
];

export const EMOTION_OPTIONS: Emotion[] = [
  Emotion.Happy,
  Emotion.Sad,
  Emotion.Anxious,
  Emotion.Stressed,
  Emotion.Grateful,
  Emotion.Lonely,
  Emotion.Overwhelmed,
];

export const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    author: 'AquaSoul7',
    content: "Felt a wave of gratitude today. The sun was shining and I had a really nice conversation with a stranger. It's the small things that make a big difference.",
    emotion: Emotion.Grateful,
    timestamp: '2 hours ago',
    reactions: 12,
  },
  {
    id: '2',
    author: 'StarGazer',
    content: "Work has been so stressful lately. I feel like I'm drowning in deadlines and expectations. Trying to remember to breathe and take it one step at a time.",
    emotion: Emotion.Stressed,
    timestamp: '8 hours ago',
    reactions: 25,
  },
  {
    id: '3',
    author: 'Wanderer',
    content: "Feeling a bit lonely tonight. Scrolling through social media and seeing everyone out with friends. Sometimes it's hard to feel like you belong.",
    emotion: Emotion.Lonely,
    timestamp: '1 day ago',
    reactions: 42,
  },
];

export const POTENTIAL_CONNECTIONS = [
    { 
        id: 'user1', 
        name: 'AquaSoul7', 
        emotion: Emotion.Grateful, 
        snippet: "Finding joy in the little moments. Let's share some positivity.",
        profilePic: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    { 
        id: 'user2', 
        name: 'StarGazer', 
        emotion: Emotion.Anxious, 
        snippet: "My mind races a lot, especially at night. Looking for someone who gets it.",
        profilePic: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    { 
        id: 'user3', 
        name: 'Wanderer', 
        emotion: Emotion.Lonely, 
        snippet: "Sometimes the world feels big and I feel small. Just want to find a real connection.",
        profilePic: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    { 
        id: 'user4', 
        name: 'RockClimber', 
        emotion: Emotion.Stressed, 
        snippet: "Feeling overwhelmed with work and life. Need to vent to someone who won't judge.",
        profilePic: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    { 
        id: 'user5', 
        name: 'BookwormBree', 
        emotion: Emotion.Happy, 
        snippet: "Just finished a great book and feeling inspired! Happy to chat about anything and everything.",
        profilePic: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 'user6',
        name: 'OceanEyes',
        emotion: Emotion.Sad,
        snippet: "Going through a tough time and could really use a friend to talk to. Feeling pretty down.",
        profilePic: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
];

export const WELLNESS_AFFIRMATIONS = [
    "I am worthy of love and respect.",
    "I am capable of achieving my goals.",
    "I choose to be happy and to love myself today.",
    "I am resilient and can handle whatever comes my way.",
    "My feelings are valid, and I allow myself to feel them.",
    "I am in control of my thoughts and my life.",
    "I release all tension and embrace tranquility.",
    "Every day is a new opportunity to grow.",
    "I am proud of the person I am becoming.",
    "I am enough, just as I am."
];

export const HELPLINES = [
    { name: 'National Suicide Prevention Lifeline', number: '988', website: 'https://988lifeline.org/' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', website: 'https://www.crisistextline.org/' },
    { name: 'The Trevor Project', number: '1-866-488-7386', website: 'https://www.thetrevorproject.org/' },
];

export const MENTAL_HEALTH_CAMPAIGNS = [
    {
        name: 'World Mental Health Day',
        description: 'An international day for global mental health education, awareness and advocacy against social stigma, held on October 10th.',
        link: 'https://www.who.int/campaigns/world-mental-health-day',
        icon: <Globe size={32} className="text-primary" />
    },
    {
        name: 'Movember',
        description: 'An annual event involving the growing of moustaches during the month of November to raise awareness of men\'s health issues, such as mental health.',
        link: 'https://us.movember.com/',
        icon: <UserCheck size={32} className="text-accent" />
    },
    {
        name: 'Mental Health Awareness Month',
        description: 'Observed in May in the United States, this month is dedicated to raising awareness and reducing the stigma of mental illness.',
        link: 'https://www.nami.org/get-involved/awareness-events/mental-health-awareness-month',
        icon: <CalendarHeart size={32} className="text-primary" />
    }
];