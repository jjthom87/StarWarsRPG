$(document).ready(function(){

	var players = 
		[{
			name: 'luke',
			health: 50,
			attack: 20,
			image: '../static/Images/luke.jpg',
			type: 'light'
		},{
			name: 'hansolo',
			health: 50,
			attack: 15,
			image: '../static/Images/hansolo.jpg',
			type: 'light'
		},{
			name: 'boba',
			health: 50,
			attack: 10,
			image: '../static/Images/boba.jpg',
			type: 'dark'
		},{
			name: 'darth',
			health: 50,
			attack: 10,
			image: '../static/Images/darth.jpg',
			type: 'dark'
		}];

	var lightFighters = [];
	var darkFigthers = [];
	var darkFighter = [];
	var lightFighter = [];
	var lightChar;
	var darkChar;
	var lightHealth;
	var darkHealth;
	var lightAttack = Math.floor((Math.random() * 10)) + 4;
	var darkAttack = Math.floor((Math.random() * 10)) + 4;
	var darkScore = 0;
	var lightScore = 0;
	var lightLength = 0;
	var darkLength = 0;
	$('#attack').hide();

	players.forEach(function(player){
		if(player.type === 'light'){
			lightFighters.push(player);
		} else if (player.type === 'dark'){
			darkFigthers.push(player);
		}
	})

	function toDark(chars){
		chars.forEach(function(char){
			var darkDiv = $('<div class="dark-char" data-name='+char.name+' data-darkhealth='+char.health+' data-darkattack='+char.attack+'>');
			var darkImg = $('<img>');
			darkImg.addClass(''+char.name+'');
			darkImg.attr('src', char.image).height(100).width(100);
			darkDiv.append(darkImg).css('display','inline-block').css('margin-right', 10);
			$('.darkPlayers').append(darkDiv);
		});
	}

	function toLight(chars){
		chars.forEach(function(char){
			var lightDiv = $('<div class="light-char" data-name='+char.name+' data-lighthealth='+char.health+' data-lightattack='+char.attack+'>');
			var lightImg = $('<img>');
			lightImg.addClass(''+char.name+'');
			lightImg.attr('src', char.image).height(100).width(100);
			lightDiv.append(lightImg).css('display','inline-block').css('margin-right', 10);
			$('.lightPlayers').append(lightDiv);
		});
	}

	toDark(darkFigthers);
	toLight(lightFighters);
	$('.light-score').text(lightScore);
	$('.dark-score').text(darkScore);

	$(document).on('click', '.light-char', function(){
		if(!lightChar){
			var div = $('<div id="light-fight">');
			var img = $('<img>');
			var text = $('<p id="light-health">');
			lightChar = $(this).data('name');
			lightHealth = $(this).data('lighthealth');
			$('.'+lightChar).hide();
			var lightImgTwo = $('<img class="curLightFigher">')
			img.attr('src', '../static/Images/'+lightChar+'.jpg').height(100).width(100);
			text.text(lightHealth);
			div.append(img).append(text);
			$('.light-fight').append(div);
		} else {
			alert('Player in Action');
		}
		if(lightChar && darkChar){
			$('#attack').show();
		}
	})

	$(document).on('click', '.dark-char', function(){
		if(!darkChar){
			var div = $('<div id="dark-fight">');
			var img = $('<img>');
			var text = $('<p id="dark-health">');
			darkChar = $(this).data('name');
			darkHealth = $(this).data('darkhealth');
			$('.'+darkChar).hide();
			var darkImgTwo = $('<img class="curDarkFigher">')
			img.attr('src', '../static/Images/'+darkChar+'.jpg').height(100).width(100);
			text.text(darkHealth);
			div.append(img).append(text);
			$('.dark-fight').append(div);
			darkLength = $('#dark-fight').children().length;
		} else {
			alert('Player in Action');
		}
		if(lightChar && darkChar){
			$('#attack').show();
		}
	})

	$('#attack').on('click', function(){
		if(!darkChar && !lightChar){
			alert('Please choose a character and an enemy');
		} else if (!lightChar){
			alert('Please choose a character')
		} else if (!darkChar){
			alert('Please choose an enemy');
		} else {
			darkHealth = darkHealth - lightAttack;
			lightAttack = Math.floor((Math.random() * 10)) + 4;
			$('#dark-health').empty();
			$('#dark-health').text(darkHealth);

			lightHealth = lightHealth - darkAttack;
			darkAttack = Math.floor((Math.random() * 10)) + 4;
			$('#light-health').empty();
			$('#light-health').text(lightHealth);

			if(lightHealth <= 0){
				randomMessage(darkChar + ' wins');
				darkScore = darkScore + 1;
				$('.dark-score').text(darkScore);
				reset();
			} else if (darkHealth <= 0){
				randomMessage(lightChar + ' wins');
				lightScore = lightScore + 1;
				$('.light-score').text(lightScore);
				reset();
			} else if (lightHealth <= 0 && darkHealth <= 0){
				randomMessage('You both lose, you suck');
				reset();
			} else if((darkChar === 'darth' && lightChar === 'luke') && (lightHealth <= 5 || darkHealth <= 5)){
				alert('Luke, I am your father');
				reset();
			}
		 }
	})

	function reset(){
		$('.'+lightChar).show();
		$('.'+darkChar).show();
		lightChar = null;
		darkChar = null;
		$('.light-fight').empty();
		$('.dark-fight').empty();
		$('#light-health').empty();
		$('#dark-health').empty();
		$('#attack').hide();
	}

	function randomMessage(message){
		var p = $('<p>');
		p.addClass('text-center');
		p.text(message).fadeIn(4000).fadeOut(4000);
		$('.randomMessage').append(p);
	}
	
});