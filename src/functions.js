
const createBoard = (rows,columns) => {
    return Array(rows).fill(0).map((_,row)=> {
        return Array(columns).fill(0).map((_,column) =>{
            return{
                row,
                column,
                opened: false,
                marked:false,
                mined: false,
                exploded:false,
                nearMines:0
            }
        })
    })
}

const spreadMines = (board,mines) => {
    const rows = board.length
    const columns = board[0].length

    var spreadedMines = 0

    while(spreadedMines < mines){
        const rowS = parseInt(Math.random() * rows, 10)
        const columnS = parseInt(Math.random() * columns, 10)

        if(board[rowS][columnS].mined){
            continue;
        }
        board[rowS][columnS].mined = true;
        spreadedMines ++;
    }

}

const createBoardMines = (rows,columns,mines) =>{
    const board = createBoard(rows,columns)
    spreadMines(board,mines)
    return board
}

const cloneBoard = board =>{
    return board.map(rows => {
        return rows.map(field =>{
            return {...field}
        })
    })
}

const getNeighbors = (board,row,column) =>{
    const neighbors = []
    const rows = [row-1,row,row+1]
    const columns = [column-1,column,column+1]
    rows.forEach(r => {
        columns.forEach(c => {
            const dif = r !==row || c!== column
            const validRow = r >= 0 && r < board.length
            const validcolumn = c >= 0 && c < board[0].length

            if(dif && validRow && validcolumn){
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

const safeNeigborhood = (board,row,column) =>{
    const safes = (result,neighbor) => result && !neighbor.mined
    return getNeighbors(board,row,column).reduce(safes,true)

}

const openField = (board,row,column) =>{
    const field = board[row][column];
    if(!field.opened){
        field.opened = true
        if(field.mined){
            field.exploded = true
        }else if(safeNeigborhood(board,row,column)){
            getNeighbors(board,row,column)
                .forEach(n => openField(board,n.row,n.column))
        }else{
            const neighbors= getNeighbors(board,row,column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }

    }
}

const fields = board => [].concat(...board)
const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0
const pending = field => (field.mined && !field.marked) || (!field.mined && field.opened)
const wonGame = board => fields(board).filter(field => pending(field)).length === 0
const showMines = board =>fields(board)
    .filter(field => field.mined)
        .forEach(field =>field.opened = true)
const invertFlag = (board,row,column) =>{
    const field = board[row][column];
    field.marked = !field.marked
}
const flagsUsed = board => fields(board).filter(field => field.marked).length
export {
    createBoardMines,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    fields,
    invertFlag,
    flagsUsed,
}