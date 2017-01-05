? how * (add|make|create) * (block|text|image) *
- ^respond(add)

? what * (block|text|image|horizontal|vertical) *
- ^respond(block)

+ ^match(false)
- ^respond(any)

+ * (start|begin|switch|go|open|kickoff|unfold|mount|open) * (unicornPath|unicorn|designerPath) *
- ^respond(pathDesigner)

+ * (start|begin|switch|go|open|kickoff|unfold|mount|open) * development * path *
- ^respond(pathDesigner)

+ * (fuck|shit|ass|motherfucker|fucker|fucking|stupid|whore|gay) *
- ^respond(backOff)

+ onboarding
- ^topicRedirect(onboarding, __onboarding__)


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

	+ ^match(false)
	- If you want me to help you, ask me questions like, "how to add text" or "what is alignItems"
  - I didn't get that. Ask me in a different way about it

< topic

> topic:system:keep backOff

	+ * (fuck|shit|ass|motherfucker|fucker|fucking|stupid|whore|gay) *
	- If you want me to help you, ask me questions like, "how to add text" or "what is alignItems"
  - Uuuu, nice
  - Are you cold? Do you want me to find you a jacket?
  - I'd jump into Mount Doom to save you
  - Any team would be lucky to have you on it
  - I'd pay your bills for you (if I could)
  - It's nice to know you'd never judge me

< topic


> topic:system:keep onboarding

+ __onboarding__
- hey I’m Ash, how should I call you?

+ [my name is] *2
- hey, <cap>. Are you a designer or a developer? ^save(name,<cap>)

    + * (designer|creative) * ^save(position, designer)
    % * designer or a developer?
    - ^topicRedirect(pathDesigner,__startPathDesigner__)

    + * (developer|engineer) * ^save(position, developer)
    % * designer or a developer?
    - ^topicRedirect(pathDev,__startPathDev__)

< topic



> topic:system:keep pathDesigner

+ __startPathDesigner__
- Let’s style stuff!!
  Make the code in the editor look like this one:
  ```- block: Text
       text: Uuu la la!
       style:
         fontFamily: Open Sans
         fontSize: 35
         paddingTop: 20
         paddingLeft: 20
         paddingRight: 20
         paddingBottom:20```
  
  + ^get(editorInput, true)
  % Let’s start adding blocks *
  - Great! Do you want details about what does it all mean?

    + ~yes
    % * details about what does it mean?
    - Every layout is made out of its elements.
      In Views we call them Blocks

    + ~no
    % * details about what does it mean?
    - OK. I’ll be around when you need me


  + ^get(editorInput, false)
  % Let’s start adding blocks *
  - Check for typos and roll over the red indicators on the margin

< topic



> topic:system:keep pathDev

+ __startPathDev__
- Here the deal

< topic