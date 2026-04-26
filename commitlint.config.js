module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'docs',
        'refactor',
        'test',
        'perf',
        'ci',
        'build',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        // app areas
        'auth',
        'doctor',
        'patient',
        'secretary',
        'appointments',
        'availability',
        'profile',
        'subscription',
        // frontend layers
        'ui',
        'layout',
        'shared',
        'context',
        'hooks',
        'lib',
        'types',
        'constants',
        // project-level
        'config',
        'deps',
        'ci',
      ],
    ],
    'scope-empty': [1, 'never'],       // scope is recommended but not required
    'subject-case': [2, 'always', 'lower-case'],  // description must be lowercase
    'subject-empty': [2, 'never'],     // description is required
    'subject-full-stop': [2, 'never'], // no period at end
    'header-max-length': [2, 'always', 120], // max commit message length
  },
};
