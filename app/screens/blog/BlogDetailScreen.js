import React from 'react';
import { View,Text,StyleSheet,ScrollView,TouchableOpacity,Linking } from 'react-native';
export default function BlogDetailScreen({ route, navigation }) {
  const { article:a } = route.params;
  if (!a) return null;
  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={s.back}>Back</Text></TouchableOpacity>
        <View style={s.catBadge}><Text style={s.catTxt}>{a.category}</Text></View>
      </View>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.content}>
          <Text style={s.title}>{a.title}</Text>
          <View style={s.meta}>
            <Text style={s.src}>{a.source}</Text>
            <Text style={s.date}>{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : ''}</Text>
          </View>
          <View style={s.divider}/>
          <Text style={s.summary}>{a.summary}</Text>
          <View style={s.divider}/>
          <Text style={s.body}>{a.content}</Text>
          {a.tags?.length>0 && (<View style={s.tagsSection}><Text style={s.tagsTitle}>Tags</Text><View style={s.tags}>{a.tags.map((t,i)=><View key={i} style={s.tag}><Text style={s.tagTxt}>#{t}</Text></View>)}</View></View>)}
          {a.url ? (<TouchableOpacity style={s.srcBtn} onPress={()=>Linking.openURL(a.url)}><Text style={s.srcBtnTxt}>Read Full Article at {a.source}</Text></TouchableOpacity>) : null}
          <View style={{height:40}}/>
        </View>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#fff'},
  header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:16,paddingTop:50,backgroundColor:'#2c3e50'},
  back:{color:'#fff',fontSize:16},
  catBadge:{backgroundColor:'rgba(255,255,255,0.2)',paddingHorizontal:10,paddingVertical:4,borderRadius:8},
  catTxt:{color:'#fff',fontSize:12,fontWeight:'600'},
  scroll:{flex:1},
  content:{padding:20},
  title:{fontSize:22,fontWeight:'700',color:'#2c3e50',lineHeight:30,marginBottom:12},
  meta:{flexDirection:'row',justifyContent:'space-between',marginBottom:16},
  src:{fontSize:13,color:'#3498db',fontWeight:'500'},
  date:{fontSize:13,color:'#95a5a6'},
  divider:{height:1,backgroundColor:'#ecf0f1',marginVertical:16},
  summary:{fontSize:16,color:'#34495e',lineHeight:26,fontStyle:'italic'},
  body:{fontSize:15,color:'#2c3e50',lineHeight:26},
  tagsSection:{marginTop:24},
  tagsTitle:{fontSize:14,fontWeight:'600',color:'#7f8c8d',marginBottom:8},
  tags:{flexDirection:'row',flexWrap:'wrap',gap:8},
  tag:{backgroundColor:'#f0f3f4',paddingHorizontal:10,paddingVertical:5,borderRadius:8},
  tagTxt:{fontSize:13,color:'#7f8c8d'},
  srcBtn:{backgroundColor:'#2c3e50',padding:16,borderRadius:12,alignItems:'center',marginTop:24},
  srcBtnTxt:{color:'#fff',fontWeight:'600',fontSize:15},
});
