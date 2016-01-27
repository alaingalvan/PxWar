export class MathEx {

  static degToRad(angle) {
    return 0.0174533 * angle;
  }

  static clamp(val, minVal, maxVal) {
    return Math.max(minVal, Math.min(val, maxVal));
  }

  static random_range(min, max) {
    return Math.random() * (max - min) + min;
  }

  static getAngleTwoPoints(x1, y1, x2, y2) {
    return Math.atan2(-(y2 - y1), x2 - x1) * (180 / Math.PI);
  }
  static angleDifference(angle0: number, angle1: number) {
    return ((((angle0 - angle1) % 360) + 540) % 360) - 180;
  }
  static keyboardAngle(up: boolean, left: boolean, down: boolean, right: boolean) {
    //Diagonals
    if (right && up)
      return 45;
    if (left && up)
      return 135;
    if (right && down)
      return 315;
    if (left && down)
      return 225;
    //Orthographics
    if (right)
      return 0;
    if (up)
      return 90;
    if (left)
      return 180;
    if (down)
      return 270;
    return 0;
  }
}
