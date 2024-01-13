export default function (plop) {
  plop.setGenerator('component', {
    description: 'create a new component',
    prompts: [
      {
        type: 'list',
        name: 'pathType',
        message: 'Do you want to select the path or input it?',
        choices: ['Select', 'Input'],
      },
      {
        type: 'list',
        name: 'path',
        choices: ['app/pages', 'app/_components', 'app/_layout'],
        message: 'Where is the path to create components? (e.g. components)',
        when: (answers) => answers.pathType === 'Select',
      },
      {
        type: 'input',
        name: 'path',
        message: 'Where is the path to create components? (e.g. components)',
        when: (answers) => answers.pathType === 'Input',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name? (e.g. button)',
      },
      {
        type: 'input',
        name: 'defaultElement',
        message: 'What is the Element name? (e.g. div, span, button etc.)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{path}}/{{pascalCase name}}/{{name}}.tsx',
        templateFile: '.plop/index.tsx.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '{{path}}/{{pascalCase name}}/{{name}}.stories.tsx',
        templateFile: '.plop/component.stories.tsx.hbs',
      },
    ],
  });
}
