
module.exports = function(app, exphbs) {
		//Handlebars configuration
		app.engine('.hbs', exphbs({
				defaultLayout: 'main',
				extname: '.hbs',
				layoutsDir: 'dist/views/layouts/',
				partialsDir: 'dist/views/partials/',
				helpers: {
					resolveAsset: function(assetId, collection) {
						for(let asset of collection) {
							if(asset.sys.id === assetId) {
								return asset.fields.file.url;
							}
						}
						return 'Not found';
					}
				}
			}));
		app.set('views','dist/views');
		app.set('view engine', '.hbs');
	};