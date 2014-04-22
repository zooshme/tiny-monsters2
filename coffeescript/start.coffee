# Models
# ====================================
require './models/category'
require './models/toy'

# Collections
# ====================================
require './collections/toys'
require './collections/categories'

# Routes
# ====================================
require './routes/home'
require './routes/toy'
require './routes/categories'

# Views
# ====================================
require './views/home'
require './views/categories'

Backbone.history.start()
	