(function () {

	var start;
	var timeStart;
	var menuToggle;
	var convo;
	var contactPopup;
	var popupVisible = false;
	var menuButton = document.querySelector('.mobile-menu-button');
	var menuOpen = false;

	// set conversation
	convo = [
		{speaker: 'bot', message: 'Good morning Jay!'},
		{speaker: 'bot', message: 'How are you feeling today?'},
		{speaker: 'exec', message: 'I am feeling a little tired today'},
		{speaker: 'bot', message: 'Why are you feeling a little tired today?'},
		{speaker: 'exec', message: 'Because I couldn`t fall asleep until 2am.'},
		{speaker: 'bot', message: 'Sorry to hear that!'},
		{speaker: 'bot', message: 'What is your main priority today?'},
		{speaker: 'exec', message: 'Sign two new clients.'},
		{speaker: 'bot', message: 'A journey of a thousand miles begins with a single step!</br>(Laozi - Tao De Ching)'},
		{speaker: 'bot', message: 'What are you looking forward today?'},
		{speaker: 'exec', message: 'Mastermind lunch'},
		{speaker: 'bot', message: 'Great! Remember you said yesterday would have been better if you had been nicer to Pam in HR.'},
		{speaker: 'bot', message: 'Have a fantastic day and I\'ll talk to you later!'},
		{speaker: 'exec', message: 'Later'},
		{speaker: 'bot', message: 'Did you accomplish your goal to sign two new clients?'},
		{speaker: 'exec', message: 'No I only did 1'},
		{speaker: 'bot', message: 'What do you think got in the way of achieving your goal?'},
		{speaker: 'exec', message: 'I spent too much time browsing the internet.'},
		{speaker: 'bot', message: 'Try not to be too hard on yourself.'},
		{speaker: 'bot', message: '"The things you think about determine the quality of your mind. Your soul takes on the color of your thoughts."</br>(Marcus Aurelius - Meditations)'},
		{speaker: 'bot', message: 'What went well today?'},
		{speaker: 'exec', message: 'Had a good lunch conversation with fellow founders.'},
		{speaker: 'bot', message: 'What could have gone better?'},
		{speaker: 'exec', message: 'I wish I had left the office earlier.'},
		{speaker: 'bot', message: 'Summary: Today you felt tired because you couldn\'t fall asleep until 2am. You wanted to sign two new clients and signed one because you spent too much time talking on the internet. You enjoyed a Mastermind lunch with fellow founders.'},
		{speaker: 'bot', message: '<u>Click here</u> if you would like to share summary with a contact or get tips on time management.'}
	]

	start = function () {

		var initBubbles = function () {
			// var positionTop = 0;
			// loop through each line of conversation
			for (var i = 0; i < convo.length; i++) {
				// create a bubble for each line, assign id and text
				var messageBubble = document.createElement('div');
				messageBubble.setAttribute('id', 'message-bubble' + i);
				messageBubble.innerHTML = '<span class="message-text">' + convo[i].message + '</span>';
				messageBubble.style.width = convo[i].message.length/2.45 + 'em';
				// set scroll amount
			    convo[i]['positionTop'] = -(Math.floor((convo[i].message.length/30)) + 2.75);

				// assign bubble class
				if(convo[i].speaker === 'bot') {
					messageBubble.setAttribute('class', 'gray-message-bubble');
				} else {
					messageBubble.setAttribute('class', 'message-bubble');
				}

				// attach bubbles to the DOM
				document.getElementsByClassName('phone-screen')[0].appendChild(messageBubble);
				// time bubble fade-in
			    (function(i) {
			    	var positionTop = 0;
			        setTimeout(function() {
			            var id = 'message-bubble' + i;
			            document.getElementById(id).style.opacity = '1';
			        }, 2500 * i)
			    })(i);
			}
			scrollPhone()
		}
		// move screen up as bubbles fill in
		var scrollPhone = function () {
			var positionTop = 0;
			for(var i = 0; i < convo.length; i++) {
				var message = convo[i];
				if (i > 3) {
					var scroller = function (message) {
						setTimeout(function() {
							positionTop += message['positionTop'];
							document.querySelector('.phone-screen').style.marginTop = positionTop + 'em';
							return positionTop;
						}, 2500*i)
					}(message);
				}
			}
		}
		initBubbles();
	}
	
	menuToggle = function() {
		if(menuOpen === false) {
			document.querySelector('nav').style.display = 'block';
			menuOpen = true;
		}else {
			document.querySelector('nav').style.display = 'none';
			menuOpen = false;
		}

		var checkWidth = function() {
			if((window.innerWidth || document.body.clientWidth) > 550) {
				document.querySelector('nav').style.display = 'block';
				menuOpen = true;
			} else {
				document.querySelector('nav').style.display = 'none';
				menuOpen = false;				
			}
			return menuOpen;
		}
		window.addEventListener("resize", checkWidth);
		return menuOpen;
	}

	contactPopup = function() {
		var product = this.getAttribute('value');
		var popupContainer = document.querySelector('#contact-popup-container');
		if(popupVisible === false) {
			popupContainer.style.display = 'block';
			popupVisible = true;
			passProductToEmail(product);
		}else {
			popupContainer.style.display = 'none';
			popupVisible = false;
			document.getElementById('subject-line').value = 'Add me! mindBot Email List';
		}

		function passProductToEmail(product) {
			document.getElementById('subject-line').value = 'Add me! mindBot Email List :: ' + product;
		}

	}

	timeStart = setTimeout(start, 2500);

	(function attachListeners() {
		menuButton.addEventListener('click', menuToggle);
		var icon = document.getElementsByClassName('icon');
		for (var i = 0; i < icon.length; i++) {
		    icon[i].addEventListener('click', contactPopup, false);
		}

		var closeBtn = document.querySelector('#close');
		closeBtn.addEventListener('click', contactPopup, false);					
	})();
})();
