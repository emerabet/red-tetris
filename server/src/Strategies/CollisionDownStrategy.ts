import ICollisionStrategy from '../Interfaces/ICollisionStrategy';
import Board from '../Board';
import Piece from '../Piece';
import { CellState } from '../constants';

export default class CollisionDownStrategy implements ICollisionStrategy {
    check(board: Board, piece: Piece): boolean {
        const height: number = board.gridHeight - 1;

        for (let i = 0; i < piece.shape.length; i += 1) {
            for (let j = 0; j < piece.shape[i].length; j += 1) {
                if (piece.shape[i][j] !== CellState.Empty) {
                    const total = piece.row + i;
                    if (total > height || board.grid[total][piece.col + j]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
