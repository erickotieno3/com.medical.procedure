import React, { useState } from 'react';
import { View,Text,StyleSheet,ScrollView,TouchableOpacity,TextInput } from 'react-native';
import { useRevision } from '../../context/RevisionContext';
import { PROCEDURES, CATEGORIES } from '../../data/procedures';
export default function RevisionHomeScreen({ navigation }) {
  const { progress, bookmarks, getStats } = useRevision();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const stats = getStats();
  const filtered = PROCEDURES.filter(p => {
    const ms = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const mc = activeCategory === 'All' || p.category === activeCategory;
    return ms && mc;
  });
  const getDiffColor = d => ({beginner:'#27ae60',intermediate:'#f39c12',advanced:'#e74c3c'}[d]||'#95a5a6');
  const getPct = id => { const p=progress[id]; if(!p) return 0; const pr=PROCEDURES.find(x=>x.id===id); if(!pr) return 0; return Math.round(((p.completedSteps?.length||0)/pr.steps.length)*100); };
  return (
    <View style={s.container}>
      <View style={s.statsRow}>
        <View style={s.statBox}><Text style={s.statNum}>{stats.totalRevisions}</Text><Text style={s.statLabel}>Revisions</Text></View>
        <View style={s.statBox}><Text style={s.statNum}>{stats.completionPercent}%</Text><Text style={s.statLabel}>Complete</Text></View>
        <View style={s.statBox}><Text style={s.statNum}>{stats.averageScore}%</Text><Text style={s.statLabel}>Avg Score</Text></View>
        <View style={s.statBox}><Text style={s.statNum}>{stats.bookmarkCount}</Text><Text style={s.statLabel}>Saved</Text></View>
      </View>
      <TextInput style={s.search} placeholder='Search procedures...' placeholderTextColor='#95a5a6' value={search} onChangeText={setSearch} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.cats}>
        {['All',...CATEGORIES].map(cat => (<TouchableOpacity key={cat} style={[s.chip, activeCategory===cat&&s.chipActive]} onPress={()=>setActiveCategory(cat)}><Text style={[s.chipText, activeCategory===cat&&s.chipTextActive]}>{cat}</Text></TouchableOpacity>))}
      </ScrollView>
      <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
        {filtered.map(proc => { const pct=getPct(proc.id); const isB=bookmarks.includes(proc.id); const tr=progress[proc.id]?.timesRevised||0; return (
          <TouchableOpacity key={proc.id} style={s.card} onPress={()=>navigation.navigate('RevisionDetail',{procedureId:proc.id})}>
            <View style={s.cardTop}>
              <View style={{flex:1}}><Text style={s.cardCat}>{proc.category}</Text><Text style={s.cardTitle}>{proc.title}</Text></View>
              <View style={s.cardRight}>{isB&&<Text style={s.bm}>★</Text>}<View style={[s.diff,{backgroundColor:getDiffColor(proc.difficulty)}]}><Text style={s.diffTxt}>{proc.difficulty}</Text></View></View>
            </View>
            <View style={s.progRow}><View style={s.progBar}><View style={[s.progFill,{width:pct+'%'}]}/></View><Text style={s.progTxt}>{pct}%</Text></View>
            <Text style={s.meta}>{proc.steps.length} steps  {tr>0?'Revised '+tr+'x':'Not yet revised'}</Text>
          </TouchableOpacity>); })}
        <View style={{height:40}}/>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#f5f6fa'},
  statsRow:{flexDirection:'row',backgroundColor:'#2c3e50',padding:16},
  statBox:{flex:1,alignItems:'center'},
  statNum:{fontSize:22,fontWeight:'700',color:'#fff'},
  statLabel:{fontSize:11,color:'#bdc3c7',marginTop:2},
  search:{margin:12,padding:12,backgroundColor:'#fff',borderRadius:10,fontSize:15,color:'#2c3e50'},
  cats:{paddingLeft:12,marginBottom:8,maxHeight:44},
  chip:{paddingHorizontal:14,paddingVertical:8,borderRadius:20,backgroundColor:'#ecf0f1',marginRight:8},
  chipActive:{backgroundColor:'#2c3e50'},
  chipText:{fontSize:13,color:'#7f8c8d'},
  chipTextActive:{color:'#fff',fontWeight:'600'},
  list:{flex:1,paddingHorizontal:12},
  card:{backgroundColor:'#fff',borderRadius:12,padding:16,marginBottom:12,elevation:2},
  cardTop:{flexDirection:'row',alignItems:'flex-start',marginBottom:10},
  cardCat:{fontSize:11,color:'#3498db',fontWeight:'600',textTransform:'uppercase',marginBottom:2},
  cardTitle:{fontSize:16,fontWeight:'700',color:'#2c3e50'},
  cardRight:{alignItems:'flex-end',gap:6},
  bm:{fontSize:18,color:'#f39c12'},
  diff:{paddingHorizontal:8,paddingVertical:3,borderRadius:10},
  diffTxt:{fontSize:11,color:'#fff',fontWeight:'600'},
  progRow:{flexDirection:'row',alignItems:'center',marginBottom:6},
  progBar:{flex:1,height:6,backgroundColor:'#ecf0f1',borderRadius:3,marginRight:8},
  progFill:{height:6,backgroundColor:'#27ae60',borderRadius:3},
  progTxt:{fontSize:12,color:'#7f8c8d',width:35},
  meta:{fontSize:12,color:'#95a5a6'},
});
