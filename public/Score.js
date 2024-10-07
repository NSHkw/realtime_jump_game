import { sendEvent } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';

  nowStage = 1000;
  stageChanged = {};
  scorePerSecond = 0;

  constructor(ctx, scaleRatio, itemData, itemController, stageData) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
    this.itemData = itemData;
    this.itemController = itemController;
    this.stageData = stageData;
  }

  update(deltaTime) {
    let nowStageInfo = this.stageData.find((data) => data.id === this.nowStage);
    let scorePerSecondInc = nowStageInfo.scorePerSecond;

    this.scorePerSecond += deltaTime * 0.001 * scorePerSecondInc;

    this.score += this.scorePerSecond;
    this.scorePerSecond -= scorePerSecondInc;

    // 현재 점수가 100점이고이면 moveStageHandler로 스테이지 이동
    if (Math.floor(this.score) === 100 && this.stageChange) {
      this.stageChange = false;
      sendEvent(11, { currentStage: 1000, targetStage: 1001 });
    }

    for (let i = 1; i < this.stageData.length; i++) {
      const nextStage = this.stageData[i];
      if (Math.floor(this.score) >= nextStage.score && !this.stageChanged[nextStage.id]) {
        let pastStage = this.nowStage;
        this.nowStage = nextStage.id;

        sendEvent(11, { currentStage: pastStage, targetStage: this.nowStage });

        if (this.itemController.length > 0) {
          this.itemController.setNextStage(this.nowStage);
        }
        break;
      }
    }
  }

  getItem(itemId) {
    const itemInfo = this.itemData.find((data) => data.id === itemId);

    if (itemInfo) {
      this.score += itemInfo.score;
      sendEvent(12, itemId);
    }
    this.score += 0;
  }

  reset() {
    this.score = 0;
    this.scorePerSecond = 0;
    this.nowStage = 0;
    this.stageChanged = {};

    this.itemController.setNextStage(this.nowStage);
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;
    const stageX = 20 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);
    const nowStage = this.currentStage - 999;

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    this.ctx.fillText(`Stage ${nowStage}`, stageX, y);
  }
}

export default Score;
