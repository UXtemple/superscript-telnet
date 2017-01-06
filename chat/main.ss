> topic onboarding

+ onboarding
- hey I’m Ash, how should I call you?

  + [my name is] *1
  - hey, <cap1>. Are you a designer or a developer? ^save('name', <cap1>)

    + * designer
    - ^topicRedirect('onboarding_designer', '__start__')

    + * developer
    - ^topicRedirect('onboarding_developer', '__start__')
< topic

> topic onboarding_designer {system}

+ __start__
- hi designer!

< topic

> topic onboarding_developer {system}

+ __start__
- Let's start with some code\n^code('horizontal')

< topic


+ what is a *1
- ^code(<cap1>)
