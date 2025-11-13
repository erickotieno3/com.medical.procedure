import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { PROCEDURES } from '../data/proceduresData';

type Message = { id: string; text: string; sender: 'user' | 'bot' };

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I can help you find procedures, equipment, or protocols. Try asking about specific procedures or specialties!', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    
    setTimeout(() => {
      const response = generateResponse(input);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
    
    setInput('');
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Auto-update and blog queries
    if (lowerQuery.includes('update') || lowerQuery.includes('new') || lowerQuery.includes('latest')) {
      return `Our system auto-updates every hour from 7 major hospitals (Johns Hopkins, NHS UK, Mayo Clinic, etc.). Check the Updates section for the latest procedures and guidelines!`;
    }
    
    if (lowerQuery.includes('blog') || lowerQuery.includes('article')) {
      return `We auto-generate blog posts daily using AI! Visit the Auto Blog section to read the latest articles about medical procedures, best practices, and updates from global sources.`;
    }
    
    if (lowerQuery.includes('admin') || lowerQuery.includes('autopilot')) {
      return `The Admin Panel lets you control autopilot features: auto-updates from hospitals, auto-blog generation, and update intervals. You can sync data manually or set automatic schedules.`;
    }
    
    if (lowerQuery.includes('how many') || lowerQuery.includes('total')) {
      return `We have ${PROCEDURES.length} procedures across 8 specialties: General Surgery, Dermatology, Orthopedics, ENT, Ophthalmology, Cardiology, Gastroenterology, and Urology.`;
    }
    
    const matchedProcs = PROCEDURES.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.specialty.toLowerCase().includes(lowerQuery)
    );
    
    if (matchedProcs.length > 0) {
      const proc = matchedProcs[0];
      return `I found "${proc.name}" in ${proc.specialty}. Duration: ${proc.duration}, Complexity: ${proc.complexity}, Anesthesia: ${proc.anesthesia}. Would you like more details?`;
    }
    
    if (lowerQuery.includes('equipment') || lowerQuery.includes('tools')) {
      return 'Standard equipment typically includes: sterile gloves, surgical drapes, appropriate instruments, antiseptic solution, and gauze. Specific procedures may require additional specialized equipment.';
    }
    
    return `I can help you with: procedure details, auto-updates, blog posts, admin settings, equipment lists, and more. Try asking "What's new?" or "Tell me about updates"!`;
  };


  return (
    <View style={styles.container}>
      <ScrollView style={styles.messages}>
        {messages.map(msg => (
          <View key={msg.id} style={[styles.message, msg.sender === 'user' ? styles.userMsg : styles.botMsg]}>
            <Text style={[styles.msgText, msg.sender === 'user' && styles.userMsgText]}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Ask about procedures..." onSubmitEditing={sendMessage} />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  messages: { flex: 1, padding: 16 },
  message: { padding: 12, borderRadius: 12, marginBottom: 8, maxWidth: '80%' },
  userMsg: { alignSelf: 'flex-end', backgroundColor: '#0A4D8C' },
  botMsg: { alignSelf: 'flex-start', backgroundColor: '#E8F1F8' },
  msgText: { fontSize: 14, color: '#333' },
  userMsgText: { color: '#FFF' },
  inputContainer: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderColor: '#E0E0E0', backgroundColor: '#FFF' },
  input: { flex: 1, borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 10, marginRight: 8, backgroundColor: '#F8FAFB' },
  sendBtn: { backgroundColor: '#0A4D8C', padding: 12, borderRadius: 8, justifyContent: 'center' },
  sendText: { color: '#FFF', fontWeight: '600' },
});
