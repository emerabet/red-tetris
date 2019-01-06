import ICollisionStrategy from '../Interfaces/ICollisionStrategy';
import Board from '../Board';
import Piece from '../Piece';
import { CellState } from '../constants';

export default class CollisionTopStrategy implements ICollisionStrategy {
    check(board: Board, piece: Piece): boolean {
        return false;
    }
}
