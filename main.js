'use strict';

{

	const question = document.getElementById('question');
	const choices = document.getElementById('choices');
	const btn = document.getElementById('btn');
	const result = document.getElementById('result');
	const scoreLabel = document.querySelector('#result > p');

	const quizSet = shuffle([
		{q:'『i’m lovin’ it』', c:['マクドナルド','ケンタッキー','バーガーキング']},
        {q:'『Leading Innovation』', c:['東芝','ソニー','パナソニック']},
        {q:'『Inspire the Next』', c:['日立','東芝','パナソニック']},
        {q:'『お口の恋人』', c:['ロッテ','森永製菓','カルビー']},
        {q:'『Drive your Ambition』', c:['三菱自動車','豊田自動車','日産自動車']},
        {q:'『水と生きる』', c:['サントリー','キリン','アサヒ']},
        {q:'『ひとのときを、想う。』', c:['JT','フィリップ・モーリス','ブリティッシュ・アメリカン']},
        {q:'『愛は食卓にある。』', c:['キューピー','味の素','丸大食品']},
        {q:'『自然と健康を科学する』', c:['ツムラ','大正製薬','武田薬品']},
        {q:'『あったらいいなをカタチにする』', c:['小林製薬','ツムラ','武田薬品']},
        {q:'『第一志望はゆずれない』', c:['駿台','河合塾','東進ハイスクール']},
	]);
	
	let currentNum = 0; //現在解いている問題番目
	let isAnswered;
	let score = 0;



	function shuffle(arr) { //シャッフルする関数
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
    }




    function checkAnswer(li){  //正誤判定する関数
    	if(isAnswered === true){
    		return;
    	}
    	isAnswered = true;
    	if(li.textContent === quizSet[currentNum].c[0]){
    		li.classList.add('correct');
    		score++;
    	}else{
    		li.classList.add('wrong');

    	}
    	btn.classList.remove('disabled');

    }




    function setQuiz(){

    	isAnswered = false;
		question.textContent = quizSet[currentNum].q; //＃questionにquizSet[currentNum].qを代入
		
        while (choices.firstChild) {
      	choices.removeChild(choices.firstChild);}
  		
        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
		
        shuffledChoices.forEach(choice => {   //quizSet[currentNum].cを新しく作るliタグに入れていくために、
		const li = document.createElement('li');  //まずliタグを作る（概念上）
		li.textContent = choice;  //forEachで代入されていくchoiceをそれぞれliの要素としていき、
		li.addEventListener('click',() => {
			checkAnswer(li);
		})
        choices.appendChild(li);  //最後に、liタグをchoicesの子要素として追加する。
		if(currentNum === quizSet.length - 1){
			btn.textContent = 'show score';
		}
	});

    }

    setQuiz();




	btn.addEventListener('click', () => {
    	if(btn.classList.contains('disabled')){
    		return
    	};

    	btn.classList.add('disabled');

    	if(currentNum === quizSet.length - 1){
    		//console.log(`${quizSet.length}問中、${score}問正解!`);
    		scoreLabel.textContent = `${quizSet.length}問中、${score}問正解!`;
    		result.classList.remove('hidden');
    	}else{
			currentNum++;
    		setQuiz();
    	};
    	
    });

}
