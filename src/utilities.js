export const drawRect = (detection, ctx) => {
  detection.forEach((prediction) => {
    const { x, y, width, height } = prediction["boundingBox"];
    const text = prediction["rawValue"];
    ctx.strokeStyle = "red";
    ctx.font = "18px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(text, x, y);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
