import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import { useRevision } from '../../context/RevisionContext';
import { getProcedureById, PROCEDURES } from '../../data/procedures';
export default function RevisionResultScreen({ route, navigation }) {
  const { procedureId, score } = route.params;
  const proc = getProcedureById(procedureId);
  const { progress, getStats } = useRevision();
  const stats = getStats();
  const tr = progress[procedureId]?.timesRevised || 0;
  const gc = s => s>=80?'#27ae60':s>=50?'#f39c12':'#e74c3c';
  const msg = s => s===100?'Perfect! All steps completed.':s>=80?'Great work! Almost there.':s>=50?'Good effort. Keep practising.':'Keep going - revision makes perfect.';
  const next = PROCEDURES.find(p => p.id!==procedureId && !(progress[p.id]?.timesRevised>0));
  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <View style={[s.circle,{borderColor:gc(score)}]}>
        <Text style={[s.scoreNum,{color:gc(score)}]}>{score}%</Text>
        <Text style={s.scoreLbl}>Score</Text>
      </View>
      <Text style={s.msg}>{msg(score)}</Text>
      <Text style={s.procTitle}>{proc?.title}</Text>
      <Text style={s.meta}>Revised {tr} time{tr!==1?'s':''}</Text>
      <View style={s.statsCard}>
        <Text style={s.statsTitle}>Your Progress</Text>
        <View style={s.statsRow}>
          <View style={s.si}><Text style={s.sn}>{stats.totalRevisions}</Text><Text style={s.sl}>Total revisions</Text></View>
          <View style={s.si}><Text style={s.sn}>{stats.completionPercent}%</Text><Text style={s.sl}>Procedures done</Text></View>
          <View style={s.si}><Text style={s.sn}>{stats.averageScore}%</Text><Text style={s.sl}>Avg score</Text></View>
        </View>
      </View>
      <TouchableOpacity style={s.btnP} onPress={()=>navigation.navigate('RevisionDetail',{procedureId})}><Text style={s.btnPTxt}>Revise Again</Text></TouchableOpacity>
      {next&&<TouchableOpacity style={s.btnS} onPress={()=>navigation.navigate('RevisionDetail',{procedureId:next.id})}><Text style={s.btnSTxt}>Next: {next.title}</Text></TouchableOpacity>}
      <TouchableOpacity style={s.btnO} onPress={()=>navigation.navigate('RevisionHome')}><Text style={s.btnOTxt}>Back to All Procedures</Text></TouchableOpacity>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#f5f6fa'},
  content:{alignItems:'center',padding:24,paddingTop:60},
  circle:{width:140,height:140,borderRadius:70,borderWidth:6,alignItems:'center',justifyContent:'center',marginBottom:20},
  scoreNum:{fontSize:40,fontWeight:'700'},
  scoreLbl:{fontSize:14,color:'#7f8c8d'},
  msg:{fontSize:18,fontWeight:'600',color:'#2c3e50',textAlign:'center',marginBottom:8},
  procTitle:{fontSize:15,color:'#7f8c8d',textAlign:'center',marginBottom:4},
  meta:{fontSize:13,color:'#95a5a6',marginBottom:24},
  statsCard:{backgroundColor:'#fff',borderRadius:12,padding:20,width:'100%',marginBottom:24,elevation:2},
  statsTitle:{fontSize:16,fontWeight:'600',color:'#2c3e50',marginBottom:16,textAlign:'center'},
  statsRow:{flexDirection:'row',justifyContent:'space-around'},
  si:{alignItems:'center'},
  sn:{fontSize:24,fontWeight:'700',color:'#2c3e50'},
  sl:{fontSize:12,color:'#95a5a6',marginTop:4,textAlign:'center'},
  btnP:{backgroundColor:'#27ae60',padding:16,borderRadius:12,width:'100%',alignItems:'center',marginBottom:12},
  btnPTxt:{color:'#fff',fontWeight:'700',fontSize:16},
  btnS:{backgroundColor:'#3498db',padding:16,borderRadius:12,width:'100%',alignItems:'center',marginBottom:12},
  btnSTxt:{color:'#fff',fontWeight:'600',fontSize:15},
  btnO:{padding:16,borderRadius:12,width:'100%',alignItems:'center',borderWidth:1,borderColor:'#bdc3c7'},
  btnOTxt:{color:'#7f8c8d',fontSize:15},
});
