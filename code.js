
		let fiter = new Filter(400,'canvas1','canvas2');
			window.onload = function(){
			fiter.draw();
		};
		
		function Filter(width, canvas1, canvas2){
			this.width = width;
			this.height = 0;
			this.brightnessValue = 2;
			this.src = './1.jpg';
			
			this.draw = () => {
				let img = new Image();
				img.src = this.src;

				img.onload = () => {
				let factor = img.height / img.width;
				
				this.height = factor * width;
				
				let canvasFrom = document.getElementById(canvas1);
				canvasFrom.height = this.height;
				canvasFrom.width = this.width;
				
				let canvasTo = document.getElementById(canvas2);
				canvasTo.height = this.height;
				canvasTo.width = this.width;
			  
				let context = canvasFrom.getContext('2d');
				context.drawImage(img, 0, 0,this.width,this.height);

				let imageData = context.getImageData(0, 0, this.width, this.height);
				imageDataFiltered = this.brightnessFilter(imageData);

				let contextTo = canvasTo.getContext('2d');
				contextTo.drawImage(img, 0, 0,this.width, this.height);
				contextTo.putImageData(imageDataFiltered, 0, 0);
				}
			}
			
			this.brightnessFilter = function(imageData){
				let pixels = imageData.data;
				for (let i=0; i<pixels.length; i++){
					pixels[i] *= this.brightnessValue;
				}
				return imageData;
			}
		}
		  
		function getImage(e){
			fiter.src = e.options[e.selectedIndex].value;
			fiter.draw();
		}
		  
		function getbrValue(e){
			fiter.brightnessValue = e.value;
			fiter.draw();
		}
