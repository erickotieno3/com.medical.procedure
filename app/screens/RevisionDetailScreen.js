import React, { useState } from 'react';
import { View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { useRevision } from '../../context/RevisionContext';
import { getProcedureById } from '../../data/procedures';
export default function RevisionDetailScreen({ route, navigation }) {
  const { procedureId } = route.params;
  const proc = getProcedureById(procedureId);
  const { progress, markStepComplete, markProcedureRevised, toggleBookmark, bookmarks } = useRevision();
  const [tab, setTab] = useState('steps');
  const [showMnem, setShowMnem] = useState(false);
  if (!proc) return null;
  const pp = progress[procedureId] || {};
  const done = pp.completedSteps || [];
  const isB = bookmarks.includes(procedureId);
  const allDone = done.length === proc.steps.length;
  const score = Math.round((done.length / proc.steps.length) * 100);
  const handleFinish = () => { markProcedureRevised(procedureId, score); navigation.navigate('RevisionResult', { procedureId, score }); };
  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={s.back}>Back</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>toggleBookmark(procedureId)}><Text style={s.bm}>{isB?'★':'☆'}</Text></TouchableOpacity>
      </View>
      <View style={s.titleBlock}>
        <Text style={s.cat}>{proc.category}</Text>
        <Text style={s.title}>{proc.title}</Text>
        <Text style={s.prog}>{done.length}/{proc.steps.length} steps completed</Text>
      </View>
      <View style={s.tabs}>
        {['steps','key points','mnemonic'].map(t=>(<TouchableOpacity key={t} style={[s.tab,tab===t&&s.tabActive]} onPress={()=>setTab(t)}><Text style={[s.tabTxt,tab===t&&s.tabTxtActive]}>{t.charAt(0).toUpperCase()+t.slice(1)}</Text></TouchableOpacity>))}
      </View>
      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        {tab==='steps' && proc.steps.map((step,i)=>{ const d=done.includes(i); return (<TouchableOpacity key={i} style={[s.stepCard,d&&s.stepDone]} onPress={()=>markStepComplete(procedureId,i)}><View style={[s.num,d&&s.numDone]}><Text style={s.numTxt}>{d?'✓':i+1}</Text></View><Text style={[s.stepTxt,d&&s.stepTxtDone]}>{step}</Text></TouchableOpacity>); })}
        {tab==='key points' && proc.keyPoints.map((pt,i)=>(<View key={i} style={s.keyCard}><View style={s.dot}/><Text style={s.keyTxt}>{pt}</Text></View>))}
        {tab==='mnemonic' && (<TouchableOpacity style={s.mnemCard} onPress={()=>setShowMnem(!showMnem)}><Text style={s.mnemLabel}>{showMnem?'Tap to hide':'Tap to reveal mnemonic'}</Text>{showMnem&&<Text style={s.mnemTxt}>{proc.mnemonics}</Text>}</TouchableOpacity>)}
        <View style={{height:100}}/>
      </ScrollView>
      {tab==='steps'&&(<View style={s.footer}><TouchableOpacity style={[s.finBtn,!allDone&&s.finBtnDis]} onPress={handleFinish} disabled={!allDone}><Text style={s.finTxt}>{allDone?'Complete Revision':'Complete all '+proc.steps.length+' steps first'}</Text></TouchableOpacity></View>)}
    </View>
  );
}
const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#f5f6fa'},
  header:{flexDirection:'row',justifyContent:'space-between',padding:16,paddingTop:50,backgroundColor:'#2c3e50'},
  back:{color:'#fff',fontSize:16},
  bm:{fontSize:24,color:'#f39c12'},
  titleBlock:{backgroundColor:'#2c3e50',paddingHorizontal:16,paddingBottom:20},
  cat:{fontSize:12,color:'#3498db',fontWeight:'600',textTransform:'uppercase'},
  title:{fontSize:20,fontWeight:'700',color:'#fff',marginVertical:4},
  prog:{fontSize:13,color:'#bdc3c7'},
  tabs:{flexDirection:'row',backgroundColor:'#fff',elevation:2},
  tab:{flex:1,paddingVertical:14,alignItems:'center'},
  tabActive:{borderBottomWidth:2,borderBottomColor:'#3498db'},
  tabTxt:{fontSize:14,color:'#95a5a6'},
  tabTxtActive:{color:'#3498db',fontWeight:'600'},
  content:{flex:1,padding:12},
  stepCard:{flexDirection:'row',backgroundColor:'#fff',borderRadius:10,padding:14,marginBottom:8,alignItems:'flex-start',elevation:1},
  stepDone:{backgroundColor:'#eafaf1',borderLeftWidth:3,borderLeftColor:'#27ae60'},
  num:{width:28,height:28,borderRadius:14,backgroundColor:'#ecf0f1',alignItems:'center',justifyContent:'center',marginRight:12},
  numDone:{backgroundColor:'#27ae60'},
  numTxt:{fontSize:13,fontWeight:'700',color:'#2c3e50'},
  stepTxt:{flex:1,fontSize:14,color:'#2c3e50',lineHeight:20},
  stepTxtDone:{color:'#7f8c8d',textDecorationLine:'line-through'},
  keyCard:{flexDirection:'row',backgroundColor:'#fff',borderRadius:10,padding:14,marginBottom:8,alignItems:'flex-start',elevation:1},
  dot:{width:8,height:8,borderRadius:4,backgroundColor:'#e74c3c',marginRight:12,marginTop:6},
  keyTxt:{flex:1,fontSize:14,color:'#2c3e50',lineHeight:22},
  mnemCard:{backgroundColor:'#fff',borderRadius:12,padding:24,alignItems:'center',elevation:2,marginTop:20},
  mnemLabel:{fontSize:14,color:'#3498db',marginBottom:16},
  mnemTxt:{fontSize:16,color:'#2c3e50',fontWeight:'600',textAlign:'center',lineHeight:26},
  footer:{padding:16,backgroundColor:'#fff',elevation:8},
  finBtn:{backgroundColor:'#27ae60',padding:16,borderRadius:12,alignItems:'center'},
  finBtnDis:{backgroundColor:'#bdc3c7'},
  finTxt:{color:'#fff',fontWeight:'700',fontSize:16},
});
