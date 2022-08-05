// div要素を格納
const cards = []
// 開始時間
let startTime
// 経過秒数用 タイマーID
let timer
// s : スペード, d : ダイヤ, h : ハート, c : クローバー
const suits = ["s", "d", "h", "c"]

// オブジェクトをつくる関数
function cardFanc(suit, num) {
	// カードの種類
	this.suit = suit
	// カードの番号
	this.num = num
	// カードの画像 sliceで最後から2つ取り出し2桁にする
	this.front = `${this.suit}${('0'+this.num).slice(-2)}.svg`
	// 出力例
	// cardFanc {suit: 's', num: 6, front: 's06.svg'}
}

// 画面を読み込みのとき
window.onload = function () {
	// カード情報を配列に格納
	for (let i = 0; i < suits.length; i++) {
		for (let j = 1; j <= 13; j++) {
			let card = new cardFanc(suits[i], j)
			cards.push(card)
		}
	}
	const panel = document.getElementById('panel')
	shuffleCard()
	// 開始時刻を取得
	startTime = new Date()
	// タイマー開始
	startTimer()
}

// シャッフル
function shuffle(arrays) {
	const array = arrays.slice()
	for (let i = array.length - 1; i >= 0; i--) {
		// 末尾に；をつけないと表示できない
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
	}
	return array
}

// シャッフルし、HTML生成
function shuffleCard() {
	const shuffled = shuffle(cards)
	// console.log(shuffled)
	let div
	let shaffleN = ''
	for (let i = 0; i < suits.length; i++) {
		for (let j = 0; j < 13; j++) {
			shaffleN = shuffled[i * 13 + j]
			div = document.createElement("div")
			div.className = 'card2 back'
			div.number = shaffleN.num
			div.onclick = flip // カードをクリックしたときの関数
			div.style.backgroundImage = `url(img/${shaffleN.front})`
			panel.appendChild(div)
		}
	}
}

// タイマー開始
function startTimer() {
	timer = setInterval(showSecond, 1000)
}
// 秒数表示
function showSecond() {
	const nowTime = new Date()
	let elapsedTime = Math.floor((nowTime - startTime) / 1000)
	let str = '経過秒数: ' + elapsedTime + '秒'
	let re = document.getElementById('result')
	re.innerHTML = str
}

// 1枚目のカードの変数を宣言 最初はnull
let firstCard = null
// カードめくり用 タイマーID
let backTimer
// そろえた枚数
let countUnit = 0
// カードをめくった時の処理
function flip(e) {
	let filipedCard = e.target
	// カードにclass="back"がない表のときorカードのタイマー処理が動作中は return
	if (!filipedCard.classList.contains("back") || backTimer) {
		return
	} else {
		// backを取り除いて、カードを表にする。
		filipedCard.classList.remove("back")
	}
	// 1枚目の処理
	if (firstCard === null) {
		// めくったカードをfirstCardに設定
		firstCard = filipedCard
		// 2枚目の処理
	} else {
		// 数字が1枚目と一致する場合
		if (firstCard.number === filipedCard.number) {
			countUnit++
			console.log(countUnit)
			// 一致したらclass変更
			backTimer = setTimeout(function () {
				firstCard.classList.add("finish")
				filipedCard.classList.add("finish")
				backTimer = NaN
				// firstCardを初期値に戻す
				firstCard = null
				if (countUnit === 26) {
					clearInterval(timer) // timer終了
				}
			}, 500)
			// 一致しない場合
		} else {
			// カードを裏側に戻す
			backTimer = setTimeout(function () {
				firstCard.classList.add("back")
				filipedCard.classList.add("back")
				backTimer = NaN
				firstCard = null
			}, 500)
		}
	}
}
