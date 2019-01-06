import Board from '../Board';
import Piece from '../Piece';

export default interface ICollisionStrategy {
    check(board: Board, piece: Piece): boolean;
}
