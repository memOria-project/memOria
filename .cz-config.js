module.exports = {
  types: [
    { value: 'feat', name: 'feat:     Une feature' },
    { value: 'fix', name: 'fix:      Réparation de bug' },
    { value: 'docs', name: 'docs:     Changement dans la doc' },
    {
      value: 'style',
      name:
        'style:    Changements sans impact sur le code \n            (espace, formattage etc.)',
    },
    {
      value: 'refactor',
      name: 'refactor: Un changement de code qui ne répare pas un bug, n ajoute pas de feature',
    },
    {
      value: 'perf',
      name: 'perf:     un changement de code qui améliore les perfs',
    },
    { value: 'test', name: 'test:     Ajoute des tests' },
    {
      value: 'chore',
      name:
        'chore:    Changement au build process ou aux outils auxiliaires \n            ainsi qu aux librairies et génération de la documentation',
    },
    { value: 'revert', name: 'revert:   Revert to a commit' },
    { value: 'WIP', name: 'WIP:      Work in progress' },
  ],

  scopes: [{ name: ' ' },],
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\n Ecrivez une description COURTE, dans le mode IMPERATIF de ce changement (optional):\n',
    // used if allowCustomScopes is true
    customScope: 'Précisez le SCOPE de ce changement(optional):\n',
    subject: 'Ecrivez une description COURTE, dans le mode IMPERATIF de ce changement :\n',
    body: 'Donnez une description plus détaillée (optionel). Utilisez "|" pour aller à la ligne:\n',
    breaking: 'List any BREAKING CHANGES(optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'êtes vous sur de vouloir créer ce Commit?',

  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 100,
  // breaklineChar: '|', // It is supported for fields body and footer.
  footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};