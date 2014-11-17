//gallery by Aaron
(function($){
	$.fn.barebones = function(){
		
			
			var self = this,
			$self = $(this),
			children = $self.children(),
			length = children.length,
			$slides = [],
			currentSlide = 0,
			k; //tmp variable

			
			/*
				Advance forward
				Slide the currentSlide to the left off the container
				increment slides until we've reached the end, then start at 0
				Move the next Slide into position to the right, and animate it into place
				Publish onSlideChange
			*/

			function next(){
				
				$slides[currentSlide].animate({
					left: '-100%'
				});

				currentSlide++;
				if(currentSlide >= length){
					currentSlide = 0;
				}
				
				$slides[currentSlide].css({
					left: '100%'
				}).show().animate({
					left: '0%'
				});

				$self.trigger("slideChange", [ currentSlide ]);

			}

			/*
				go backward
				Slide the currentSlide to the right off the container
				de-increment slides until we've reached -1, then pick the last one
				Move the next Slide into position to the left, and animate it into place
				Publish onSlideChange
			*/
			function back(){
				
				$slides[currentSlide].animate({
					left: '100%'
				});

				currentSlide--;
				if(currentSlide < 0){
					currentSlide = length - 1;
				}

				$slides[currentSlide].css({
					left: '-100%'
				}).show().animate({
					left: '0%'
				});

				$self.trigger("slideChange", [ currentSlide ]);

			}

			/*
				Jump to a particluar slide
				Slide the currentSlide to the right off the container
				Select the slide you want to target
				Move that Slide into position to the left, and animate it into place
				Publish onSlideChange
			*/

			function jumpTo(num){
				$slides[currentSlide].css({
					left: '100%'
				});

				currentSlide = num;
				
				$slides[currentSlide].css({
					left: '0%'
				}).show();

				$self.trigger("slideChange", [ currentSlide ]);
			}


			
			//style the wrapping element
			$self.css({
				position: 'relative',
				overflow: 'hidden'
			});

			/*
				Make each child element invisible except the virst one
				Make their position absolute
				Push their DOM element into an array called $slides
			*/ 
			children.each(function(n){
				k = $(this);
				k.css({
					display: (n == 0)? 'normal' : 'none', //hide all but the first
					position: 'absolute',
					left: 0,
					top: 0
				});
				$slides.push(k);
			});

			
			/*
				Give access to the instance with these.
			*/
			$self.next = function(){
				next();
			};
			$self.back = function(){
				back();
			};
			$self.jumpTo = function(num){
				jumpTo(num);
			};

			return $self;
		
	}
})(jQuery);