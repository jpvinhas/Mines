import { Dimensions } from "react-native";

const params ={
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRadio: 0.15, //cabecalho
    dificultLevel: 0.1,

    getColumns(){
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    getRows(){
        const totalHeigth = Dimensions.get('window').height
        const utilHeigth = totalHeigth * (1-this.headerRadio)
        return Math.floor(utilHeigth / this.blockSize)
    }
}
export default params