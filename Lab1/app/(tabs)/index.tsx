import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const players = [
    { name: 'Messi', goals: 30 },
    undefined,
    { name: 'Ronaldo', goals: 28 },
    { name: 'Neymar', goals: 22 },
    { goals: 2 },
    { name: 'Mbappé', goals: 25 },
    { name: 'Pele', goals: null },
    ];
    type Player = {
      name?: string;
      goals?: number | null;
    };
    const valiRule = (player: Player | undefined) => {
      return !!player?.name && typeof player.goals === 'number' && player.goals >= 0;
    };
    const list = players.filter(valiRule)
    console.log("Danh sách cầu thủ hợp lệ: \n", list )
    let top = list[0]
    for(let i = 0;i<list.length;i++){
      if(list[i] != null){
        if(list[i]?.goals !> top?.goals!){
          top=list[i]
        }
      }
    }
    console.log("Cầu thủ ghi bàn nhiều nhất:", top?.name, "-", top?.goals, "bàn thắng");
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Ngô Khánh Hoàng PH49274 </ThemedText>
   </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

