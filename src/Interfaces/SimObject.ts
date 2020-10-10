import type Vector2 from './Vector2'

export default interface SimObject {
    position: Vector2;
    vel: Vector2;
    rad: number;
}