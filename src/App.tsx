
import React, { useState } from 'react';
import { View, StyleSheet,Alert,SafeAreaView} from 'react-native';

import MineField from './components/MineField';
import params from './params';
import Header from './components/Header';

import LevelSelection from './screens/LevelSelection';

import {
  createBoardMines,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from './functions';

export default function App() {
  const rows = params.getRows()
  const columns = params.getColumns()

  const mines = () => Math.ceil(columns * rows * params.dificultLevel)
  
  const [board,setBoard] = useState(createBoardMines(rows,columns,mines()))
  const [showLevel,setShowLevel] = useState(false)
  
  function onOpenField(row = 0, column = 0){
    const boardCloned = cloneBoard(board)
    openField(boardCloned,row,column)
    
    const l = hadExplosion(boardCloned)
    const w = wonGame(boardCloned)
    if(l){
      showMines(boardCloned)
      Alert.alert("Perdeu seu lixo")
    }
    if(w){
      Alert.alert("Oia ai")
    }
    setBoard(boardCloned)
  }
  function onSelectField(row = 0 ,column = 0){
    const boardCloned = cloneBoard(board)
    invertFlag(boardCloned,row,column)
    const w = wonGame(boardCloned)

    if(w){
      Alert.alert("Oia ai")
    }
    setBoard(boardCloned)
  }
  function onLevelSelect(level = 0.1){
    params.dificultLevel = level
    setBoard(createBoardMines(rows,columns,mines()))
    setShowLevel(false)
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.line}/>
        <LevelSelection isVisible = {showLevel}
          onLevelSelect={onLevelSelect}
          onCancel={()=> setShowLevel(false)}
        />
        <Header 
          flagsLeft = {mines() - flagsUsed(board)}
          onNewGame = {()=> setBoard(createBoardMines(rows,columns,mines()))}
          onFlagPress ={() => {setShowLevel(true)}} 
        />
        <View style={styles.line}/>
        <View style = {styles.board}>
          <MineField board={board} onOpenField={onOpenField} onSelectField={onSelectField}/>
        </View>
    </SafeAreaView>
  );

}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-end',
    alignContent: 'center',
    backgroundColor:'#FFF',
  },
  board:{
    alignItems: 'center',
    backgroundColor:'#AAA',
  },
  line:{
    height: 5,
    backgroundColor:'#333'
  }
});