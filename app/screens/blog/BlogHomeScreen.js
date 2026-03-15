import React, { useState, useEffect, useCallback } from 'react';
import { View,Text,StyleSheet,FlatList,TouchableOpacity,TextInput,RefreshControl,ActivityIndicator } from 'react-native';
import { blogApi } from '../../../services/blogService';
export default function BlogHomeScreen({ navigation }) {
  const [articles,    setArticles]    = useState([]);
  const [categories,  setCategories]  = useState([]);
  const [category,    setCategory]    = useState('All');
  const [search,      setSearch]      = useState('');
  const [page,        setPage]        = useState(1);
  const [pages,       setPages]       = useState(1);
  const [loading,     setLoading]     = useState(true);
  const [refreshing,  setRefreshing]  = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const load = useCallback(async (pg=1, cat=category, q=search, isRefresh=false) => {
    if (pg===1) isRefresh ? setRefreshing(true) : setLoading(true);
    else setLoadingMore(true);
    const data = await blogApi.getArticles({ category:cat, search:q, page:pg, limit:15 });
    if (pg===1) setArticles(data.articles||[]);
    else setArticles(prev=>[...prev,...(data.articles||[])]);
    setPages(data.pages||1);
    if (data.lastUpdated) setLastUpdated(new Date(data.lastUpdated).toLocaleDateString());
    setLoading(false); setRefreshing(false); setLoadingMore(false);
  }, [category, search]);
  useEffect(() => {
    blogApi.getCategories().then(cats => setCategories(['All',...cats.map(c=>c.name)]));
    load(1);
  }, []);
  const onCat    = c  => { setCategory(c); setPage(1); load(1,c,search); };
  const onSearch = q  => { setSearch(q);   setPage(1); load(1,category,q); };
  const onRefresh= () => { setPage(1); load(1,category,search,true); };
  const onEnd    = () => { if (page<pages&&!loadingMore) { const n=page+1; setPage(n); load(n,category,search); }};
  const renderCard = ({ item:a }) => (
    <TouchableOpacity style={s.card} onPress={()=>navigation.navigate('BlogDetail',{article:a})}>
      <View style={s.cardTop}>
        <View style={s.catBadge}><Text style={s.catBadgeTxt}>{a.category}</Text></View>
        {a.isNew && <View style={s.newBadge}><Text style={s.newBadgeTxt}>NEW</Text></View>}
      </View>
      <Text style={s.cardTitle} numberOfLines={2}>{a.title}</Text>
      <Text style={s.cardSummary} numberOfLines={3}>{a.summary}</Text>
      <View style={s.cardFoot}>
        <Text style={s.cardSrc}>{a.source}</Text>
        <Text style={s.cardDate}>{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : ''}</Text>
      </View>
      {a.tags?.length>0 && (<View style={s.tags}>{a.tags.slice(0,3).map((t,i)=><View key={i} style={s.tag}><Text style={s.tagTxt}>#{t}</Text></View>)}</View>)}
    </TouchableOpacity>
  );
  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Medical News</Text>
        {lastUpdated ? <Text style={s.headerSub}>Updated {lastUpdated}</Text> : null}
      </View>
      <TextInput style={s.search} placeholder='Search medical news...' placeholderTextColor='#95a5a6' value={search} onChangeText={onSearch}/>
      <FlatList horizontal data={categories} keyExtractor={i=>i} showsHorizontalScrollIndicator={false} style={s.cats} contentContainerStyle={{paddingHorizontal:12,paddingVertical:8}} renderItem={({item:c})=>(<TouchableOpacity style={[s.chip,category===c&&s.chipActive]} onPress={()=>onCat(c)}><Text style={[s.chipTxt,category===c&&s.chipTxtActive]}>{c}</Text></TouchableOpacity>)}/>
      {loading ? (<ActivityIndicator size='large' color='#2c3e50' style={{marginTop:60}}/>) : (
        <FlatList data={articles} keyExtractor={a=>a.id} renderItem={renderCard} contentContainerStyle={{padding:12}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2c3e50']}/>} onEndReached={onEnd} onEndReachedThreshold={0.3} ListEmptyComponent={<Text style={s.empty}>No articles found. Pull down to refresh.</Text>} ListFooterComponent={loadingMore?<ActivityIndicator color='#2c3e50' style={{margin:16}}/>:null}/>
      )}
    </View>
  );
}
const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#f5f6fa'},
  header:{backgroundColor:'#2c3e50',padding:20,paddingTop:50},
  headerTitle:{fontSize:24,fontWeight:'700',color:'#fff'},
  headerSub:{fontSize:12,color:'#bdc3c7',marginTop:4},
  search:{margin:12,padding:12,backgroundColor:'#fff',borderRadius:10,fontSize:15,color:'#2c3e50'},
  cats:{maxHeight:50,flexGrow:0},
  chip:{paddingHorizontal:14,paddingVertical:7,borderRadius:20,backgroundColor:'#ecf0f1',marginRight:8},
  chipActive:{backgroundColor:'#2c3e50'},
  chipTxt:{fontSize:13,color:'#7f8c8d'},
  chipTxtActive:{color:'#fff',fontWeight:'600'},
  card:{backgroundColor:'#fff',borderRadius:12,padding:16,marginBottom:12,elevation:2},
  cardTop:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},
  catBadge:{backgroundColor:'#e8f4fd',paddingHorizontal:8,paddingVertical:3,borderRadius:8},
  catBadgeTxt:{fontSize:11,color:'#2980b9',fontWeight:'600'},
  newBadge:{backgroundColor:'#e8f8f5',paddingHorizontal:8,paddingVertical:3,borderRadius:8},
  newBadgeTxt:{fontSize:11,color:'#27ae60',fontWeight:'700'},
  cardTitle:{fontSize:16,fontWeight:'700',color:'#2c3e50',marginBottom:6,lineHeight:22},
  cardSummary:{fontSize:14,color:'#7f8c8d',lineHeight:20,marginBottom:10},
  cardFoot:{flexDirection:'row',justifyContent:'space-between',marginBottom:8},
  cardSrc:{fontSize:12,color:'#3498db',fontWeight:'500'},
  cardDate:{fontSize:12,color:'#95a5a6'},
  tags:{flexDirection:'row',flexWrap:'wrap',gap:6},
  tag:{backgroundColor:'#f0f3f4',paddingHorizontal:8,paddingVertical:3,borderRadius:6},
  tagTxt:{fontSize:11,color:'#7f8c8d'},
  empty:{textAlign:'center',color:'#95a5a6',marginTop:60,fontSize:15},
});
