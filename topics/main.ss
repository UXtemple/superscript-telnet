? how * (add|make|create) * (block|text|image) *
- ^respond(add)

? what * (block|text|image|horizontal|vertical) *
- ^respond(block)

+ *
- ^respond(any)

> topic:system:keep add

  + how * (add|make|create) * text *
  - To add block text you need to do this

  + how * (add|make|create) * image *
  - To add an image block you need to put this

< topic

> topic:system:keep block
	
	+ what * text *
	- A text block is thing

	+ what * block *
	- A block is this thing

	+ what * image *
	- An image block is this thing

< topic

> topic:system:keep any

	+ *
	- uuuu nice
	- hey now

< topic