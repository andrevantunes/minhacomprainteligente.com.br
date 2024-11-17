export const getImageStyle = (rotation: number, ratio: number) => {
  if (rotation === 0) return {};
  if (rotation === 180) return { transform: `rotate(${rotation}deg) translate(-100%, -100%)` };
  const scale = ratio;
  const translateY = scale * 100;
  if (rotation === 90) {
    return { transform: `rotate(${rotation}deg) translateY(-${translateY}%) scale(${scale})` };
  }
  return { transform: `rotate(${rotation}deg) translateX(-${translateY}%) scale(${scale})` };
};
